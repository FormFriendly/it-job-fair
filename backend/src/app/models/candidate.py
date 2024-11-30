from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, Field

# Базовая модель
class CandidateBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50, example="John")
    surname: str = Field(..., min_length=1, max_length=50, example="Doe")
    patronymic: str = Field(..., min_length=1, max_length=50, example="Doevich")
    date_of_birth: Optional[date] = Field(None, example="1990-01-01")
    phone: Optional[str] = Field(None, regex=r'^\+?\d{7,15}$', example="+123456789")
    avatar_path: Optional[str] = Field(None, max_length=255, example="/avatars/johndoe.png")
    tg_link: Optional[str] = Field(None, max_length=255, example="https://t.me/johndoe")

# Модель для создания
class CandidateCreate(CandidateBase):
    pass  # Все поля обязательны, как в CandidateBase

# Модель для обновления
class CandidateUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=50, example="John")
    surname: Optional[str] = Field(None, min_length=1, max_length=50, example="Doe")
    patronymic: str = Field(..., min_length=1, max_length=50, example="Doevich")
    date_of_birth: Optional[date] = Field(None, example="1990-01-01")
    phone: Optional[str] = Field(None, regex=r'^\+?\d{7,15}$', example="+123456789")
    avatar_path: Optional[str] = Field(None, max_length=255, example="/avatars/johndoe_new.png")
    tg_link: Optional[str] = Field(None, max_length=255, example="https://t.me/johndoe_new")    

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