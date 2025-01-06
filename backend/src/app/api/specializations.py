from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.specialization import Specialization
from app.crud.specializations import get, get_all

router = APIRouter()

# Получить список специализаций
@router.get("/", response_model=List[Specialization])
async def get_specializations_list():
    specializations = await get_all()
    if not specializations:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specializations not found"
        )
    return specializations

# Получить специализацию по id
@router.get("/{specialization_id}", response_model=Specialization)
async def get_specialization(specialization_id: int):
    specialization = await get(specialization_id)
    if not specialization:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Specialization not found"
        )
    return specialization