from pathlib import Path
from urllib.parse import quote_plus

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # ========================================================
    # MYSQL DATABASE
    # ========================================================

    MYSQL_DATABASE: str

    MYSQL_USER: str

    MYSQL_PASSWORD: str

    # ========================================================
    # CORS
    # ========================================================

    CORS_ORIGINS: str = "http://localhost:3000"

    # ========================================================
    # UPLOADS
    # ========================================================

    UPLOAD_DIR: str = "uploads"

    # ========================================================
    # JWT
    # ========================================================

    JWT_SECRET_KEY: str

    JWT_ALGORITHM: str = "HS256"

    JWT_EXPIRE_MINUTES: int = 1440

    # ========================================================
    # PYDANTIC SETTINGS
    # ========================================================

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()


# ============================================================
# BASE DIRECTORY
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent


# ============================================================
# UPLOAD DIRECTORY
# ============================================================

UPLOAD_PATH = BASE_DIR / settings.UPLOAD_DIR


# ============================================================
# DATABASE URL
# ============================================================

DATABASE_URL = (
    "mysql+pymysql://"
    f"{quote_plus(settings.MYSQL_USER)}:"
    f"{quote_plus(settings.MYSQL_PASSWORD)}@"
    "mysql:3306/"
    f"{quote_plus(settings.MYSQL_DATABASE)}"
)


# ============================================================
# DATABASE ENGINE
# ============================================================

engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,
)


# ============================================================
# DATABASE SESSION
# ============================================================

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
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