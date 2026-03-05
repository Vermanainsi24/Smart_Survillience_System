from email_service import send_alert_email

send_alert_email(
    event_type="TEST ALERT",
    confidence=0.95,
    camera_id="CAM_TEST",
    severity="CRITICAL",
    image_path=None
)