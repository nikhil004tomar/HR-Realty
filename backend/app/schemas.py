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


# ============================================================
# TEAM MEMBER
# ============================================================

class TeamMemberCreate(BaseModel):

    name: str

    designation: str

    bio: str | None = None

    profile_image: str | None = None

    phone: str | None = None

    email: str | None = None

    linkedin_url: str | None = None

    display_order: int = 0

    is_published: bool = True


class TeamMemberUpdate(BaseModel):

    name: str | None = None

    designation: str | None = None

    bio: str | None = None

    profile_image: str | None = None

    phone: str | None = None

    email: str | None = None

    linkedin_url: str | None = None

    display_order: int | None = None

    is_published: bool | None = None


class TeamMemberResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    name: str

    designation: str

    bio: str | None

    profile_image: str | None

    phone: str | None

    email: str | None

    linkedin_url: str | None

    display_order: int

    is_published: bool

    created_at: datetime

    updated_at: datetime

class SiteMapCreate(BaseModel):
    title: str
    description: str | None = None
    image: str | None = None
    display_order: int = 0
    is_published: bool = True


class SiteMapUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    image: str | None = None
    display_order: int | None = None
    is_published: bool | None = None


class SiteMapResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None
    image: str | None
    display_order: int
    is_published: bool
    created_at: datetime
    updated_at: datetime


class CareerApplicationResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    position: str

    full_name: str

    email: str

    phone: str

    whatsapp: str | None

    city: str | None

    state: str | None

    experience: str | None

    current_company: str | None

    designation: str | None

    qualification: str | None

    expected_salary: str | None

    notice_period: str | None

    linkedin: str | None

    portfolio: str | None

    source: str | None

    why_join: str | None

    cover_letter: str | None

    resume_url: str

    resume_original_name: str | None

    status: str

    admin_notes: str | None

    consent: bool

    created_at: datetime

    updated_at: datetime


class CareerApplicationUpdate(BaseModel):
    status: str | None = None
    admin_notes: str | None = None

    # ============================================================
# CONNECTIVITY IMAGE RESPONSE
# ============================================================

class ConnectivityImageResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    connectivity_id: int

    image_url: str

    original_name: str | None

    display_order: int

    created_at: datetime


# ============================================================
# CONNECTIVITY CREATE
# ============================================================

class ConnectivityCreate(BaseModel):

    slug: str

    title: str

    description: str | None = None

    display_order: int = 0

    is_published: bool = True


# ============================================================
# CONNECTIVITY UPDATE
# ============================================================

class ConnectivityUpdate(BaseModel):

    slug: str | None = None

    title: str | None = None

    description: str | None = None

    display_order: int | None = None

    is_published: bool | None = None


# ============================================================
# CONNECTIVITY IMAGE UPDATE
# ============================================================

class ConnectivityImageUpdate(BaseModel):

    display_order: int | None = None


# ============================================================
# CONNECTIVITY RESPONSE
# ============================================================

class ConnectivityResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    slug: str

    title: str

    description: str | None

    display_order: int

    is_published: bool

    created_at: datetime

    updated_at: datetime

    images: list[ConnectivityImageResponse] = []