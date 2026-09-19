from pathlib import Path
import shutil
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)

from fastapi.responses import FileResponse

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db, UPLOAD_PATH
from ..models import CareerApplication, Admin
from ..schemas import (
    CareerApplicationResponse,
    CareerApplicationUpdate,
)


router = APIRouter(
    prefix="/api/career-applications",
    tags=["Career Applications"],
)


# ============================================================
# CONSTANTS
# ============================================================

ALLOWED_RESUME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".doc",
    ".docx",
}

MAX_RESUME_SIZE = 5 * 1024 * 1024

ALLOWED_STATUSES = {
    "New",
    "Reviewing",
    "Shortlisted",
    "Interview",
    "Selected",
    "Rejected",
    "Closed",
}


# ============================================================
# HELPER — GET APPLICATION
# ============================================================

def get_application_or_404(
    application_id: int,
    db: Session,
) -> CareerApplication:

    application = db.get(
        CareerApplication,
        application_id,
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Career application not found.",
        )

    return application


# ============================================================
# HELPER — DELETE RESUME SAFELY
# ============================================================

def delete_resume_file(
    resume_url: str | None,
) -> None:

    if not resume_url:
        return

    if not resume_url.startswith(
        "/uploads/career-applications/"
    ):
        return

    relative_path = (
        resume_url.removeprefix("/uploads/")
    )

    resume_path = (
        UPLOAD_PATH / relative_path
    ).resolve()

    uploads_root = (
        UPLOAD_PATH / "career-applications"
    ).resolve()

    # Security check
    if uploads_root not in resume_path.parents:
        return

    if resume_path.is_file():
        resume_path.unlink()


# ============================================================
# CREATE CAREER APPLICATION
# PUBLIC
# ============================================================

@router.post(
    "",
    response_model=CareerApplicationResponse,
    status_code=201,
)
async def create_career_application(
    position: str = Form(...),
    fullName: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    whatsapp: str | None = Form(None),
    city: str | None = Form(None),
    state: str | None = Form(None),
    experience: str | None = Form(None),
    currentCompany: str | None = Form(None),
    designation: str | None = Form(None),
    qualification: str | None = Form(None),
    expectedSalary: str | None = Form(None),
    noticePeriod: str | None = Form(None),
    linkedin: str | None = Form(None),
    portfolio: str | None = Form(None),
    source: str | None = Form(None),
    whyJoin: str | None = Form(None),
    coverLetter: str | None = Form(None),
    consent: bool = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    # ========================================================
    # VALIDATION
    # ========================================================

    position = position.strip()
    fullName = fullName.strip()
    email = email.strip()
    phone = phone.strip()

    if not position:
        raise HTTPException(
            status_code=400,
            detail="Position is required.",
        )

    if not fullName:
        raise HTTPException(
            status_code=400,
            detail="Full name is required.",
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email address is required.",
        )

    if not phone:
        raise HTTPException(
            status_code=400,
            detail="Phone number is required.",
        )

    if not consent:
        raise HTTPException(
            status_code=400,
            detail=(
                "Please confirm that the information "
                "provided is accurate."
            ),
        )

    # ========================================================
    # RESUME VALIDATION
    # ========================================================

    if not resume.filename:
        raise HTTPException(
            status_code=400,
            detail="Resume is required.",
        )

    extension = Path(
        resume.filename
    ).suffix.lower()

    if resume.content_type not in ALLOWED_RESUME_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOC and DOCX resumes are allowed.",
        )

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Invalid resume file extension.",
        )

    # ========================================================
    # CHECK FILE SIZE
    # ========================================================

    resume.file.seek(0, 2)

    file_size = resume.file.tell()

    resume.file.seek(0)

    if file_size > MAX_RESUME_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Resume size must be less than 5 MB.",
        )

    # ========================================================
    # CREATE UPLOAD DIRECTORY
    # ========================================================

    upload_directory = (
        UPLOAD_PATH / "career-applications"
    )

    upload_directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    # ========================================================
    # CREATE UNIQUE FILE NAME
    # ========================================================

    filename = (
        f"{uuid4().hex}{extension}"
    )

    destination = (
        upload_directory / filename
    )

    # ========================================================
    # SAVE RESUME
    # ========================================================

    try:

        with destination.open("wb") as buffer:

            shutil.copyfileobj(
                resume.file,
                buffer,
            )

    except Exception as error:

        if destination.exists():
            destination.unlink()

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save resume: {error}",
        )

    # ========================================================
    # CREATE DATABASE RECORD
    # ========================================================

    application = CareerApplication(
        position=position,

        full_name=fullName,

        email=email,

        phone=phone,

        whatsapp=(
            whatsapp.strip()
            if whatsapp
            else None
        ),

        city=(
            city.strip()
            if city
            else None
        ),

        state=(
            state.strip()
            if state
            else None
        ),

        experience=(
            experience.strip()
            if experience
            else None
        ),

        current_company=(
            currentCompany.strip()
            if currentCompany
            else None
        ),

        designation=(
            designation.strip()
            if designation
            else None
        ),

        qualification=(
            qualification.strip()
            if qualification
            else None
        ),

        expected_salary=(
            expectedSalary.strip()
            if expectedSalary
            else None
        ),

        notice_period=(
            noticePeriod.strip()
            if noticePeriod
            else None
        ),

        linkedin=(
            linkedin.strip()
            if linkedin
            else None
        ),

        portfolio=(
            portfolio.strip()
            if portfolio
            else None
        ),

        source=(
            source.strip()
            if source
            else None
        ),

        why_join=(
            whyJoin.strip()
            if whyJoin
            else None
        ),

        cover_letter=(
            coverLetter.strip()
            if coverLetter
            else None
        ),

        resume_url=(
            f"/uploads/career-applications/"
            f"{filename}"
        ),

        resume_original_name=resume.filename,

        status="New",

        admin_notes=None,

        consent=consent,
    )

    try:

        db.add(application)

        db.commit()

        db.refresh(application)

    except Exception as error:

        db.rollback()

        # Remove resume if DB save fails
        if destination.exists():
            destination.unlink()

        raise HTTPException(
            status_code=500,
            detail=(
                f"Failed to save career application: "
                f"{error}"
            ),
        )

    return application


# ============================================================
# GET ALL APPLICATIONS
# ADMIN ONLY
# ============================================================

@router.get(
    "/admin",
    response_model=list[CareerApplicationResponse],
)
def get_career_applications(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):

    applications = db.scalars(
        select(CareerApplication)
        .order_by(
            CareerApplication.created_at.desc(),
            CareerApplication.id.desc(),
        )
    ).all()

    return applications


# ============================================================
# GET SINGLE APPLICATION
# ADMIN ONLY
# ============================================================

@router.get(
    "/admin/{application_id}",
    response_model=CareerApplicationResponse,
)
def get_career_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):

    return get_application_or_404(
        application_id,
        db,
    )


# ============================================================
# DOWNLOAD RESUME
# ADMIN ONLY
# ============================================================

@router.get(
    "/admin/{application_id}/resume",
)
def download_resume(
    application_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):

    application = get_application_or_404(
        application_id,
        db,
    )

    if not application.resume_url:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    if not application.resume_url.startswith(
        "/uploads/career-applications/"
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid resume path.",
        )

    relative_path = (
        application.resume_url
        .removeprefix("/uploads/")
    )

    resume_path = (
        UPLOAD_PATH / relative_path
    ).resolve()

    uploads_root = (
        UPLOAD_PATH / "career-applications"
    ).resolve()

    # Security check
    if uploads_root not in resume_path.parents:
        raise HTTPException(
            status_code=400,
            detail="Invalid resume path.",
        )

    if not resume_path.is_file():
        raise HTTPException(
            status_code=404,
            detail="Resume file not found.",
        )

    return FileResponse(
        path=resume_path,
        filename=(
            application.resume_original_name
            or resume_path.name
        ),
    )


# ============================================================
# UPDATE APPLICATION
# ADMIN ONLY
# ============================================================

@router.patch(
    "/{application_id}",
    response_model=CareerApplicationResponse,
)
def update_career_application(
    application_id: int,
    application_data: CareerApplicationUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):

    application = get_application_or_404(
        application_id,
        db,
    )

    updates = application_data.model_dump(
        exclude_unset=True,
    )

    # ========================================================
    # STATUS VALIDATION
    # ========================================================

    if "status" in updates:

        status = updates["status"]

        if status is not None:

            status = status.strip()

            if status not in ALLOWED_STATUSES:

                raise HTTPException(
                    status_code=400,
                    detail=(
                        "Invalid status. Allowed statuses: "
                        "New, Reviewing, Shortlisted, "
                        "Interview, Selected, Rejected, Closed."
                    ),
                )

            updates["status"] = status

    # ========================================================
    # UPDATE FIELDS
    # ========================================================

    for key, value in updates.items():

        if key == "admin_notes":

            if isinstance(value, str):
                value = value.strip() or None

        setattr(
            application,
            key,
            value,
        )

    db.commit()

    db.refresh(application)

    return application


# ============================================================
# DELETE APPLICATION
# ADMIN ONLY
# ============================================================

@router.delete(
    "/{application_id}",
    status_code=204,
)
def delete_career_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):

    application = get_application_or_404(
        application_id,
        db,
    )

    previous_resume = application.resume_url

    # ========================================================
    # DELETE DATABASE RECORD
    # ========================================================

    db.delete(application)

    db.commit()

    # ========================================================
    # DELETE RESUME FILE
    # ========================================================

    delete_resume_file(
        previous_resume
    )

    return None