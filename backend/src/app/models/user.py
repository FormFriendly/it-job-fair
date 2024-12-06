from app.db import UserRole
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

# Базовая модель
class UserBase(BaseModel):
    email: EmailStr = Field(..., max_length=255, example="user@example.com")
    role: UserRole = Field(..., example="candidate")

# Модель для создания пользователя
class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128, example="strongpassword")

# Модель для авторизации
class UserLogin(BaseModel):
    email: EmailStr = Field(None, max_length=255, example="new_email@example.com")
    password: str = Field(None, min_length=8, max_length=128, example="newpassword")

# Модель для обновления пользователя
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = Field(None, max_length=255, example="new_email@example.com")
    password: Optional[str] = Field(None, min_length=8, max_length=128, example="newpassword")

# Базовая модель в БД
class UserInDBBase(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# Модель для возврата клиенту через API
class User(UserInDBBase):
    pass

# Модель для использования внутри приложения
class UserInDB(UserInDBBase):
    password: str

# Модель для токена
class Token(UserBase):
    access_token: str
    token_type: str