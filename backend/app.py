import sys
import os
import cv2

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

# Allow project imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from inference.main_survillience import run_surveillance, alerts


# =========================
# FASTAPI INIT
# =========================

app = FastAPI(title="SAFE SIGHT Surveillance API")


# =========================
# CORS (React Frontend)
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # change later to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# VIDEO STREAM GENERATOR
# =========================

VIDEO_SOURCE = "demo.mp4"


def generate_frames():

    cap = cv2.VideoCapture(VIDEO_SOURCE)

    if not cap.isOpened():
        print("❌ Unable to open video source")

    while True:

        success, frame = cap.read()

        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue

        # 🔥 RUN AI SURVEILLANCE PIPELINE
        frame = run_surveillance(frame)

        # Encode frame
        ret, buffer = cv2.imencode(".jpg", frame)

        if not ret:
            continue

        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes +
            b"\r\n"
        )


# =========================
# VIDEO STREAM ENDPOINT
# =========================

@app.get("/video-feed")
def video_feed():

    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )


# =========================
# ALERTS API
# =========================

@app.get("/alerts")
def get_alerts():

    return {
        "alerts": alerts[-10:]  # return last 10 alerts
    }


# =========================
# HEALTH CHECK
# =========================

@app.get("/")
def root():

    return {
        "message": "SAFE SIGHT Surveillance API Running",
        "video_stream": "/video-feed",
        "alerts_endpoint": "/alerts"
    }