from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class VacancySkillBase(BaseModel):
    vacancy_id: int = Field(..., ge=1)
    skill_id: int = Field(..., ge=1)

class VacancySkillCreate(VacancySkillBase):
    pass

class VacancySkillInDBBase(VacancySkillBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class VacancySkill(VacancySkillInDBBase):
    pass
