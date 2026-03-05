import smtplib
import os
from email.message import EmailMessage


# ==============================
# EMAIL CONFIGURATION
# ==============================

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

SENDER_EMAIL ="nainsiverma2528@gmail.com"
SENDER_PASSWORD="ajjynzbndfxrrdaj"
ADMIN_EMAIL="nainasingh2528@gmail.com"


# ==============================
# SEND ALERT EMAIL FUNCTION
# ==============================

def send_alert_email(event_type, confidence, camera_id, severity, image_path=None):

    try:
        print("📧 Preparing email alert...")

        msg = EmailMessage()

        msg["Subject"] = f"🚨 SAFE SIGHT ALERT: {event_type}"
        msg["From"] = SENDER_EMAIL
        msg["To"] = ADMIN_EMAIL

        body = f"""
SAFE SIGHT SECURITY ALERT

Threat Detected : {event_type}
Confidence      : {confidence}
Severity        : {severity}
Camera ID       : {camera_id}

Immediate action may be required.
"""

        msg.set_content(body)

        # ==============================
        # ATTACH SNAPSHOT IF AVAILABLE
        # ==============================

        if image_path and os.path.exists(image_path):

            with open(image_path, "rb") as img:
                img_data = img.read()

            msg.add_attachment(
                img_data,
                maintype="image",
                subtype="jpeg",
                filename=os.path.basename(image_path)
            )

            print("📷 Snapshot attached:", image_path)

        else:
            print("⚠ No snapshot found to attach.")

        # ==============================
        # CONNECT TO SMTP SERVER
        # ==============================

        print("🔌 Connecting to Gmail SMTP...")

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()

        server.login(SENDER_EMAIL, SENDER_PASSWORD)

        server.send_message(msg)

        server.quit()

        print("✅ Email alert sent successfully!")

    except Exception as e:

        print("❌ Email sending failed:", e)