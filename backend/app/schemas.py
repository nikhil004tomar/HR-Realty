from datetime import datetime

from pydantic import BaseModel, ConfigDict


# ============================================================
# PROJECT CREATE
# ============================================================

class ProjectCreate(BaseModel):
    slug: str
    title: str

    status: str = "Booking Open"

    location: str = "Dholera SIR, Gujarat"

    price: str = "Price on Request"

    plot_size: str = "1000 Sq. Ft."

    property_type: str = "Residential Plot"

    possession: str = "Ready"

    description: str

    highlights: list[str] = []

    amenities: list[str] = []

    map_url: str | None = None

    is_published: bool = True


# ============================================================
# PROJECT UPDATE
# ============================================================

class ProjectUpdate(BaseModel):
    slug: str
    title: str

    status: str

    location: str

    price: str

    plot_size: str

    property_type: str

    possession: str

    description: str

    highlights: list[str]

    amenities: list[str]

    map_url: str | None = None

    is_published: bool


# ============================================================
# PROJECT IMAGE RESPONSE
# ============================================================

class ProjectImageResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    image_url: str

    alt_text: str | None

    sort_order: int

    created_at: datetime


# ============================================================
# PROJECT RESPONSE
# ============================================================

class ProjectResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    slug: str

    title: str

    status: str

    location: str

    price: str

    plot_size: str

    property_type: str

    possession: str

    description: str

    highlights: list[str]

    amenities: list[str]

    map_url: str | None

    is_published: bool

    created_at: datetime

    updated_at: datetime

    images: list[ProjectImageResponse] = []

   # ============================================================
# INQUIRY CREATE
# ============================================================

class InquiryCreate(BaseModel):

    project_id: int | None = None

    name: str

    email: str | None = None

    phone: str

    city: str | None = None

    message: str | None = None


# ============================================================
# INQUIRY UPDATE
# ============================================================

class InquiryUpdate(BaseModel):
    status: str

# ============================================================
# INQUIRY RESPONSE
# ============================================================

class InquiryResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    project_id: int | None

    name: str

    email: str | None

    phone: str

    city: str | None

    message: str | None

    status: str

    created_at: datetime

    updated_at: datetime
    # ============================================================
# CHANNEL PARTNER CREATE
# ============================================================

class ChannelPartnerCreate(BaseModel):

    name: str

    email: str | None = None

    phone: str

    city: str | None = None

    company: str | None = None

    experience: str | None = None

    message: str | None = None


# ============================================================
# CHANNEL PARTNER UPDATE
# ============================================================

class ChannelPartnerUpdate(BaseModel):

    status: str


# ============================================================
# CHANNEL PARTNER RESPONSE
# ============================================================

class ChannelPartnerResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    name: str

    email: str | None

    phone: str

    city: str | None

    company: str | None

    experience: str | None

    message: str | None

    status: str

    created_at: datetime

    updated_at: datetime

    # ============================================================
# ADMIN REGISTER
# ============================================================

class AdminCreate(BaseModel):

    name: str

    email: str

    password: str


# ============================================================
# ADMIN LOGIN
# ============================================================

class AdminLogin(BaseModel):

    email: str

    password: str


# ============================================================
# ADMIN RESPONSE
# ============================================================

class AdminResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    name: str

    email: str

    is_active: bool

    created_at: datetime


# ============================================================
# LOGIN RESPONSE
# ============================================================

class TokenResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"

    admin: AdminResponse

    # ============================================================
# TESTIMONIAL CREATE
# ============================================================

class TestimonialCreate(BaseModel):

    name: str

    location: str | None = None

    message: str

    image: str | None = None

    is_published: bool = True


# ============================================================
# TESTIMONIAL UPDATE
# ============================================================

class TestimonialUpdate(BaseModel):

    name: str

    location: str | None = None

    message: str

    image: str | None = None

    is_published: bool


# ============================================================
# TESTIMONIAL RESPONSE
# ============================================================

class TestimonialResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    name: str

    location: str | None

    message: str

    image: str | None

    is_published: bool

    created_at: datetime

    updated_at: datetime