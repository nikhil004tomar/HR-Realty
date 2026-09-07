from pathlib import Path
from .routes.inquiries import router as inquiry_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routes.channel_partners import router as channel_partner_router
from .routes.auth import router as auth_router
from .routes import testimonials
from .database import (
    Base,
    engine,
    settings,
    UPLOAD_PATH,
)

from .models import Project, ProjectImage
from .routes.projects import router as project_router


# ============================================================
# PATHS
# ============================================================

print("========================================")
print("BACKEND DIRECTORY:")
print(UPLOAD_PATH.parent)

print("UPLOAD DIRECTORY:")
print(UPLOAD_PATH)

print("UPLOAD DIRECTORY EXISTS:")
print(UPLOAD_PATH.exists())
print("========================================")


# ============================================================
# CREATE UPLOAD DIRECTORY
# ============================================================

UPLOAD_PATH.mkdir(
    parents=True,
    exist_ok=True
)


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(
    bind=engine
)


# ============================================================
# FASTAPI
# ============================================================

app = FastAPI(
    title="HR Realty International API",
    description="Real Estate Backend API",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        settings.CORS_ORIGINS
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ============================================================
# STATIC FILES
# ============================================================

app.mount(
    "/uploads",
    StaticFiles(
        directory=str(UPLOAD_PATH),
        check_dir=True
    ),
    name="uploads"
)


# ============================================================
# ROUTES
# ============================================================


app.include_router(
    project_router
)

app.include_router(
    inquiry_router
)

app.include_router(
    channel_partner_router
)

app.include_router(
    auth_router
)

app.include_router(
    testimonials.router
)
# ============================================================
# DEBUG UPLOAD PATH
# ============================================================

@app.get("/api/debug/uploads")
def debug_uploads():

    target = (
        UPLOAD_PATH
        / "projects"
        / "dholera-metro-city-5017"
        / "dholera-metro-city-5017-1.jpg"
    )

    return {
        "upload_path": str(UPLOAD_PATH),

        "upload_path_exists": UPLOAD_PATH.exists(),

        "target_file": str(target),

        "target_exists": target.exists(),

        "target_is_file": target.is_file(),

        "files_in_project_folder": [
            file.name
            for file in target.parent.iterdir()
        ] if target.parent.exists() else []
    }


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "HR Realty International Backend is running!"
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/api/health")
def health():

    return {
        "status": "ok",
        "database": "connected"
    }