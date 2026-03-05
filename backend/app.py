import sys
import os
import cv2

from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend.auth import authenticate_user, create_access_token

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from inference.main_survillience import run_surveillance, alerts


# CREATE APP ONLY ONCE
app = FastAPI(title="SAFE SIGHT Surveillance API")


# SNAPSHOT STATIC FOLDER
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SNAPSHOT_DIR = os.path.join(BASE_DIR, "snapshots")

print("Snapshots folder:", SNAPSHOT_DIR)

app.mount("/snapshots", StaticFiles(directory=SNAPSHOT_DIR), name="snapshots")


# =========================
# LOGIN MODEL
# =========================

class LoginRequest(BaseModel):
    email: str
    password: str


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# VIDEO STREAM
# =========================

VIDEO_SOURCE = "demo.mp4"


def generate_frames():

    cap = cv2.VideoCapture(VIDEO_SOURCE)

    if not cap.isOpened():
        print("Unable to open video source")

    while True:

        success, frame = cap.read()

        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        frame = run_surveillance(frame)

        ret, buffer = cv2.imencode(".jpg", frame)

        if not ret:
            continue

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + buffer.tobytes()
            + b"\r\n"
        )


@app.get("/video-feed")
def video_feed():

    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )


# =========================
# ALERTS
# =========================

@app.get("/alerts")
def get_alerts():

    return {
        "alerts": alerts[-10:]
    }


@app.get("/alerts/history")
def alert_history(type: str = None):

    if type:
        return [
            a for a in alerts
            if type.lower() in a["event"].lower()
        ]

    return alerts


# =========================
# LOGIN
# =========================

@app.post("/login")
def login(user: LoginRequest):

    authenticated = authenticate_user(user.email, user.password)

    if not authenticated:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({
        "sub": authenticated["email"],
        "role": authenticated["role"]
    })

    return {
        "access_token": token,
        "role": authenticated["role"]
    }


# =========================
# ROOT
# =========================

@app.get("/")
def root():

    return {
        "message": "SAFE SIGHT Surveillance API Running",
        "video_stream": "/video-feed",
        "alerts_endpoint": "/alerts"
    }