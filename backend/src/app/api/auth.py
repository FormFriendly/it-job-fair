from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, Token, UserLogin
from app.db import database, users
from app.crud.auth import hash_password, verify_password
from app.crud.user import create_access_token

router = APIRouter()

@router.post("/register", status_code=201)
async def register(user: UserCreate):
    query = users.select().where(users.c.email == user.email)
    existing_user = await database.fetch_one(query)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data['password'] = hashed_password
    query = users.insert().values(user_data)
    user = await database.fetch_one(query)
    
    return {"message": "User registered successfully", "user": user}

@router.post("/login", response_model=Token)
async def login(form_data: UserLogin):
    query = users.select().where(users.c.email == form_data.email)
    user = await database.fetch_one(query)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(form_data.password, user['password']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(data={"user_id": user['id']})
    return {"access_token": access_token, "token_type": "bearer"}
