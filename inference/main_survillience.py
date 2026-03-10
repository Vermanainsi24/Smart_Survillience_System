import os
import cv2

from inference.detectors.fire import FireDetector
from inference.detectors.weapon import WeaponDetector
# from inference.detectors.fight import FightDetector

from backend.alert_engine import AlertEngine


# =========================
# INITIALIZATION
# =========================

fire_detector = FireDetector("models/fire_detector/best.pt")
weapon_detector = WeaponDetector("models/weapon_detector/best.pt")
# fight_detector = FightDetector("models/fight_detector/best.pt")

alert_engine = AlertEngine()

alerts = []

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VIDEO_SOURCE = os.path.join(BASE_DIR, "test.mp4")


# =========================
# SURVEILLANCE PROCESSOR
# =========================

def run_surveillance(frame):

    # Resize frame
    frame = cv2.resize(frame, (960, 540))

    # =========================
    # DETECTION
    # =========================

    frame, fire_alerts = fire_detector.detect(frame)
    frame, weapon_alerts = weapon_detector.detect(frame)
    # frame, fight_alerts = fight_detector.detect(frame)

    all_alerts = fire_alerts + weapon_alerts

    # =========================
    # ALERT ENGINE
    # =========================

    for alert in all_alerts:

        processed = alert_engine.process_alert(
            event_type=alert["event"].replace(" Detected", ""),
            confidence=alert["confidence"],
            frame=frame,
            camera_id="CAM_01"
        )

        if processed:
            alerts.append(processed)

            # keep only latest alerts
            if len(alerts) > 50:
                alerts.pop(0)

            print("🚨 ALERT:", processed)

    return frame