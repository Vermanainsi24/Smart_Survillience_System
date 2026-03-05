last_alert_time = {
    "violence": 0,
    "weapon": 0,
    "fire": 0
}

ALERT_COOLDOWN = 30  # seconds

def should_trigger_alert(alert_type, current_time):
    if current_time - last_alert_time[alert_type] > ALERT_COOLDOWN:
        last_alert_time[alert_type] = current_time
        return True
    return False


def calculate_severity(event_type, confidence):

    if event_type == "Violence Detected":
        return "CRITICAL"

    if confidence > 0.85:
        return "HIGH"

    if confidence > 0.7:
        return "MEDIUM"

    return "LOW"