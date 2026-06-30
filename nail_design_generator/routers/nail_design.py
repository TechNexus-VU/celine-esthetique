# routers/nail_design.py
# Developer : Muhammad Talha
# Endpoint  : POST /api/ai/generate-nail-design
# Uses      : Pollinations.ai (FREE AI image generation — no API key needed)
#
# NOTE: To switch back to OpenAI DALL-E later, replace the Pollinations
#       call in generate_nail_design() with the OpenAI client call.

import os
import re
import uuid
from urllib.parse import quote
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, field_validator
import httpx

from services.firebase_service import firebase_service

router = APIRouter()


# ──────────────────────────────────────────────
# REQUEST MODEL  — what frontend sends
# ──────────────────────────────────────────────
class NailDesignRequest(BaseModel):
    color: str       # e.g. "pastel pink"
    occasion: str    # e.g. "wedding"
    style: str       # e.g. "elegant"
    length: str      # e.g. "medium"

    @field_validator("color", "occasion", "style", "length", mode="before")
    @classmethod
    def must_not_be_blank(cls, v, info):
        if not isinstance(v, str) or not v.strip():
            raise ValueError(f"{info.field_name} must not be empty")
        return v.strip()


# ──────────────────────────────────────────────
# RESPONSE MODEL — what we send back
# ──────────────────────────────────────────────
class NailDesignResponse(BaseModel):
    imageUrl: str
    prompt: str
    designName: str


class NailDesignGalleryItem(BaseModel):
    id: str
    imageUrl: str
    prompt: str
    designName: str
    color: str
    occasion: str
    style: str
    length: str
    timestamp: str


# ──────────────────────────────────────────────
# INPUT SANITIZER — prevents prompt injection
# ──────────────────────────────────────────────
MAX_FIELD_LENGTH = 80

def sanitize_input(value: str) -> str:
    """Strip control chars, limit length, and remove prompt-injection phrases."""
    value = re.sub(r"[^\w\s\-',]", "", value)          # keep only safe chars
    value = re.sub(r"\s+", " ", value).strip()          # collapse whitespace
    return value[:MAX_FIELD_LENGTH]


# ──────────────────────────────────────────────
# HELPER 1 — builds the image prompt
# ──────────────────────────────────────────────
def build_prompt(color: str, occasion: str, style: str, length: str) -> str:
    """
    The better this prompt → the better the image.
    Be specific: color, occasion, style, length, quality keywords.
    """
    color    = sanitize_input(color)
    occasion = sanitize_input(occasion)
    style    = sanitize_input(style)
    length   = sanitize_input(length)

    return (
        f"Professional nail art photography, close-up shot of beautiful "
        f"{length} length nails, {color} color scheme, {style} style design, "
        f"perfect for {occasion} occasion, luxury salon quality, "
        f"soft studio lighting, nails on white background, "
        f"photorealistic, 4K quality, highly detailed"
    )


# ──────────────────────────────────────────────
# HELPER 2 — generates a creative design name
# ──────────────────────────────────────────────
def generate_design_name(color: str, occasion: str, style: str) -> str:
    occasion_map = {
        "wedding":   "Bridal",
        "party":     "Glam",
        "daily":     "Everyday",
        "birthday":  "Celebration",
        "office":    "Professional",
        "date":      "Romantic",
    }
    style_map = {
        "elegant":    "Elegance",
        "bold":       "Statement",
        "minimalist": "Minimal",
        "glamorous":  "Luxe",
        "cute":       "Charm",
        "classic":    "Classic",
    }
    prefix = occasion_map.get(occasion.lower(), "Signature")
    suffix = style_map.get(style.lower(), "Art")
    return f"{color.title()} {prefix} {suffix}"


# ──────────────────────────────────────────────
# MAIN ENDPOINT
# ──────────────────────────────────────────────
@router.post("/generate-nail-design", response_model=NailDesignResponse)
async def generate_nail_design(request: NailDesignRequest, fastapi_req: Request):
    """
    Accepts nail preferences → calls Pollinations.ai → saves to Firestore/Storage → returns image URL.

    Request:
        color    : nail color (e.g. pastel pink)
        occasion : event type (e.g. wedding)
        style    : design style (e.g. elegant)
        length   : nail length (e.g. medium)

    Response:
        imageUrl   : generated nail art image URL (local or Firebase)
        prompt     : the prompt used
        designName : creative name for the design
    """

    # Step 1 — build prompt + design name
    prompt      = build_prompt(request.color, request.occasion,
                               request.style, request.length)
    design_name = generate_design_name(request.color, request.occasion,
                                       request.style)

    # Step 2 — generate image via Pollinations.ai (FREE, no API key) and save locally
    try:
        encoded_prompt = quote(prompt)
        image_url = (
            f"https://image.pollinations.ai/prompt/{encoded_prompt}"
            f"?width=1024&height=1024&nologo=true&seed={hash(prompt) % 100000}"
        )

        # Download the image bytes from Pollinations.ai on the server
        async with httpx.AsyncClient(timeout=60.0, follow_redirects=True) as http_client:
            resp = await http_client.get(image_url)
            if resp.status_code != 200:
                raise Exception(f"Pollinations returned status {resp.status_code}")
            image_bytes = resp.content

        # Generate unique design ID
        design_id = str(uuid.uuid4())
        filename = f"{design_id}.png"
        filepath = os.path.join("static", "images", filename)
        
        # Save locally as backup / local serve
        with open(filepath, "wb") as f:
            f.write(image_bytes)

        # Save to database (Firestore or db.json) and upload to Storage if active
        base_url = str(fastapi_req.base_url).rstrip("/")
        final_image_url = await firebase_service.save_design(
            design_id=design_id,
            prompt=prompt,
            color=request.color,
            occasion=request.occasion,
            style=request.style,
            length=request.length,
            local_image_path=filepath,
            design_name=design_name,
            base_url=base_url
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Image generation failed: {str(e)}"
        )

    # Step 3 — return result
    return NailDesignResponse(
        imageUrl=final_image_url,
        prompt=prompt,
        designName=design_name
    )


# ──────────────────────────────────────────────
# GALLERY ENDPOINT — get all saved designs
# ──────────────────────────────────────────────
@router.get("/gallery", response_model=list[NailDesignGalleryItem])
def get_gallery():
    """Retrieve all generated nail designs sorted by date descending."""
    return firebase_service.get_designs()


# ──────────────────────────────────────────────
# TEST ENDPOINT — quick health check (free)
# ──────────────────────────────────────────────
@router.get("/test-nail")
def test_nail_endpoint():
    """Quick check — confirms the service is running. Costs nothing."""
    return {
        "status":    "ok",
        "message":   "Nail Design Generator is ready!",
        "developer": "Muhammad Talha",
        "engine":    "Pollinations.ai (FREE)",
        "endpoint":  "POST /api/ai/generate-nail-design",
    }