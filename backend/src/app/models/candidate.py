from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, root_validator

# Базовая модель
class CandidateBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=50, example="John")
    surname: str = Field(..., min_length=1, max_length=50, example="Doe")
    patronymic: Optional[str] = Field(..., min_length=1, max_length=50, example="Doevich")
    date_of_birth: Optional[date] = Field(None, example="1990-01-01")
    contact_phone: Optional[str] = Field(None, example="+123456789")
    contact_email: Optional[EmailStr] = Field(None, max_length=255, example="new_email@example.com")
    tg_link: Optional[str] = Field(None, max_length=255, example="https://t.me/johndoe")

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

# Модель из БД
class CandidateInDBBase(CandidateBase):
    id: int
    user_id: int
    avatar_path: Optional[str] = None
    resume_path: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# Модель для возврата клиенту
class Candidate(CandidateInDBBase):
    avatar_url: Optional[str] = None
    resume_url: Optional[str] = None

    @root_validator(pre=True)
    def set_urls(cls, values):
        # Преобразуем values в обычный словарь
        values_dict = dict(values)

        # Получаем значения для avatar_path и resume_path
        avatar_path = values_dict.get('avatar_path')
        resume_path = values_dict.get('resume_path')

        # Формируем URL для аватара
        if avatar_path:
            values_dict['avatar_url'] = f"http://localhost:8002{avatar_path}"

        # Формируем URL для резюме
        if resume_path:
            values_dict['resume_url'] = f"http://localhost:8002{resume_path}"

        return values_dict
