from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class SpecializationBase(BaseModel):
    name: str = Field(..., max_length=64, example="Software Development")

class SpecializationCreate(SpecializationBase):
    pass

class SpecializationUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=64, example="Data Science")

class SpecializationInDBBase(SpecializationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class Specialization(SpecializationInDBBase):
    pass