from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

app = FastAPI()

origins = [
    "http://localhost:3000",  # React/Vue/Angular frontend
    "https://yourfrontend.com",  # Deployed frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specific origins
    allow_credentials=True,  # Allow cookies and authentication
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

fake_users_db = {}
fake_inventory_db = {}
fake_alerts_db = {}
fake_sales_db = {}

class User(BaseModel):
    username: str
    password: str
    role: str

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class InventoryItem(BaseModel):
    item_id: str
    name: str
    quantity: int
    threshold: int

class RestockingAlert(BaseModel):
    alert_id: str
    item_id: str
    alert_status: str

class SalesTrend(BaseModel):
    trend_id: str
    item_id: str
    sales_data: dict

class LoginData(BaseModel):
    username: str
    password: str


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    return current_user


@app.post("/api/auth/login", response_model=Token)
async def login_for_access_token(login_data: LoginData):
    user = authenticate_user(fake_users_db, login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/auth/logout")
async def logout():
    return {"message": "User logged out"}


@app.get("/api/inventory", response_model=List[InventoryItem])
async def get_inventory_list():
    return list(fake_inventory_db.values())


@app.get("/api/inventory/{item_id}", response_model=InventoryItem)
async def get_inventory_item(item_id: str):
    item = fake_inventory_db.get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.post("/api/inventory", response_model=InventoryItem)
async def add_inventory_item(item: InventoryItem):
    if item.item_id in fake_inventory_db:
        raise HTTPException(status_code=400, detail="Item already exists")
    fake_inventory_db[item.item_id] = item.dict()
    return item


@app.put("/api/inventory/{item_id}", response_model=InventoryItem)
async def update_inventory_item(item_id: str, item: InventoryItem):
    if item_id not in fake_inventory_db:
        raise HTTPException(status_code=404, detail="Item not found")
    fake_inventory_db[item_id].update(item.dict())
    return fake_inventory_db[item_id]


@app.delete("/api/inventory/{item_id}")
async def delete_inventory_item(item_id: str):
    if item_id not in fake_inventory_db:
        raise HTTPException(status_code=404, detail="Item not found")
    del fake_inventory_db[item_id]
    return {"message": "Item deleted"}


@app.get("/api/alerts", response_model=List[RestockingAlert])
async def get_restocking_alerts():
    return list(fake_alerts_db.values())


@app.put("/api/alerts/{alert_id}", response_model=RestockingAlert)
async def acknowledge_restocking_alert(alert_id: str):
    alert = fake_alerts_db.get(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert["alert_status"] = "acknowledged"
    return alert


@app.get("/api/sales/trends", response_model=List[SalesTrend])
async def get_sales_trends():
    return list(fake_sales_db.values())


fake_users_db["admin"] = {
    "username": "admin",
    "hashed_password": get_password_hash("admin"),
    "role": "admin"
}


fake_inventory_db["item1"] = {
    "item_id": "item1",
    "name": "Product 1",
    "quantity": 100,
    "threshold": 10
}


fake_alerts_db["alert1"] = {
    "alert_id": "alert1",
    "item_id": "item1",
    "alert_status": "pending"
}


fake_sales_db["trend1"] = {
    "trend_id": "trend1",
    "item_id": "item1",
    "sales_data": {"2023-01-01": 10, "2023-01-02": 15}
}
