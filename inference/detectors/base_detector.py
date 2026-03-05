from ultralytics import YOLO
import cv2


class BaseYOLODetector:
    def __init__(self, model_path, label_name, box_color, conf_threshold=0.6):
        self.model = YOLO(model_path)
        self.label_name = label_name
        self.box_color = box_color
        self.conf_threshold = conf_threshold

    def detect(self, frame):
        detections = []

        results = self.model(frame, verbose=False)

        for r in results:
            for box in r.boxes:
                conf = float(box.conf[0])

                if conf >= self.conf_threshold:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])

                    # Draw bounding box
                    cv2.rectangle(
                        frame,
                        (x1, y1),
                        (x2, y2),
                        self.box_color,
                        3
                    )

                    cv2.putText(
                        frame,
                        f"{self.label_name} {conf:.2f}",
                        (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.8,
                        self.box_color,
                        2
                    )

                    detections.append({
                        "event": f"{self.label_name} Detected",
                        "confidence": round(conf, 2)
                    })

        return frame, detections