# Team API contract

All request and response bodies are JSON except image uploads. Relative
`profile_image` values are served by FastAPI under the public `/uploads` path.

## Public endpoint

`GET /api/team`

Returns published members only, sorted by `display_order`, then `id`.

## Admin endpoints

Every endpoint below requires `Authorization: Bearer <access_token>`.

- `GET /api/team/admin` — all members, including drafts.
- `GET /api/team/admin/{member_id}` — one member.
- `POST /api/team` — create a member.
- `PATCH /api/team/{member_id}` — update supplied fields.
- `POST /api/team/{member_id}/image` — multipart form-data field `file`; replaces
  the current image. JPG, PNG, WEBP and AVIF are supported, up to 10 MB.
- `DELETE /api/team/{member_id}/image` — clears the profile image.
- `DELETE /api/team/{member_id}` — deletes the member and its upload folder.

Create body:

```json
{
  "name": "Asha Patel",
  "designation": "Sales Director",
  "bio": "Optional profile text.",
  "profile_image": null,
  "phone": "+91 99999 99999",
  "email": "asha@example.com",
  "linkedin_url": "https://www.linkedin.com/in/asha-patel",
  "display_order": 1,
  "is_published": true
}
```

Successful responses use this shape:

```json
{
  "id": 1,
  "name": "Asha Patel",
  "designation": "Sales Director",
  "bio": "Optional profile text.",
  "profile_image": "/uploads/team/1/9f4c.jpg",
  "phone": "+91 99999 99999",
  "email": "asha@example.com",
  "linkedin_url": "https://www.linkedin.com/in/asha-patel",
  "display_order": 1,
  "is_published": true,
  "created_at": "2026-09-11T10:00:00",
  "updated_at": "2026-09-11T10:00:00"
}
```
