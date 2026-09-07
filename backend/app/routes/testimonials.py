from pathlib import Path
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
from ..database import get_db
from ..models import Admin, Testimonial
from ..schemas import (
    TestimonialCreate,
    TestimonialResponse,
    TestimonialUpdate,
)


router = APIRouter(
    prefix="/api/testimonials",
    tags=["Testimonials"],
)


# ============================================================
# UPLOAD DIRECTORY
# ============================================================

UPLOAD_DIR = Path("uploads/testimonials")

UPLOAD_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


# ============================================================
# GET PUBLISHED TESTIMONIALS
# PUBLIC
# ============================================================

@router.get(
    "/public",
    response_model=list[TestimonialResponse],
)
def get_public_testimonials(
    db: Session = Depends(get_db),
):

    testimonials = db.scalars(
        select(Testimonial)
        .where(
            Testimonial.is_published == True
        )
        .order_by(
            Testimonial.created_at.desc()
        )
    ).all()

    return testimonials


# ============================================================
# GET ALL TESTIMONIALS
# ADMIN ONLY
# ============================================================

@router.get(
    "",
    response_model=list[TestimonialResponse],
)
def get_testimonials(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):

    testimonials = db.scalars(
        select(Testimonial)
        .order_by(
            Testimonial.created_at.desc()
        )
    ).all()

    return testimonials


# ============================================================
# UPLOAD TESTIMONIAL IMAGE
# ADMIN ONLY
# ============================================================

@router.post(
    "/upload-image",
)
async def upload_testimonial_image(
    file: UploadFile = File(...),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    # --------------------------------------------------------
    # Validate content type
    # --------------------------------------------------------

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
    }

    if file.content_type not in allowed_types:

        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images are allowed.",
        )

    # --------------------------------------------------------
    # Validate extension
    # --------------------------------------------------------

    extension = Path(
        file.filename or ""
    ).suffix.lower()

    allowed_extensions = {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    }

    if extension not in allowed_extensions:

        raise HTTPException(
            status_code=400,
            detail="Invalid image extension.",
        )

    # --------------------------------------------------------
    # Generate unique filename
    # --------------------------------------------------------

    filename = (
        f"{uuid4().hex}{extension}"
    )

    file_path = (
        UPLOAD_DIR / filename
    )

    # --------------------------------------------------------
    # Save file
    # --------------------------------------------------------

    try:

        with file_path.open("wb") as buffer:

            while True:

                chunk = await file.read(
                    1024 * 1024
                )

                if not chunk:
                    break

                buffer.write(chunk)

    except Exception as error:

        if file_path.exists():
            file_path.unlink()

        print(
            "Testimonial image upload error:",
            error
        )

        raise HTTPException(
            status_code=500,
            detail="Unable to upload image.",
        )

    # --------------------------------------------------------
    # Return public path
    # --------------------------------------------------------

    return {
        "image": f"/uploads/testimonials/{filename}"
    }


# ============================================================
# CREATE TESTIMONIAL
# ADMIN ONLY
# ============================================================

@router.post(
    "",
    response_model=TestimonialResponse,
    status_code=201,
)
def create_testimonial(
    testimonial_data: TestimonialCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    testimonial = Testimonial(
        **testimonial_data.model_dump()
    )

    db.add(testimonial)

    db.commit()

    db.refresh(testimonial)

    return testimonial


# ============================================================
# GET SINGLE TESTIMONIAL
# ADMIN ONLY
# ============================================================

@router.get(
    "/{testimonial_id}",
    response_model=TestimonialResponse,
)
def get_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    testimonial = db.get(
        Testimonial,
        testimonial_id,
    )

    if not testimonial:

        raise HTTPException(
            status_code=404,
            detail="Testimonial not found",
        )

    return testimonial


# ============================================================
# UPDATE TESTIMONIAL
# ADMIN ONLY
# ============================================================

@router.put(
    "/{testimonial_id}",
    response_model=TestimonialResponse,
)
def update_testimonial(
    testimonial_id: int,
    testimonial_data: TestimonialUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    testimonial = db.get(
        Testimonial,
        testimonial_id,
    )

    if not testimonial:

        raise HTTPException(
            status_code=404,
            detail="Testimonial not found",
        )

    for key, value in (
        testimonial_data
        .model_dump()
        .items()
    ):

        setattr(
            testimonial,
            key,
            value
        )

    db.commit()

    db.refresh(testimonial)

    return testimonial


# ============================================================
# DELETE TESTIMONIAL
# ADMIN ONLY
# ============================================================

@router.delete(
    "/{testimonial_id}",
    status_code=204,
)
def delete_testimonial(
    testimonial_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(
        get_current_admin
    ),
):

    testimonial = db.get(
        Testimonial,
        testimonial_id,
    )

    if not testimonial:

        raise HTTPException(
            status_code=404,
            detail="Testimonial not found",
        )

    db.delete(testimonial)

    db.commit()

    return None