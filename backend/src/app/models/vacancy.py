from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator
from app.db import SalaryType, WorkMode, EmploymentType, Experience, VacancyStatus
from app.models.skill import Skill
from app.models.specialization import Specialization

# Базовая модель
class VacancyBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, example="Software Engineer")
    description: Optional[str] = Field(None, max_length=2000, example="Job description...")
    salary: Optional[float] = Field(None, ge=0, example=70000)
    salary_type: SalaryType = Field(..., example="from")
    currency: Optional[str] = Field(None, max_length=10, example="USD")
    location: Optional[str] = Field(None, max_length=255, example="New York")
    work_mode: WorkMode = Field(..., example="remote")
    employment_type: EmploymentType = Field(..., example="full-time")
    experience: Experience = Field(..., example="1-2 years")
    status: VacancyStatus = Field(VacancyStatus.active, example="active")

# Модель для создания
class VacancyCreate(VacancyBase):
    event_id: int
    specialization_id: int = Field(..., ge=1)
    skills_ids: Optional[List[int]] = Field(None, example=[1, 2, 3])

# Модель для обновления
class VacancyUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255, example="Senior Software Engineer")
    description: Optional[str] = Field(None, max_length=2000, example="Updated job description...")
    salary: Optional[float] = Field(None, ge=0, example=70000)
    salary_type: Optional[SalaryType] = Field(None, example="to")
    currency: Optional[str] = Field(None, max_length=10, example="USD")
    location: Optional[str] = Field(None, max_length=255, example="San Francisco")
    work_mode: Optional[WorkMode] = Field(None, example="hybrid")
    employment_type: Optional[EmploymentType] = Field(None, example="part-time")
    experience: Optional[Experience] = Field(None, example="3-4 years")
    status: Optional[VacancyStatus] = Field(None, example="closed")
    specialization_id: Optional[int] = Field(None, ge=1)
    skills_ids: Optional[List[int]] = Field(None, example=[4, 5, 6])

# Модель из БД
class VacancyInDBBase(VacancyBase):
    id: int
    company_id: int
    event_id: int
    specialization_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# Модель для ответа клиенту
class Vacancy(VacancyInDBBase):
    skills: Optional[List[Skill]] = None
    specialization: Optional[Specialization] = None