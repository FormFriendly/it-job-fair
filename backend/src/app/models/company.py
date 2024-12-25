from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, root_validator

# Базовая модель
class CompanyBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, example="TechCorp")
    description: Optional[str] = Field(None, max_length=1000, example="Leading tech company...")
    website: Optional[str] = Field(None, max_length=255, example="https://techcorp.com")
    location: Optional[str] = Field(None, max_length=255, example="San Francisco")
    contact_phone: Optional[str] = Field(None, example="+123456789")
    contact_email: Optional[EmailStr] = Field(None, max_length=255, example="techcorp@example.com")
    tg_link: Optional[str] = Field(None, max_length=255, example="https://t.me/techcorp")

# Модель для создания
class CompanyCreate(CompanyBase):
    pass

# Модель для обновления
class CompanyUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255, example="TechCorp International")
    description: Optional[str] = Field(None, max_length=1000, example="Updated description...")
    website: Optional[str] = Field(None, max_length=255, example="https://techcorp.io")
    location: Optional[str] = Field(None, max_length=255, example="New York")
    contact_phone: Optional[str] = Field(None, example="+123456789")
    contact_email: Optional[EmailStr] = Field(None, max_length=255, example="techcorp@example.com")
    tg_link: Optional[str] = Field(None, max_length=255, example="https://t.me/techcorp")   
    logo_path: Optional[str] = Field(None, max_length=255, example="/logos/techcorp_new.png")

# Модель из БД
class CompanyInDBBase(CompanyBase):
    id: int
    user_id: int
    logo_path: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

# Модель для ответа клиенту
class Company(CompanyInDBBase):
    logo_url: Optional[str] = None

    @root_validator(pre=True)
    def set_urls(cls, values):
        import os
        FRONTEND_URL = os.getenv("FRONTEND_URL")

        # Преобразуем values в обычный словарь
        values_dict = dict(values)

        # Получаем значения для avatar_path и resume_path
        logo_path = values_dict.get('logo_path')

        # Формируем URL для логотипа
        if logo_path:
            values_dict['logo_url'] = f"{FRONTEND_URL}{logo_path}"

        return values_dict