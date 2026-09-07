from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, Inquiry, Project
from ..schemas import (
    InquiryCreate,
    InquiryResponse,
    InquiryUpdate,
)


router = APIRouter(
    prefix="/api/inquiries",
    tags=["Inquiries"],
)


# ============================================================
# CREATE INQUIRY
# PUBLIC
# ============================================================

@router.post(
    "",
    response_model=InquiryResponse,
    status_code=201,
)
def create_inquiry(
    inquiry_data: InquiryCreate,
    db: Session = Depends(get_db),
):
    """
    Public endpoint.

    Customers can submit enquiries from the website
    without logging into the admin panel.
    """

    # --------------------------------------------------------
    # Verify project if project_id was supplied
    # --------------------------------------------------------

    if inquiry_data.project_id is not None:

        project = db.get(
            Project,
            inquiry_data.project_id,
        )

        if not project:

            raise HTTPException(
                status_code=404,
                detail="Project not found",
            )

    # --------------------------------------------------------
    # Create inquiry
    # --------------------------------------------------------

    inquiry = Inquiry(
        **inquiry_data.model_dump()
    )

    db.add(inquiry)

    db.commit()

    db.refresh(inquiry)

    return inquiry


# ============================================================
# GET ALL INQUIRIES
# ADMIN ONLY
# ============================================================

@router.get(
    "",
    response_model=list[InquiryResponse],
)
def get_inquiries(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Returns all customer enquiries.
    """

    inquiries = db.scalars(
        select(Inquiry)
        .order_by(
            Inquiry.created_at.desc()
        )
    ).all()

    return inquiries


# ============================================================
# GET SINGLE INQUIRY
# ADMIN ONLY
# ============================================================

@router.get(
    "/{inquiry_id}",
    response_model=InquiryResponse,
)
def get_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Returns one inquiry.
    """

    inquiry = db.get(
        Inquiry,
        inquiry_id,
    )

    if not inquiry:

        raise HTTPException(
            status_code=404,
            detail="Inquiry not found",
        )

    return inquiry


# ============================================================
# UPDATE INQUIRY STATUS
# ADMIN ONLY
# ============================================================

@router.patch(
    "/{inquiry_id}",
    response_model=InquiryResponse,
)
def update_inquiry(
    inquiry_id: int,
    inquiry_data: InquiryUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Updates the inquiry status.
    """

    inquiry = db.get(
        Inquiry,
        inquiry_id,
    )

    if not inquiry:

        raise HTTPException(
            status_code=404,
            detail="Inquiry not found",
        )

    inquiry.status = inquiry_data.status

    db.commit()

    db.refresh(inquiry)

    return inquiry


# ============================================================
# DELETE INQUIRY
# ADMIN ONLY
# ============================================================

@router.delete(
    "/{inquiry_id}",
    status_code=204,
)
def delete_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Permanently deletes an inquiry.
    """

    inquiry = db.get(
        Inquiry,
        inquiry_id,
    )

    if not inquiry:

        raise HTTPException(
            status_code=404,
            detail="Inquiry not found",
        )

    db.delete(inquiry)

    db.commit()

    return None