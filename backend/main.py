from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://yourfrontend.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

products = []
inventory = []
restocking_alerts = []
sales = []

class Product(BaseModel):
    product_id: int
    name: str
    sku: str
    initial_stock_level: int
    current_stock_level: int

class InventoryItem(BaseModel):
    inventory_id: int
    product_id: int
    quantity: int
    transaction_type: str
    transaction_date: str

class RestockingAlert(BaseModel):
    alert_id: int
    product_id: int
    threshold: int

class SalesRecord(BaseModel):
    sales_id: int
    product_id: int
    quantity_sold: int
    sale_date: str

class User(BaseModel):
    username: str
    password: str

@app.get("/api/inventory", response_model=List[Product])
async def get_inventory(current_user: dict = Depends(get_current_user)):
    return products

@app.put("/api/inventory", response_model=Product)
async def update_inventory(item: InventoryItem, current_user: dict = Depends(get_current_user)):
    for product in products:
        if product.product_id == item.product_id:
            if item.transaction_type == "restock":
                product.current_stock_level += item.quantity
            elif item.transaction_type == "sale":
                product.current_stock_level -= item.quantity
            return product
    raise HTTPException(status_code=404, detail="Product not found")

@app.post("/api/inventory", response_model=Product)
async def create_inventory_item(product: Product, current_user: dict = Depends(get_current_user)):
    products.append(product)
    return product

@app.delete("/api/inventory/{product_id}")
async def delete_inventory_item(product_id: int, current_user: dict = Depends(get_current_user)):
    global products
    products = [product for product in products if product.product_id != product_id]
    return {"message": "Product deleted successfully"}

@app.get("/api/alerts/restocking", response_model=List[RestockingAlert])
async def get_restocking_alerts(current_user: dict = Depends(get_current_user)):
    return restocking_alerts

@app.post("/api/alerts/restocking", response_model=RestockingAlert)
async def create_restocking_alert(alert: RestockingAlert, current_user: dict = Depends(get_current_user)):
    restocking_alerts.append(alert)
    return alert

@app.delete("/api/alerts/restocking/{alert_id}")
async def delete_restocking_alert(alert_id: int, current_user: dict = Depends(get_current_user)):
    global restocking_alerts
    restocking_alerts = [alert for alert in restocking_alerts if alert.alert_id != alert_id]
    return {"message": "Restocking alert deleted successfully"}

@app.get("/api/sales/trends", response_model=List[SalesRecord])
async def get_sales_trends(current_user: dict = Depends(get_current_user)):
    return sales

@app.post("/api/sales", response_model=SalesRecord)
async def create_sales_record(record: SalesRecord, current_user: dict = Depends(get_current_user)):
    sales.append(record)
    return record

@app.delete("/api/sales/{sales_id}")
async def delete_sales_record(sales_id: int, current_user: dict = Depends(get_current_user)):
    global sales
    sales = [record for record in sales if record.sales_id != sales_id]
    return {"message": "Sales record deleted successfully"}

@app.post("/token")
async def login(user: User):
    return {"access_token": user.username, "token_type": "bearer"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
