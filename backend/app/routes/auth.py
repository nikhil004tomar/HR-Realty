from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..auth import (
    create_access_token,
    get_current_admin,
    hash_password,
    verify_password,
)

from ..database import get_db

from ..models import Admin

from ..schemas import (
    AdminCreate,
    AdminLogin,
    AdminResponse,
    TokenResponse,
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


# ============================================================
# REGISTER ADMIN
# ============================================================

@router.post(
    "/register",
    response_model=AdminResponse,
    status_code=201
)
def register_admin(
    admin_data: AdminCreate,
    db: Session = Depends(get_db)
):

    existing_admin = db.scalar(
        select(Admin)
        .where(
            Admin.email == admin_data.email
        )
    )

    if existing_admin:

        raise HTTPException(
            status_code=409,
            detail="Admin with this email already exists"
        )

    admin = Admin(
        name=admin_data.name,
        email=admin_data.email,
        password_hash=hash_password(
            admin_data.password
        ),
        is_active=True
    )

    db.add(admin)

    db.commit()

    db.refresh(admin)

    return admin


# ============================================================
# LOGIN
# ============================================================

@router.post(
    "/login",
    response_model=TokenResponse
)
def login_admin(
    login_data: AdminLogin,
    db: Session = Depends(get_db)
):

    admin = db.scalar(
        select(Admin)
        .where(
            Admin.email == login_data.email
        )
    )

    if not admin:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        login_data.password,
        admin.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not admin.is_active:

        raise HTTPException(
            status_code=403,
            detail="Admin account is disabled"
        )

    token = create_access_token(
        admin_id=admin.id,
        email=admin.email
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "admin": admin
    }


# ============================================================
# CURRENT ADMIN
# ============================================================

@router.get(
    "/me",
    response_model=AdminResponse
)
def get_me(
    current_admin: Admin = Depends(
        get_current_admin
    )
):

    return current_admin