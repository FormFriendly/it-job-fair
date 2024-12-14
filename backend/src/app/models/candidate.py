from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, EmailStr, Field

# Базовая модель
class CandidateBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50, example="John")
    surname: str = Field(..., min_length=1, max_length=50, example="Doe")
    patronymic: Optional[str] = Field(..., min_length=1, max_length=50, example="Doevich")
    date_of_birth: Optional[date] = Field(None, example="1990-01-01")
    contact_phone: Optional[str] = Field(None, example="+123456789")
    contact_email: Optional[EmailStr] = Field(None, max_length=255, example="new_email@example.com")
    tg_link: Optional[str] = Field(None, max_length=255, example="https://t.me/johndoe")
    avatar_path: Optional[str] = Field(None, max_length=255, example="/avatars/johndoe.png")

# Модель для создания
class CandidateCreate(CandidateBase):
    pass  # Все поля обязательны, как в CandidateBase

# Модель для обновления
class CandidateUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=50, example="John")
    surname: Optional[str] = Field(None, min_length=1, max_length=50, example="Doe")
    patronymic: Optional[str] = Field(None, min_length=1, max_length=50, example="Doevich")
    date_of_birth: Optional[date] = Field(None, example="1990-01-01")
    contact_phone: Optional[str] = Field(None, example="+123456789")
    contact_email: Optional[EmailStr] = Field(None, max_length=255, example="new_email@example.com")
    tg_link: Optional[str] = Field(None, max_length=255, example="https://t.me/johndoe_new")    
    avatar_path: Optional[str] = Field(None, max_length=255, example="/avatars/johndoe_new.png")

# Модель из БД
class CandidateInDBBase(CandidateBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# Модель для возврата клиенту
class Candidate(CandidateInDBBase):
    pass