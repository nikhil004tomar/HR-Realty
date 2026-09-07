from pathlib import Path
import shutil

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)

from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from ..database import get_db, UPLOAD_PATH
from ..models import Project, ProjectImage
from ..schemas import (
    ProjectCreate,
    ProjectImageResponse,
    ProjectResponse,
    ProjectUpdate,
)


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"],
)


# ============================================================
# GET ALL PROJECTS
# ============================================================

@router.get(
    "",
    response_model=list[ProjectResponse],
)
def get_projects(
    db: Session = Depends(get_db),
):

    projects = db.scalars(
        select(Project)
        .options(
            selectinload(Project.images)
        )
        .order_by(
            Project.created_at.desc()
        )
    ).unique().all()

    return projects


# ============================================================
# GET SINGLE PROJECT BY ID
# ============================================================

@router.get(
    "/id/{project_id}",
    response_model=ProjectResponse,
)
def get_project_by_id(
    project_id: int,
    db: Session = Depends(get_db),
):

    project = db.scalar(
        select(Project)
        .options(
            selectinload(Project.images)
        )
        .where(
            Project.id == project_id
        )
    )

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


# ============================================================
# GET SINGLE PROJECT BY SLUG
# ============================================================

@router.get(
    "/slug/{slug}",
    response_model=ProjectResponse,
)
def get_project_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):

    project = db.scalar(
        select(Project)
        .options(
            selectinload(Project.images)
        )
        .where(
            Project.slug == slug
        )
    )

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return project


# ============================================================
# CREATE PROJECT
# ============================================================

@router.post(
    "",
    response_model=ProjectResponse,
    status_code=201,
)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Check duplicate slug
    # --------------------------------------------------------

    existing_project = db.scalar(
        select(Project)
        .where(
            Project.slug == project_data.slug
        )
    )

    if existing_project:

        raise HTTPException(
            status_code=409,
            detail="Project with this slug already exists",
        )


    # --------------------------------------------------------
    # Create project
    # --------------------------------------------------------

    project = Project(
        **project_data.model_dump()
    )

    db.add(project)

    db.commit()

    db.refresh(project)


    # --------------------------------------------------------
    # Return project with images
    # --------------------------------------------------------

    result = db.scalar(
        select(Project)
        .options(
            selectinload(Project.images)
        )
        .where(
            Project.id == project.id
        )
    )

    return result


# ============================================================
# UPDATE PROJECT
# ============================================================

@router.put(
    "/{project_id}",
    response_model=ProjectResponse,
)
def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Find project
    # --------------------------------------------------------

    project = db.get(
        Project,
        project_id,
    )

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )


    # --------------------------------------------------------
    # Check duplicate slug
    # --------------------------------------------------------

    existing_project = db.scalar(
        select(Project)
        .where(
            Project.slug == project_data.slug,
            Project.id != project_id,
        )
    )

    if existing_project:

        raise HTTPException(
            status_code=409,
            detail="Another project already uses this slug",
        )


    # --------------------------------------------------------
    # Update fields
    # --------------------------------------------------------

    data = project_data.model_dump(
        exclude_unset=True
    )

    for key, value in data.items():

        setattr(
            project,
            key,
            value,
        )


    db.commit()

    db.refresh(project)


    # --------------------------------------------------------
    # Return updated project
    # --------------------------------------------------------

    result = db.scalar(
        select(Project)
        .options(
            selectinload(Project.images)
        )
        .where(
            Project.id == project.id
        )
    )

    return result


# ============================================================
# DELETE PROJECT
# ============================================================

@router.delete(
    "/{project_id}",
    status_code=204,
)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
):

    project = db.get(
        Project,
        project_id,
    )

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )


    # --------------------------------------------------------
    # Delete physical project images
    # --------------------------------------------------------

    project_directory = (
        UPLOAD_PATH
        / "projects"
        / project.slug
    )

    if project_directory.exists():

        shutil.rmtree(
            project_directory
        )


    # --------------------------------------------------------
    # Delete database project
    # --------------------------------------------------------

    db.delete(project)

    db.commit()

    return None


# ============================================================
# GET PROJECT IMAGES
# ============================================================

@router.get(
    "/{project_id}/images",
    response_model=list[ProjectImageResponse],
)
def get_project_images(
    project_id: int,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Check project
    # --------------------------------------------------------

    project = db.get(
        Project,
        project_id,
    )

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )


    # --------------------------------------------------------
    # Get images
    # --------------------------------------------------------

    images = db.scalars(
        select(ProjectImage)
        .where(
            ProjectImage.project_id == project_id
        )
        .order_by(
            ProjectImage.sort_order.asc(),
            ProjectImage.id.asc(),
        )
    ).all()


    return images


# ============================================================
# UPLOAD PROJECT IMAGE
# ============================================================

@router.post(
    "/{project_id}/images",
    response_model=ProjectImageResponse,
    status_code=201,
)
def upload_project_image(
    project_id: int,
    file: UploadFile = File(...),
    alt_text: str | None = None,
    sort_order: int | None = None,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Check project
    # --------------------------------------------------------

    project = db.get(
        Project,
        project_id,
    )

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )


    # --------------------------------------------------------
    # Check image type
    # --------------------------------------------------------

    allowed_types = {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
    }

    if file.content_type not in allowed_types:

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

    max_size = 10 * 1024 * 1024

    file.file.seek(0, 2)

    file_size = file.file.tell()

    file.file.seek(0)

    if file_size > max_size:

        raise HTTPException(
            status_code=400,
            detail="Image must be smaller than 10MB",
        )


    # --------------------------------------------------------
    # Create project directory
    # --------------------------------------------------------

    project_directory = (
        UPLOAD_PATH
        / "projects"
        / project.slug
    )

    project_directory.mkdir(
        parents=True,
        exist_ok=True,
    )


    # --------------------------------------------------------
    # Determine extension
    # --------------------------------------------------------

    original_name = (
        file.filename
        or "image"
    )

    extension = Path(
        original_name
    ).suffix.lower()


    if extension not in {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".avif",
    }:

        extension = ".webp"


    # --------------------------------------------------------
    # Determine next image number
    # --------------------------------------------------------

    existing_count = db.scalar(
        select(
            func.count(ProjectImage.id)
        )
        .where(
            ProjectImage.project_id == project_id
        )
    )


    next_number = (
        existing_count + 1
    )


    # --------------------------------------------------------
    # Create filename
    # --------------------------------------------------------

    filename = (
        f"{project.slug}"
        f"-{next_number}"
        f"{extension}"
    )


    destination = (
        project_directory
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
    # Determine sort order
    # --------------------------------------------------------

    if sort_order is None:

        max_sort_order = db.scalar(
            select(
                func.max(
                    ProjectImage.sort_order
                )
            )
            .where(
                ProjectImage.project_id
                == project_id
            )
        )

        if max_sort_order is None:

            sort_order = 1

        else:

            sort_order = (
                max_sort_order + 1
            )


    # --------------------------------------------------------
    # Save image in MySQL
    # --------------------------------------------------------

    image = ProjectImage(
        project_id=project_id,

        image_url=(
            f"/uploads/projects/"
            f"{project.slug}/"
            f"{filename}"
        ),

        alt_text=alt_text,

        sort_order=sort_order,
    )


    db.add(image)

    db.commit()

    db.refresh(image)


    return image


# ============================================================
# DELETE PROJECT IMAGE
# ============================================================

@router.delete(
    "/images/{image_id}",
    status_code=204,
)
def delete_project_image(
    image_id: int,
    db: Session = Depends(get_db),
):

    # --------------------------------------------------------
    # Find image
    # --------------------------------------------------------

    image = db.get(
        ProjectImage,
        image_id,
    )

    if not image:

        raise HTTPException(
            status_code=404,
            detail="Image not found",
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