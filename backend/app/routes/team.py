from pathlib import Path
import shutil
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import UPLOAD_PATH, get_db
from ..models import Admin, TeamMember
from ..schemas import (
    TeamMemberCreate,
    TeamMemberResponse,
    TeamMemberUpdate,
)


router = APIRouter(
    prefix="/api/team",
    tags=["Team"],
)


def get_team_member_or_404(
    member_id: int,
    db: Session,
) -> TeamMember:
    member = db.get(TeamMember, member_id)

    if not member:
        raise HTTPException(
            status_code=404,
            detail="Team member not found",
        )

    return member


def delete_profile_image(image_url: str | None) -> None:
    if not image_url or not image_url.startswith("/uploads/team/"):
        return

    relative_path = image_url.removeprefix("/uploads/")
    image_path = (UPLOAD_PATH / relative_path).resolve()
    team_upload_path = (UPLOAD_PATH / "team").resolve()

    if team_upload_path not in image_path.parents:
        return

    if image_path.is_file():
        image_path.unlink()


# ============================================================
# PUBLIC
# ============================================================

@router.get(
    "",
    response_model=list[TeamMemberResponse],
)
def get_published_team_members(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(TeamMember)
        .where(TeamMember.is_published == True)
        .order_by(
            TeamMember.display_order.asc(),
            TeamMember.id.asc(),
        )
    ).all()


# ============================================================
# ADMIN
# ============================================================

@router.get(
    "/admin",
    response_model=list[TeamMemberResponse],
)
def get_all_team_members(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    return db.scalars(
        select(TeamMember)
        .order_by(
            TeamMember.display_order.asc(),
            TeamMember.id.asc(),
        )
    ).all()


@router.get(
    "/admin/{member_id}",
    response_model=TeamMemberResponse,
)
def get_team_member(
    member_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    return get_team_member_or_404(member_id, db)


@router.post(
    "",
    response_model=TeamMemberResponse,
    status_code=201,
)
def create_team_member(
    member_data: TeamMemberCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    member = TeamMember(**member_data.model_dump())
    db.add(member)
    db.commit()
    db.refresh(member)
    return member


@router.patch(
    "/{member_id}",
    response_model=TeamMemberResponse,
)
def update_team_member(
    member_id: int,
    member_data: TeamMemberUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    member = get_team_member_or_404(member_id, db)

    for key, value in member_data.model_dump(exclude_unset=True).items():
        setattr(member, key, value)

    db.commit()
    db.refresh(member)
    return member


@router.post(
    "/{member_id}/image",
    response_model=TeamMemberResponse,
)
async def upload_team_member_image(
    member_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    member = get_team_member_or_404(member_id, db)

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
    }
    allowed_extensions = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG, WEBP and AVIF images are allowed",
        )

    extension = Path(file.filename or "").suffix.lower()
    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Invalid image extension",
        )

    max_size = 10 * 1024 * 1024
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)
    if file_size > max_size:
        raise HTTPException(
            status_code=400,
            detail="Image must be smaller than 10MB",
        )

    team_directory = UPLOAD_PATH / "team" / str(member.id)
    team_directory.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid4().hex}{extension}"
    destination = team_directory / filename

    try:
        with destination.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as error:
        if destination.exists():
            destination.unlink()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save image: {error}",
        )

    previous_image = member.profile_image
    member.profile_image = f"/uploads/team/{member.id}/{filename}"
    db.commit()
    db.refresh(member)
    delete_profile_image(previous_image)
    return member


@router.delete(
    "/{member_id}/image",
    response_model=TeamMemberResponse,
)
def remove_team_member_image(
    member_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    member = get_team_member_or_404(member_id, db)
    previous_image = member.profile_image
    member.profile_image = None
    db.commit()
    db.refresh(member)
    delete_profile_image(previous_image)
    return member


@router.delete(
    "/{member_id}",
    status_code=204,
)
def delete_team_member(
    member_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    member = get_team_member_or_404(member_id, db)
    previous_image = member.profile_image
    member_directory = UPLOAD_PATH / "team" / str(member.id)

    db.delete(member)
    db.commit()

    delete_profile_image(previous_image)
    if member_directory.is_dir():
        shutil.rmtree(member_directory)

    return None
