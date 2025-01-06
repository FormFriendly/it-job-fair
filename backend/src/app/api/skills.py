from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.skill import Skill
from app.crud.skills import get, get_all

router = APIRouter()

# Получить список навыков
@router.get("/", response_model=List[Skill])
async def get_skills_list():
    skills = await get_all()
    if not skills:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skills not found"
        )
    return skills

# Получить навык по id
@router.get("/{skill_id}", response_model=Skill)
async def get_skill(skill_id: int):
    skill = await get(skill_id)
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    return skill