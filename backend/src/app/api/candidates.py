from fastapi import APIRouter, Depends, HTTPException, status
from app.models.candidate import CandidateCreate, CandidateUpdate, Candidate
from app.crud.candidates import (get_candidate_by_user_id, get, post, put)
from app.api.auth import get_current_user, verify_user_is_candidate

router = APIRouter()

# Создание профиля
@router.post("/", response_model=Candidate, status_code=status.HTTP_201_CREATED)
async def create_candidate(
    candidate: CandidateCreate,
    current_user: dict = Depends(verify_user_is_candidate),
):
    existing_candidate = await get_candidate_by_user_id(current_user["user_id"])
    if existing_candidate:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Candidate profile already exists.",
        )
    candidate_data = candidate.dict()
    candidate_data["user_id"] = current_user["user_id"]
    new_candidate = await post(candidate_data)
    return new_candidate


# Обновление профиля
@router.put("/", response_model=Candidate)
async def update_candidate(
    candidate_update: CandidateUpdate,
    current_user: dict = Depends(verify_user_is_candidate),
):
    existing_candidate = await get_candidate_by_user_id(current_user["user_id"])
    if not existing_candidate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidate profile not found.",
        )
    update_data = candidate_update.dict(exclude_unset=True)
    updated_candidate = await put(current_user["user_id"], update_data)
    return updated_candidate


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
