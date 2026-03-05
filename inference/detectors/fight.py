from .base_detector import BaseYOLODetector


class FightDetector(BaseYOLODetector):
    def __init__(self, model_path):
        super().__init__(
            model_path=model_path,
            label_name="VIOLENCE",
            box_color=(0, 255, 255),  # Yellow
            conf_threshold=0.7
        )