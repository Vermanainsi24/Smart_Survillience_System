from .base_detector import BaseYOLODetector


class FireDetector(BaseYOLODetector):
    def __init__(self, model_path):
        super().__init__(
            model_path=model_path,
            label_name="FIRE",
            box_color=(0, 0, 255),  # Red
            conf_threshold=0.6
        )