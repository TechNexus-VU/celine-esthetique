# main.py
# Developer : Muhammad Talha
# Run with  : uvicorn main:app --reload
#
# STANDALONE MODE  → run this file alone to test your module
# TEAM MODE        → AI Lead (Ameema) imports your router into the shared main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from routers.nail_design import router as nail_router

# Create static directories
os.makedirs("static/images", exist_ok=True)

app = FastAPI(
    title="Nail Design Generator",
    description="DALL-E 3 powered nail art — by Muhammad Talha",
    version="1.0.0",
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register your router
app.include_router(nail_router, prefix="/api/ai", tags=["Nail Design"])

@app.get("/")
def root():
    return FileResponse("static/index.html")