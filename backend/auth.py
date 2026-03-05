from jose import JWTError,jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pre-generated password hash
fake_users_db = {
    "admin@security.com": {
        "password": "$2b$12$u0Jy.WYkpMvAPk6ZHDmaH.ny1cSoO7tPF8KkMPX5mhzVQsvFyUOZq",
        "role": "ADMIN"
    }
}


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


def authenticate_user(email, password):

    user = fake_users_db.get(email)

    if not user:
        return None

    if not verify_password(password, user["password"]):
        return None

    return {
        "email": email,
        "role": user["role"]
    }


def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt