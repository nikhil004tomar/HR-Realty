from pathlib import Path
import shutil
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import UPLOAD_PATH, get_db
from ..models import Admin, SiteMap
from ..schemas import (
    SiteMapCreate,
    SiteMapResponse,
    SiteMapUpdate,
)


router = APIRouter(
    prefix="/api/maps",
    tags=["Maps"],
)


# ==========================================================
# HELPER
# ==========================================================

def get_map_or_404(
    map_id: int,
    db: Session,
) -> SiteMap:

    site_map = db.get(
        SiteMap,
        map_id,
    )

    if not site_map:
        raise HTTPException(
            status_code=404,
            detail="Map not found",
        )

    return site_map


# ==========================================================
# DELETE IMAGE FILE
# ==========================================================

def delete_map_image(
    image_url: str | None,
) -> None:

    if not image_url:
        return

    if not image_url.startswith(
        "/uploads/maps/"
    ):
        return

    relative_path = image_url.removeprefix(
        "/uploads/"
    )

    image_path = (
        UPLOAD_PATH / relative_path
    ).resolve()

    maps_upload_path = (
        UPLOAD_PATH / "maps"
    ).resolve()

    if maps_upload_path not in image_path.parents:
        return

    if image_path.is_file():
        image_path.unlink()


# ==========================================================
# PUBLIC
# GET /api/maps
# ==========================================================

@router.get(
    "",
    response_model=list[SiteMapResponse],
)
def get_published_maps(
    db: Session = Depends(get_db),
):

    return db.scalars(
        select(SiteMap)
        .where(
            SiteMap.is_published == True
        )
        .order_by(
            SiteMap.display_order.asc(),
            SiteMap.id.asc(),
        )
    ).all()


# ==========================================================
# ADMIN
# GET /api/maps/admin
# ==========================================================

@router.get(
    "/admin",
    response_model=list[SiteMapResponse],
)
def get_all_maps(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    return db.scalars(
        select(SiteMap)
        .order_by(
            SiteMap.display_order.asc(),
            SiteMap.id.asc(),
        )
    ).all()


# ==========================================================
# ADMIN
# GET SINGLE MAP
# ==========================================================

@router.get(
    "/admin/{map_id}",
    response_model=SiteMapResponse,
)
def get_map(
    map_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    return get_map_or_404(
        map_id,
        db,
    )


# ==========================================================
# CREATE MAP
# ==========================================================

@router.post(
    "",
    response_model=SiteMapResponse,
    status_code=201,
)
def create_map(
    map_data: SiteMapCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    site_map = SiteMap(
        **map_data.model_dump()
    )

    db.add(site_map)
    db.commit()
    db.refresh(site_map)

    return site_map


# ==========================================================
# UPDATE MAP
# ==========================================================

@router.patch(
    "/{map_id}",
    response_model=SiteMapResponse,
)
def update_map(
    map_id: int,
    map_data: SiteMapUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    site_map = get_map_or_404(
        map_id,
        db,
    )

    updates = map_data.model_dump(
        exclude_unset=True
    )

    for key, value in updates.items():
        setattr(
            site_map,
            key,
            value,
        )

    db.commit()
    db.refresh(site_map)

    return site_map


# ==========================================================
# UPLOAD MAP IMAGE
# ==========================================================

@router.post(
    "/{map_id}/image",
    response_model=SiteMapResponse,
)
async def upload_map_image(
    map_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    site_map = get_map_or_404(
        map_id,
        db,
    )

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
    }

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".avif",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=(
                "Only JPG, PNG, WEBP and AVIF "
                "images are allowed"
            ),
        )

    extension = Path(
        file.filename or ""
    ).suffix.lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Invalid image extension",
        )

    max_size = 15 * 1024 * 1024

    file.file.seek(0, 2)

    file_size = file.file.tell()

    file.file.seek(0)

    if file_size > max_size:
        raise HTTPException(
            status_code=400,
            detail=(
                "Map image must be smaller "
                "than 15MB"
            ),
        )

    map_directory = (
        UPLOAD_PATH
        / "maps"
        / str(site_map.id)
    )

    map_directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    filename = (
        f"{uuid4().hex}{extension}"
    )

    destination = (
        map_directory / filename
    )

    try:

        with destination.open("wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

    except Exception as error:

        if destination.exists():
            destination.unlink()

        raise HTTPException(
            status_code=500,
            detail=(
                f"Failed to save map image: {error}"
            ),
        )

    previous_image = site_map.image

    site_map.image = (
        f"/uploads/maps/"
        f"{site_map.id}/"
        f"{filename}"
    )

    db.commit()
    db.refresh(site_map)

    delete_map_image(
        previous_image
    )

    return site_map


# ==========================================================
# REMOVE MAP IMAGE
# ==========================================================

@router.delete(
    "/{map_id}/image",
    response_model=SiteMapResponse,
)
def remove_map_image(
    map_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    site_map = get_map_or_404(
        map_id,
        db,
    )

    previous_image = site_map.image

    site_map.image = None

    db.commit()
    db.refresh(site_map)

    delete_map_image(
        previous_image
    )

    return site_map


# ==========================================================
# DELETE MAP
# ==========================================================

@router.delete(
    "/{map_id}",
    status_code=204,
)
def delete_map(
    map_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    site_map = get_map_or_404(
        map_id,
        db,
    )

    previous_image = site_map.image

    map_directory = (
        UPLOAD_PATH
        / "maps"
        / str(site_map.id)
    )

    db.delete(site_map)

    db.commit()

    delete_map_image(
        previous_image
    )

    if map_directory.is_dir():
        shutil.rmtree(
            map_directory
        )

    return None