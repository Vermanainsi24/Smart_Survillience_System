from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from auth import authenticate_user, create_access_token, SECRET_KEY, ALGORITHM
from database import alerts_collection
from datetime import datetime

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# ---------------- LOGIN ----------------

@app.post("/login")
def login(email: str, password: str):
    user = authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(user)
    return {"access_token": token, "role": user["role"]}

# ---------------- TOKEN VALIDATION ----------------

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ---------------- PROTECTED ALERTS ----------------

@app.get("/alerts")
def get_alerts(user=Depends(get_current_user)):
    alerts = list(alerts_collection.find({}, {"_id": 0}))
    return alerts

# ---------------- ADD ALERT (from AI model) ----------------

@app.post("/add-alert")
def add_alert(event: str, confidence: float):
    alert = {
        "camera_id": "CAM_01",
        "event": event,
        "confidence": confidence,
        "timestamp": datetime.now()
    }
    alerts_collection.insert_one(alert)
    return {"message": "Alert added"}