from fastapi import APIRouter, Depends, HTTPException, status
from app.models.candidate import CandidateUpdate, Candidate
from app.crud.candidates import (get_candidate_by_user_id, get, post, put)
from app.api.auth import verify_user_is_candidate

router = APIRouter()

# Получение чужого профиля
@router.get("/{candidate_id}", response_model=Candidate)
async def get_candidate_profile(candidate_id: int):
    candidate = await get(candidate_id)
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found.",
        )
    return candidate

# Получение своего профиля
@router.get("/me", response_model=Candidate)
async def get_my_candidate_profile(current_user: dict = Depends(verify_user_is_candidate)):
    candidate = await get_candidate_by_user_id(current_user["user_id"])
    if not candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found.",
        )
    return candidate

# Обновление своего профиля
@router.put("/me", response_model=Candidate)
async def update_my_candidate_profile(
    candidate_update: CandidateUpdate,
    current_user: dict = Depends(verify_user_is_candidate),
):
    existing_candidate = await get_candidate_by_user_id(current_user["user_id"])
    if not existing_candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found.",
        )

    return await put(current_user["user_id"], candidate_update.dict(exclude_unset=True))
