import os
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import JSONResponse
from app.core.config import AVATAR_UPLOAD_DIR
from app.models.candidate import CandidateUpdate, Candidate
from app.crud.candidates import (get_candidate_by_user_id, get, post, put, update_avatar, update_resume)
from app.api.auth import verify_user_is_candidate

router = APIRouter()

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

@router.post("/me/avatar", response_model=dict)
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: dict = Depends(verify_user_is_candidate),
):
    # Проверка формата файла
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Allowed formats: .png, .jpg, .jpeg"
        )

    # Формирование пути сохранения
    filename = f"{current_user['user_id']}_{file.filename}"
    file_path = os.path.join(AVATAR_UPLOAD_DIR, filename)

    # Сохранение файла
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Обновление пути в базе данных
    avatar_url = f"/avatars/{filename}"
    await update_avatar(current_user["user_id"], avatar_url)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Avatar uploaded successfully.", "avatar_url": f"http://localhost:8002{avatar_url}"}
    )

# Загрузка резюме кандидата
@router.post("/me/resume", response_model=dict)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: dict = Depends(verify_user_is_candidate),
):
    # Проверка формата файла
    if not file.filename.lower().endswith((".pdf", ".doc", ".docx")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Allowed formats: .pdf, .doc, .docx"
        )

    # Формирование пути сохранения
    filename = f"{current_user['user_id']}_resume_{file.filename}"
    file_path = os.path.join("uploads/resumes", filename)

    # Сохранение файла
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Обновление пути в базе данных
    resume_url = f"/resumes/{filename}"
    await update_resume(current_user["user_id"], resume_url)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Resume uploaded successfully.", "resume_url": f"http://localhost:8002{resume_url}"}
    )