from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class SkillBase(BaseModel):
    skill: str = Field(..., max_length=64, example="Python")

class SkillCreate(SkillBase):
    pass

class SkillUpdate(BaseModel):
    skill: Optional[str] = Field(None, max_length=64, example="JavaScript")

class SkillInDBBase(SkillBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class Skill(SkillBase):
    id: int
