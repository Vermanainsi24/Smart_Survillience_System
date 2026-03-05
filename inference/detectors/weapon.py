from .base_detector import BaseYOLODetector


class WeaponDetector(BaseYOLODetector):
    def __init__(self, model_path):
        super().__init__(
            model_path=model_path,
            label_name="WEAPON",
            box_color=(255, 0, 0),  # Blue
            conf_threshold=0.6
        )