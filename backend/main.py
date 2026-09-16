"""
Convert an image to grayscale.
"""

from pathlib import Path

import cv2
import numpy as np


from fastapi import FastAPI, UploadFile, File, Form, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from services.upload_service import save_uploaded_file
from services.image_service import get_image_info
from services.processing_service import (
    apply_binary_threshold,
    apply_gaussian_blur,
    convert_to_grayscale,
    invert_image, 
) 



app = FastAPI(title="Laser Vector Studio API")

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Laser Vector Studio API is running"
    }


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()

    result = save_uploaded_file(
        file_name=file.filename,
        content=content,
        upload_dir=UPLOAD_DIR
    )

    result["content_type"] = file.content_type

    image_info = get_image_info(UPLOAD_DIR / file.filename)

    
    result.update(image_info)

    return result

@app.post("/invert")
async def invert(file: UploadFile = File(...)):
    contents = await file.read()
    image_array = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    inverted_image = invert_image(image)
    success, buffer = cv2.imencode(".jpg", inverted_image)
    
    return Response(
    content=buffer.tobytes(),
    media_type="image/jpeg",
)

@app.post("/grayscale")
async def grayscale(file: UploadFile = File(...)):
    contents = await file.read()
    image_array = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    grayscale_image = convert_to_grayscale(image)
    success, buffer = cv2.imencode(".jpg", grayscale_image)

    
    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg",
    )

@app.post("/threshold")
async def threshold_image(
    file: UploadFile = File(...),
    threshold: int = Form(127),
):

    contents = await file.read()
    image_array = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    threshold_image = apply_binary_threshold(
        image,
        threshold
    )
    
    success, buffer = cv2.imencode(".jpg", threshold_image)

    
    return Response(
        content=buffer.tobytes(),
        media_type="image/jpeg",
    )

@app.post("/gaussian-blur")
async def gaussian_blur(
    file: UploadFile = File(...),
    blur: int = Form(5),
):

   
    contents = await file.read()
    image_array = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    blurred_image = apply_gaussian_blur(
    image,
    blur,
)
    _, encoded_image = cv2.imencode(
        ".jpg",
        blurred_image,
    )


    return Response(
        content=encoded_image.tobytes(),
        media_type="image/jpeg",
    )   