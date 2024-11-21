from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

# Базовая модель
class CompanyBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, example="TechCorp")
    description: Optional[str] = Field(None, max_length=1000, example="Leading tech company...")
    website: Optional[str] = Field(None, max_length=255, example="https://techcorp.com")
    location: Optional[str] = Field(None, max_length=255, example="San Francisco")
    logo_path: Optional[str] = Field(None, max_length=255, example="/logos/techcorp.png")

# Модель для создания
class CompanyCreate(CompanyBase):
    pass

# Модель для обновления
class CompanyUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255, example="TechCorp International")
    description: Optional[str] = Field(None, max_length=1000, example="Updated description...")
    website: Optional[str] = Field(None, max_length=255, example="https://techcorp.io")
    location: Optional[str] = Field(None, max_length=255, example="New York")
    logo_path: Optional[str] = Field(None, max_length=255, example="/logos/techcorp_new.png")

# Модель из БД
class CompanyInDBBase(CompanyBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# Модель для ответа клиенту
class Company(CompanyInDBBase):
    pass