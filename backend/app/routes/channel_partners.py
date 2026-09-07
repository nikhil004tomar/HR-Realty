from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, ChannelPartner
from ..schemas import (
    ChannelPartnerCreate,
    ChannelPartnerResponse,
    ChannelPartnerUpdate,
)


router = APIRouter(
    prefix="/api/channel-partners",
    tags=["Channel Partners"],
)


# ============================================================
# CREATE CHANNEL PARTNER
# PUBLIC
# ============================================================

@router.post(
    "",
    response_model=ChannelPartnerResponse,
    status_code=201,
)
def create_channel_partner(
    partner_data: ChannelPartnerCreate,
    db: Session = Depends(get_db),
):
    """
    Public endpoint.

    Visitors can submit the channel partner form
    without logging into the admin panel.
    """

    partner = ChannelPartner(
        **partner_data.model_dump()
    )

    db.add(partner)

    db.commit()

    db.refresh(partner)

    return partner


# ============================================================
# GET ALL CHANNEL PARTNERS
# ADMIN ONLY
# ============================================================

@router.get(
    "",
    response_model=list[ChannelPartnerResponse],
)
def get_channel_partners(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Returns all channel partner applications.
    """

    partners = db.scalars(
        select(ChannelPartner)
        .order_by(
            ChannelPartner.created_at.desc()
        )
    ).all()

    return partners


# ============================================================
# GET SINGLE CHANNEL PARTNER
# ADMIN ONLY
# ============================================================

@router.get(
    "/{partner_id}",
    response_model=ChannelPartnerResponse,
)
def get_channel_partner(
    partner_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Returns one channel partner application.
    """

    partner = db.get(
        ChannelPartner,
        partner_id,
    )

    if not partner:

        raise HTTPException(
            status_code=404,
            detail="Channel partner not found",
        )

    return partner


# ============================================================
# UPDATE CHANNEL PARTNER STATUS
# ADMIN ONLY
# ============================================================

@router.patch(
    "/{partner_id}",
    response_model=ChannelPartnerResponse,
)
def update_channel_partner(
    partner_id: int,
    partner_data: ChannelPartnerUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Updates the channel partner status.
    """

    partner = db.get(
        ChannelPartner,
        partner_id,
    )

    if not partner:

        raise HTTPException(
            status_code=404,
            detail="Channel partner not found",
        )

    partner.status = partner_data.status

    db.commit()

    db.refresh(partner)

    return partner


# ============================================================
# DELETE CHANNEL PARTNER
# ADMIN ONLY
# ============================================================

@router.delete(
    "/{partner_id}",
    status_code=204,
)
def delete_channel_partner(
    partner_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin),
):
    """
    Admin-only endpoint.

    Permanently deletes a channel partner application.
    """

    partner = db.get(
        ChannelPartner,
        partner_id,
    )

    if not partner:

        raise HTTPException(
            status_code=404,
            detail="Channel partner not found",
        )

    db.delete(partner)

    db.commit()

    return None