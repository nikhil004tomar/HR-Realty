from datetime import datetime, timedelta, timezone

import bcrypt

from jose import JWTError, jwt

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy import select
from sqlalchemy.orm import Session

from .database import get_db, settings
from .models import Admin


# ============================================================
# JWT AUTHENTICATION
# ============================================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


# ============================================================
# PASSWORD HASH
# ============================================================

def hash_password(password: str) -> str:

    password_bytes = password.encode("utf-8")

    # bcrypt supports a maximum of 72 bytes
    if len(password_bytes) > 72:
        raise ValueError(
            "Password must be 72 bytes or fewer."
        )

    hashed = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt()
    )

    return hashed.decode("utf-8")


# ============================================================
# VERIFY PASSWORD
# ============================================================

def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:

    password_bytes = plain_password.encode(
        "utf-8"
    )

    hashed_bytes = hashed_password.encode(
        "utf-8"
    )

    return bcrypt.checkpw(
        password_bytes,
        hashed_bytes
    )


# ============================================================
# CREATE JWT
# ============================================================

def create_access_token(
    admin_id: int,
    email: str
) -> str:

    expire = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=settings.JWT_EXPIRE_MINUTES
        )
    )

    payload = {
        "sub": str(admin_id),
        "email": email,
        "exp": expire
    }

    token = jwt.encode(
        payload,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return token


# ============================================================
# GET CURRENT ADMIN
# ============================================================

def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired authentication token",
        headers={
            "WWW-Authenticate": "Bearer"
        }
    )

    try:

        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[
                settings.JWT_ALGORITHM
            ]
        )

        admin_id = payload.get("sub")

        if admin_id is None:
            raise credentials_exception

        admin_id = int(admin_id)

    except (
        JWTError,
        ValueError,
        TypeError
    ):

        raise credentials_exception

    admin = db.scalar(
        select(Admin)
        .where(
            Admin.id == admin_id
        )
    )

    if not admin:

        raise credentials_exception

    if not admin.is_active:

        raise HTTPException(
            status_code=403,
            detail="Admin account is disabled"
        )

    return admin