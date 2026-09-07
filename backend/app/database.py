from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str

    CORS_ORIGINS: str = "http://localhost:3000"

    UPLOAD_DIR: str = "uploads"

    JWT_SECRET_KEY: str

    JWT_ALGORITHM: str = "HS256"

    JWT_EXPIRE_MINUTES: int = 1440

    class Config:
        env_file = ".env"


settings = Settings()


# ============================================================
# BASE DIRECTORY
# ============================================================

BASE_DIR = Path(
    __file__
).resolve().parent.parent


# ============================================================
# UPLOAD DIRECTORY
# ============================================================

UPLOAD_PATH = (
    BASE_DIR / settings.UPLOAD_DIR
)


# ============================================================
# DATABASE
# ============================================================

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


# ============================================================
# SQLALCHEMY BASE
# ============================================================

class Base(DeclarativeBase):
    pass


# ============================================================
# DATABASE DEPENDENCY
# ============================================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()