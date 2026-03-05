import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import cv2
from detectors.fire import FireDetector
from detectors.weapon import WeaponDetector
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
VIDEO_SOURCE = os.path.join(BASE_DIR, "demo.mp4")


# =========================
# MAIN SURVEILLANCE LOOP
# =========================

def run_surveillance():

    cap = cv2.VideoCapture(VIDEO_SOURCE)

    if not cap.isOpened():
        print("❌ Unable to open video source")
        return

    print("🔥 SAFE SIGHT Surveillance Started...")

    while True:
        ret, frame = cap.read()
        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            continue
        # Resize video frame
        frame = cv2.resize(frame, (960, 540))

        # =========================
        # DETECTION PHASE
        # =========================

        frame, fire_alerts = fire_detector.detect(frame)
        frame, weapon_alerts = weapon_detector.detect(frame)
        # frame, fight_alerts = fight_detector.detect(frame)

        all_alerts = fire_alerts + weapon_alerts

        # =========================
        # ALERT PROCESSING
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
                print("🚨 ALERT:", processed)

        # =========================
        # DISPLAY FRAME
        # =========================
        cv2.namedWindow("SAFE SIGHT - Multi Threat Detection", cv2.WINDOW_NORMAL)
        cv2.resizeWindow("SAFE SIGHT - Multi Threat Detection", 960, 540)
        cv2.imshow("SAFE SIGHT - Multi Threat Detection", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


# =========================
# ENTRY POINT
# =========================

if __name__ == "__main__":
    run_surveillance()