from pathlib import Path
import shutil

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from ..database import get_db, UPLOAD_PATH
from ..models import (
    Connectivity,
    ConnectivityImage,
)
from ..schemas import (
    ConnectivityCreate,
    ConnectivityImageResponse,
    ConnectivityImageUpdate,
    ConnectivityResponse,
    ConnectivityUpdate,
)


# ============================================================
# ROUTER
# ============================================================

router = APIRouter(
    prefix="/api/connectivity",
    tags=["Connectivity"],
)


# ============================================================
# ALLOWED IMAGE TYPES
# ============================================================

ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
}


ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
}


MAX_IMAGE_SIZE = 15 * 1024 * 1024


# ============================================================
# GET ALL PUBLISHED CONNECTIVITY
# ============================================================

@router.get(
    "",
    response_model=list[ConnectivityResponse],
)
def get_connectivity(
    db: Session = Depends(get_db),
):

    connectivity = db.scalars(
        select(Connectivity)
        .options(
            selectinload(
                Connectivity.images
            )
        )
        .where(
            Connectivity.is_published.is_(True)
        )
        .order_by(
            Connectivity.display_order.asc(),
            Connectivity.id.asc(),
        )
    ).unique().all()

    return connectivity


# ============================================================
# GET SINGLE CONNECTIVITY BY SLUG
# ============================================================

@router.get(
    "/slug/{slug}",
    response_model=ConnectivityResponse,
)
def get_connectivity_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):

    connectivity = db.scalar(
        select(Connectivity)
        .options(
            selectinload(
                Connectivity.images
            )
        )
        .where(
            Connectivity.slug == slug,
            Connectivity.is_published.is_(True),
        )
    )

    if not connectivity:

        raise HTTPException(
            status_code=404,
            detail="Connectivity section not found",
        )

    return connectivity


# ============================================================
# ADMIN - GET ALL CONNECTIVITY
# ============================================================

@router.get(
    "/admin",
    response_model=list[ConnectivityResponse],
)
def admin_get_connectivity(
    db: Session = Depends(get_db),
):

    connectivity = db.scalars(
        select(Connectivity)
        .options(
            selectinload(
                Connectivity.images
            )
        )
        .order_by(
            Connectivity.display_order.asc(),
            Connectivity.id.asc(),
        )
    ).unique().all()

    return connectivity


# ============================================================
# ADMIN - GET SINGLE CONNECTIVITY
# ============================================================

@router.get(
    "/admin/{connectivity_id}",
    response_model=ConnectivityResponse,
)
def admin_get_single_connectivity(
    connectivity_id: int,
    db: Session = Depends(get_db),
):

    connectivity = db.scalar(
        select(Connectivity)
        .options(
            selectinload(
                Connectivity.images
            )
        )
        .where(
            Connectivity.id == connectivity_id
        )
    )

    if not connectivity:

        raise HTTPException(
            status_code=404,
            detail="Connectivity section not found",
        )

    return connectivity


# ============================================================
# CREATE CONNECTIVITY
# ============================================================

@router.post(
    "",
    response_model=ConnectivityResponse,
    status_code=201,
)
def create_connectivity(
    connectivity_data: ConnectivityCreate,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Clean values
    # --------------------------------------------------------

    slug = connectivity_data.slug.strip()

    title = connectivity_data.title.strip()


    # --------------------------------------------------------
    # Validate
    # --------------------------------------------------------

    if not slug:

        raise HTTPException(
            status_code=400,
            detail="Slug is required",
        )

    if not title:

        raise HTTPException(
            status_code=400,
            detail="Title is required",
        )


    # --------------------------------------------------------
    # Check duplicate slug
    # --------------------------------------------------------

    existing = db.scalar(
        select(Connectivity)
        .where(
            Connectivity.slug == slug
        )
    )

    if existing:

        raise HTTPException(
            status_code=409,
            detail=(
                "Connectivity with this "
                "slug already exists"
            ),
        )


    # --------------------------------------------------------
    # Create
    # --------------------------------------------------------

    connectivity = Connectivity(
        slug=slug,
        title=title,
        description=connectivity_data.description,
        display_order=(
            connectivity_data.display_order
        ),
        is_published=(
            connectivity_data.is_published
        ),
    )

    db.add(connectivity)

    db.commit()

    db.refresh(connectivity)


    # --------------------------------------------------------
    # Return with images
    # --------------------------------------------------------

    result = db.scalar(
        select(Connectivity)
        .options(
            selectinload(
                Connectivity.images
            )
        )
        .where(
            Connectivity.id
            == connectivity.id
        )
    )

    return result


# ============================================================
# UPDATE CONNECTIVITY
# ============================================================

@router.patch(
    "/{connectivity_id}",
    response_model=ConnectivityResponse,
)
def update_connectivity(
    connectivity_id: int,
    connectivity_data: ConnectivityUpdate,
    db: Session = Depends(get_db),
):

    connectivity = db.get(
        Connectivity,
        connectivity_id,
    )

    if not connectivity:

        raise HTTPException(
            status_code=404,
            detail="Connectivity section not found",
        )


    # --------------------------------------------------------
    # Get update data
    # --------------------------------------------------------

    data = connectivity_data.model_dump(
        exclude_unset=True
    )


    # --------------------------------------------------------
    # Check slug
    # --------------------------------------------------------

    if "slug" in data:

        new_slug = (
            data["slug"].strip()
            if data["slug"]
            else ""
        )

        if not new_slug:

            raise HTTPException(
                status_code=400,
                detail="Slug cannot be empty",
            )

        existing = db.scalar(
            select(Connectivity)
            .where(
                Connectivity.slug == new_slug,
                Connectivity.id != connectivity_id,
            )
        )

        if existing:

            raise HTTPException(
                status_code=409,
                detail=(
                    "Another connectivity section "
                    "already uses this slug"
                ),
            )

        data["slug"] = new_slug


    # --------------------------------------------------------
    # Check title
    # --------------------------------------------------------

    if "title" in data:

        title = (
            data["title"].strip()
            if data["title"]
            else ""
        )

        if not title:

            raise HTTPException(
                status_code=400,
                detail="Title cannot be empty",
            )

        data["title"] = title


    # --------------------------------------------------------
    # Apply changes
    # --------------------------------------------------------

    for key, value in data.items():

        setattr(
            connectivity,
            key,
            value,
        )


    db.commit()

    db.refresh(connectivity)


    # --------------------------------------------------------
    # Return updated record with images
    # --------------------------------------------------------

    result = db.scalar(
        select(Connectivity)
        .options(
            selectinload(
                Connectivity.images
            )
        )
        .where(
            Connectivity.id
            == connectivity.id
        )
    )

    return result


# ============================================================
# DELETE CONNECTIVITY
# ============================================================

@router.delete(
    "/{connectivity_id}",
    status_code=204,
)
def delete_connectivity(
    connectivity_id: int,
    db: Session = Depends(get_db),
):

    connectivity = db.scalar(
        select(Connectivity)
        .options(
            selectinload(
                Connectivity.images
            )
        )
        .where(
            Connectivity.id
            == connectivity_id
        )
    )

    if not connectivity:

        raise HTTPException(
            status_code=404,
            detail="Connectivity section not found",
        )


    # --------------------------------------------------------
    # Delete physical image directory
    # --------------------------------------------------------

    connectivity_directory = (
        UPLOAD_PATH
        / "connectivity"
        / str(connectivity.id)
    )

    if connectivity_directory.exists():

        shutil.rmtree(
            connectivity_directory
        )


    # --------------------------------------------------------
    # Delete database record
    # --------------------------------------------------------

    db.delete(connectivity)

    db.commit()

    return None


# ============================================================
# GET CONNECTIVITY IMAGES
# ============================================================

@router.get(
    "/{connectivity_id}/images",
    response_model=list[ConnectivityImageResponse],
)
def get_connectivity_images(
    connectivity_id: int,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Check connectivity
    # --------------------------------------------------------

    connectivity = db.get(
        Connectivity,
        connectivity_id,
    )

    if not connectivity:

        raise HTTPException(
            status_code=404,
            detail="Connectivity section not found",
        )


    # --------------------------------------------------------
    # Get images
    # --------------------------------------------------------

    images = db.scalars(
        select(ConnectivityImage)
        .where(
            ConnectivityImage.connectivity_id
            == connectivity_id
        )
        .order_by(
            ConnectivityImage.display_order.asc(),
            ConnectivityImage.id.asc(),
        )
    ).all()

    return images


# ============================================================
# UPLOAD CONNECTIVITY IMAGE
# ============================================================

@router.post(
    "/{connectivity_id}/images",
    response_model=ConnectivityImageResponse,
    status_code=201,
)
def upload_connectivity_image(
    connectivity_id: int,
    file: UploadFile = File(...),
    display_order: int | None = Form(None),
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Check connectivity
    # --------------------------------------------------------

    connectivity = db.get(
        Connectivity,
        connectivity_id,
    )

    if not connectivity:

        raise HTTPException(
            status_code=404,
            detail="Connectivity section not found",
        )


    # --------------------------------------------------------
    # Check image MIME type
    # --------------------------------------------------------

    if file.content_type not in ALLOWED_IMAGE_TYPES:

        raise HTTPException(
            status_code=400,
            detail=(
                "Only JPG, PNG, WEBP and AVIF "
                "images are allowed"
            ),
        )


    # --------------------------------------------------------
    # Check file size
    # --------------------------------------------------------

    file.file.seek(
        0,
        2
    )

    file_size = file.file.tell()

    file.file.seek(0)


    if file_size > MAX_IMAGE_SIZE:

        raise HTTPException(
            status_code=400,
            detail=(
                "Image must be smaller "
                "than 15MB"
            ),
        )


    # --------------------------------------------------------
    # Create connectivity directory
    # --------------------------------------------------------

    connectivity_directory = (
        UPLOAD_PATH
        / "connectivity"
        / str(connectivity.id)
    )

    connectivity_directory.mkdir(
        parents=True,
        exist_ok=True,
    )


    # --------------------------------------------------------
    # Determine original filename
    # --------------------------------------------------------

    original_name = (
        file.filename
        or "connectivity-image"
    )


    # --------------------------------------------------------
    # Determine extension
    # --------------------------------------------------------

    extension = Path(
        original_name
    ).suffix.lower()


    if extension not in ALLOWED_EXTENSIONS:

        extension = ".webp"


    # --------------------------------------------------------
    # Determine next image number
    # --------------------------------------------------------

    existing_count = db.scalar(
        select(
            func.count(
                ConnectivityImage.id
            )
        )
        .where(
            ConnectivityImage.connectivity_id
            == connectivity_id
        )
    )


    next_number = (
        (existing_count or 0) + 1
    )


    # --------------------------------------------------------
    # Create filename
    # --------------------------------------------------------

    filename = (
        f"{connectivity.slug}"
        f"-{next_number}"
        f"{extension}"
    )


    destination = (
        connectivity_directory
        / filename
    )


    # --------------------------------------------------------
    # Save physical file
    # --------------------------------------------------------

    try:

        with destination.open(
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer,
            )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=(
                f"Failed to save image: {error}"
            ),
        )


    # --------------------------------------------------------
    # Determine display order
    # --------------------------------------------------------

    if display_order is None:

        max_display_order = db.scalar(
            select(
                func.max(
                    ConnectivityImage.display_order
                )
            )
            .where(
                ConnectivityImage.connectivity_id
                == connectivity_id
            )
        )

        if max_display_order is None:

            display_order = 1

        else:

            display_order = (
                max_display_order + 1
            )


    # --------------------------------------------------------
    # Create database record
    # --------------------------------------------------------

    image = ConnectivityImage(

        connectivity_id=connectivity_id,

        image_url=(
            f"/uploads/connectivity/"
            f"{connectivity.id}/"
            f"{filename}"
        ),

        original_name=original_name,

        display_order=display_order,
    )


    db.add(image)

    try:

        db.commit()

        db.refresh(image)

    except Exception as error:

        db.rollback()

        # Delete physical file if DB fails

        if destination.exists():

            destination.unlink()

        raise HTTPException(
            status_code=500,
            detail=(
                f"Failed to save image: {error}"
            ),
        )


    return image


# ============================================================
# UPDATE CONNECTIVITY IMAGE
# ============================================================

@router.patch(
    "/images/{image_id}",
    response_model=ConnectivityImageResponse,
)
def update_connectivity_image(
    image_id: int,
    image_data: ConnectivityImageUpdate,
    db: Session = Depends(get_db),
):

    image = db.get(
        ConnectivityImage,
        image_id,
    )

    if not image:

        raise HTTPException(
            status_code=404,
            detail="Connectivity image not found",
        )


    # --------------------------------------------------------
    # Update order
    # --------------------------------------------------------

    data = image_data.model_dump(
        exclude_unset=True
    )

    for key, value in data.items():

        setattr(
            image,
            key,
            value,
        )


    db.commit()

    db.refresh(image)

    return image


# ============================================================
# DELETE CONNECTIVITY IMAGE
# ============================================================

@router.delete(
    "/images/{image_id}",
    status_code=204,
)
def delete_connectivity_image(
    image_id: int,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Find image
    # --------------------------------------------------------

    image = db.get(
        ConnectivityImage,
        image_id,
    )

    if not image:

        raise HTTPException(
            status_code=404,
            detail="Connectivity image not found",
        )


    # --------------------------------------------------------
    # Delete physical file
    # --------------------------------------------------------

    if image.image_url:

        relative_path = (
            image.image_url
            .removeprefix(
                "/uploads/"
            )
        )

        image_path = (
            UPLOAD_PATH
            / relative_path
        )

        if image_path.exists():

            image_path.unlink()


    # --------------------------------------------------------
    # Delete database record
    # --------------------------------------------------------

    db.delete(image)

    db.commit()

    return None