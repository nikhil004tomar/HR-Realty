from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


# ============================================================
# PROJECT
# ============================================================

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    slug: Mapped[str] = mapped_column(
        String(180),
        unique=True,
        index=True,
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(80),
        default="Booking Open",
        nullable=False
    )

    location: Mapped[str] = mapped_column(
        String(255),
        default="Dholera SIR, Gujarat",
        nullable=False
    )

    price: Mapped[str] = mapped_column(
        String(120),
        default="Price on Request",
        nullable=False
    )

    plot_size: Mapped[str] = mapped_column(
        String(120),
        default="1000 Sq. Ft.",
        nullable=False
    )

    property_type: Mapped[str] = mapped_column(
        String(120),
        default="Residential Plot",
        nullable=False
    )

    possession: Mapped[str] = mapped_column(
        String(120),
        default="Ready",
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    highlights: Mapped[list] = mapped_column(
        JSON,
        default=list,
        nullable=False
    )

    amenities: Mapped[list] = mapped_column(
        JSON,
        default=list,
        nullable=False
    )

    map_url: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True
    )

    is_published: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    # One Project -> Many Project Images
    images: Mapped[list["ProjectImage"]] = relationship(
        "ProjectImage",
        back_populates="project",
        cascade="all, delete-orphan",
        order_by="ProjectImage.sort_order"
    )


# ============================================================
# PROJECT IMAGE
# ============================================================

class ProjectImage(Base):
    __tablename__ = "project_images"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey(
            "projects.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    image_url: Mapped[str] = mapped_column(
        String(1000),
        nullable=False
    )

    alt_text: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    sort_order: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    project: Mapped["Project"] = relationship(
        "Project",
        back_populates="images"
    )

    # ============================================================
# INQUIRY
# ============================================================

# ============================================================
# INQUIRY
# ============================================================

class Inquiry(Base):
    __tablename__ = "inquiries"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    project_id: Mapped[int | None] = mapped_column(
        ForeignKey(
            "projects.id",
            ondelete="SET NULL"
        ),
        nullable=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    phone: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    city: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True
    )

    message: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="new",
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    project: Mapped["Project | None"] = relationship(
        "Project"
    )


    # ============================================================
# CHANNEL PARTNER
# ============================================================

class ChannelPartner(Base):
    __tablename__ = "channel_partners"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    email: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    phone: Mapped[str] = mapped_column(
        String(30),
        nullable=False
    )

    city: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True
    )

    company: Mapped[str | None] = mapped_column(
        String(200),
        nullable=True
    )

    experience: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    message: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(50),
        default="new",
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    # ============================================================
# ADMIN
# ============================================================

class Admin(Base):
    __tablename__ = "admins"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    # ============================================================
# TESTIMONIAL
# ============================================================

class Testimonial(Base):
    __tablename__ = "testimonials"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    location: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    image: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True
    )

    is_published: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )