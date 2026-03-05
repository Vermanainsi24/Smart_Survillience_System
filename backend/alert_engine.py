import os
import time
from datetime import datetime
import cv2
from backend.email_service import send_alert_email

class AlertEngine:

    def __init__(self):
        self.last_alert_time = {
            "FIRE": 0,
            "WEAPON": 0,
            "VIOLENCE": 0
        }

        self.cooldown = 100  # seconds

    def calculate_severity(self, event_type, confidence):

        if event_type == "VIOLENCE":
            return "CRITICAL"

        if confidence > 0.85:
            return "HIGH"

        if confidence > 0.7:
            return "MEDIUM"

        return "LOW"

    def process_alert(self, event_type, confidence, frame, camera_id="CAM_01"):

        current_time = time.time()

        if current_time - self.last_alert_time[event_type] < self.cooldown:
            return None

        self.last_alert_time[event_type] = current_time

        severity = self.calculate_severity(event_type, confidence)

        print("Alert severity:", severity)

        if severity in ["HIGH", "CRITICAL"]:
            print("Sending email alert...")

        os.makedirs("snapshots", exist_ok=True)
        snapshot_path = f"snapshots/{event_type}_{int(current_time)}.jpg"
        cv2.imwrite(snapshot_path, frame)

        alert = {
    "event": f"{event_type} Detected",
    "confidence": round(confidence, 2),
    "severity": severity,
    "camera_id": camera_id,
    "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    "image": snapshot_path
}

        # Escalation rules
        if severity in ["HIGH", "CRITICAL","MEDIUM"]:
            send_alert_email(
                event_type=event_type,
                confidence=round(confidence, 2),
                camera_id=camera_id,
                severity=severity,
                image_path=snapshot_path
            )

        return alert