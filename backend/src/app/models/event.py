from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, field_validator

# Базовая модель
class EventBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255, example="Job Fair 2023")
    description: Optional[str] = Field(None, max_length=2000, example="Annual job fair...")
    img_path: Optional[str] = Field(None, max_length=255, example="/images/event.png")
    starts_at: datetime = Field(..., example="2023-05-01T09:00:00Z")
    ends_at: datetime = Field(..., example="2023-05-01T17:00:00Z")
    
    @field_validator("ends_at")
    def check_ends_after_starts(cls, v, values):
        if 'starts_at' in values and v <= values['starts_at']:
            raise ValueError('ends_at must be after starts_at')
        return v

# Модель для создания
class EventCreate(EventBase):
    pass

# Модель для обновления
class EventUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255, example="Updated Event Name")
    description: Optional[str] = Field(None, max_length=2000, example="Updated description...")
    img_path: Optional[str] = Field(None, max_length=255, example="/images/event_new.png")
    starts_at: Optional[datetime] = Field(None, example="2023-05-02T09:00:00Z")
    ends_at: Optional[datetime] = Field(None, example="2023-05-02T17:00:00Z")

    @field_validator("ends_at")
    def check_ends_after_starts(cls, v, values):
        if 'starts_at' in values and v <= values['starts_at']:
            raise ValueError('ends_at must be after starts_at')
        return v

# Модель из БД
class EventInDBBase(EventBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

# Модель для ответа клиенту
class Event(EventInDBBase):
    pass