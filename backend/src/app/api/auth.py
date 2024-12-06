from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user import UserCreate, Token, UserLogin
from app.db import UserRole
from app.crud.users import get_user_by_email, create_user
from app.core.security import create_access_token, hash_password, verify_access_token, verify_password

router = APIRouter()

def get_current_user(token: dict = Depends(verify_access_token)):
    user_id = token.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return token

def verify_user_is_company(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != UserRole.company:
        raise HTTPException(status_code=403, detail="User is not a company")
    return current_user

def verify_user_is_candidate(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != UserRole.candidate:
        raise HTTPException(status_code=403, detail="User is not a candidate")
    return current_user

@router.post("/register", response_model=Token, status_code=201)
async def register(user: UserCreate):
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.dict()
    user_data['password'] = hash_password(user.password)
    user = await create_user(user_data)
    access_token = create_access_token(data={"user_id": user['id'], "role": user["role"]})
    
    return {"access_token": access_token, "token_type": "bearer", **user}

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await get_user_by_email(form_data.username)
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(form_data.password, user['password']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(data={"user_id": user['id'], "role": user["role"]})
    
    return {"access_token": access_token, "token_type": "bearer", **user}
