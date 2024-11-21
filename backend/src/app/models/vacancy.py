from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator

# Базовая модель
class VacancyBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, example="Software Engineer")
    description: Optional[str] = Field(None, max_length=2000, example="Job description...")
    requirements: Optional[str] = Field(None, max_length=2000, example="Experience with Python...")
    salary_min: Optional[float] = Field(None, ge=0, example=50000)
    salary_max: Optional[float] = Field(None, ge=0, example=70000)
    currency: Optional[str] = Field(None, max_length=10, example="USD")
    is_active: Optional[bool] = Field(True, example=True)

    @field_validator('salary_max')
    def check_salary(cls, v, values):
        if 'salary_min' in values and v is not None and v < values['salary_min']:
            raise ValueError('salary_max must be greater than or equal to salary_min')
        return v

# Модель для создания
class VacancyCreate(VacancyBase):
    company_id: int
    event_id: int

# Модель для обновления
class VacancyUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255, example="Senior Software Engineer")
    description: Optional[str] = Field(None, max_length=2000, example="Updated job description...")
    requirements: Optional[str] = Field(None, max_length=2000, example="5+ years of experience...")
    salary_min: Optional[float] = Field(None, ge=0, example=60000)
    salary_max: Optional[float] = Field(None, ge=0, example=80000)
    currency: Optional[str] = Field(None, max_length=10, example="USD")
    is_active: Optional[bool] = Field(None, example=False)

    @field_validator('salary_max')
    def check_salary(cls, v, values):
        if 'salary_min' in values and v is not None and v < values['salary_min']:
            raise ValueError('salary_max must be greater than or equal to salary_min')
        return v

# Модель из БД
class VacancyInDBBase(VacancyBase):
    id: int
    company_id: int
    event_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# Модель для ответа клиенту
class Vacancy(VacancyInDBBase):
    pass