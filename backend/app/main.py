from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .database import (
    Base,
    engine,
    settings,
    UPLOAD_PATH,
)

# ============================================================
# ROUTES
# ============================================================

from .routes.inquiries import router as inquiry_router
from .routes.channel_partners import (
    router as channel_partner_router,
)
from .routes.auth import router as auth_router
from .routes import testimonials
from .routes.maps import router as maps_router
from .routes.projects import router as project_router
from .routes.team import router as team_router
from .routes.career_applications import (
    router as career_applications_router,
)
from .routes.connectivity import (
    router as connectivity_router,
)


# ============================================================
# MODELS
# ============================================================

# IMPORTANT:
# These imports make sure SQLAlchemy knows about all models
# before Base.metadata.create_all() runs.

from .models import (
    Project,
    ProjectImage,
    TeamMember,
    SiteMap,
    CareerApplication,
    Connectivity,
    ConnectivityImage,
)


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
    exist_ok=True,
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
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in settings.CORS_ORIGINS.split(",")
    if origin.strip()
]

print("========================================")
print("CORS ALLOWED ORIGINS:")
print(ALLOWED_ORIGINS)
print("========================================")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
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
        check_dir=True,
    ),
    name="uploads",
)


# ============================================================
# ROUTES
# ============================================================

# ------------------------------------------------------------
# MAPS
# ------------------------------------------------------------

app.include_router(
    maps_router
)


# ------------------------------------------------------------
# PROJECTS
# ------------------------------------------------------------

app.include_router(
    project_router
)


# ------------------------------------------------------------
# TEAM
# ------------------------------------------------------------

app.include_router(
    team_router
)


# ------------------------------------------------------------
# INQUIRIES
# ------------------------------------------------------------

app.include_router(
    inquiry_router
)


# ------------------------------------------------------------
# CHANNEL PARTNERS
# ------------------------------------------------------------

app.include_router(
    channel_partner_router
)


# ------------------------------------------------------------
# AUTH
# ------------------------------------------------------------

app.include_router(
    auth_router
)


# ------------------------------------------------------------
# TESTIMONIALS
# ------------------------------------------------------------

app.include_router(
    testimonials.router
)


# ------------------------------------------------------------
# CAREER APPLICATIONS
# ------------------------------------------------------------

app.include_router(
    career_applications_router
)


# ------------------------------------------------------------
# CONNECTIVITY
# ------------------------------------------------------------

app.include_router(
    connectivity_router
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

        "upload_path_exists": (
            UPLOAD_PATH.exists()
        ),

        "target_file": str(target),

        "target_exists": (
            target.exists()
        ),

        "target_is_file": (
            target.is_file()
        ),

        "files_in_project_folder": [
            file.name
            for file in target.parent.iterdir()
        ]
        if target.parent.exists()
        else [],
    }


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": (
            "HR Realty International Backend "
            "is running!"
        )
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/api/health")
def health():

    return {
        "status": "ok",
        "database": "connected",
    }