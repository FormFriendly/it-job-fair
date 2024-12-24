from app.db import ApplicationStatus
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, root_validator

from app.models.candidate import Candidate

# Базовая модель
class ApplicationBase(BaseModel):
    cover_letter: Optional[str] = Field(None, max_length=2000, example="I am very interested in...")
    resume_path: Optional[str] = Field(None, max_length=255, example="/resumes/johndoe.pdf")
    status: Optional[ApplicationStatus] = Field(ApplicationStatus.pending, example="pending")
    is_favorited: Optional[bool] = Field(False, example=False)
    is_withdrawn: Optional[bool] = Field(False, example=False)

# Модель для создания
class ApplicationCreate(BaseModel):
    vacancy_id: int
    cover_letter: Optional[str] = Field(None, max_length=2000, example="I am very interested in...")

# Модель для обновления
class ApplicationUpdate(BaseModel):
    status: Optional[ApplicationStatus] = Field(None, example="viewed")
    is_favorited: Optional[bool] = Field(None, example=True)

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
    resume_url: Optional[str] = None
    candidate: Optional[Candidate] = None

    @root_validator(pre=True)
    def set_resume_url(cls, values):
        # Преобразуем values в обычный словарь
        values_dict = dict(values)
        resume_path = values_dict.get('resume_path')
        if resume_path:
            values_dict['resume_url'] = f"http://localhost:8002{resume_path}"
        return values_dict