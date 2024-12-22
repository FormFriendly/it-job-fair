from app.db import ApplicationStatus
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

# Базовая модель
class ApplicationBase(BaseModel):
    cover_letter: Optional[str] = Field(None, max_length=2000, example="I am very interested in...")
    resume_path: Optional[str] = Field(None, max_length=255, example="/resumes/johndoe.pdf")
    status: Optional[ApplicationStatus] = Field(ApplicationStatus.pending, example="pending")
    is_favorited: Optional[bool] = Field(False, example=False)
    is_withdrawn: Optional[bool] = Field(False, example=False)

# Модель для создания
class ApplicationCreate(ApplicationBase):
    vacancy_id: int
    candidate_id: int

# Модель для обновления
class ApplicationUpdate(BaseModel):
    cover_letter: Optional[str] = Field(None, max_length=2000, example="Updated cover letter...")
    resume_path: Optional[str] = Field(None, max_length=255, example="/resumes/johndoe_updated.pdf")
    status: Optional[ApplicationStatus] = Field(None, example="viewed")
    is_favorited: Optional[bool] = Field(None, example=True)
    is_withdrawn: Optional[bool] = Field(None, example=True)

# Модель из БД
class ApplicationInDBBase(ApplicationBase):
    id: int
    vacancy_id: int
    candidate_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True

# Модель для ответа клиенту
class Application(ApplicationInDBBase):
    pass