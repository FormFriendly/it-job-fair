from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, Token, UserLogin, UserBase
from app.crud.users import get_user_by_email, create_user
from app.core.security import create_access_token, hash_password, verify_password

router = APIRouter()

@router.post("/register", response_model=Token, status_code=201)
async def register(user: UserCreate):
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.dict()
    user_data['password'] = hash_password(user.password)
    user = await create_user(user_data)
    access_token = create_access_token(data={"user_id": user['id']})
    
    return {"access_token": access_token, "token_type": "bearer", **user}

@router.post("/login", response_model=Token)
async def login(form_data: UserLogin):
    user = await get_user_by_email(form_data.email)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not verify_password(form_data.password, user['password']):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(data={"user_id": user['id']})
    
    return {"access_token": access_token, "token_type": "bearer", **user}
