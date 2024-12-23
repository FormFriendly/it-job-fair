import os
from typing import List
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, Path, Body, Query, UploadFile
from fastapi.responses import JSONResponse
from app.api.auth import verify_user_is_candidate, verify_user_is_company
from app.core.config import RESUME_UPLOAD_DIR
from app.crud import companies, vacancies
from app.crud.applications import post, get, get_by_vacancy, get_by_candidate, put, delete, update_resume
from app.crud.candidates import get_candidate_by_user_id
from app.models.application import Application, ApplicationCreate, ApplicationUpdate

router = APIRouter()

# Создать отклик
@router.post("/", response_model=Application)
async def create_application(
    application: ApplicationCreate, 
    current_user: dict = Depends(verify_user_is_candidate)
):
    candidate = await get_candidate_by_user_id(current_user["user_id"])
    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate profile not found.",
        )
        
    application_data = application.dict()
    application_data["candidate_id"] = candidate.id
    created_application = await post(application_data)
    if not created_application:
        raise HTTPException(status_code=400, detail="Failed to create application")
    return created_application

# Получить отклик по ID
@router.get("/{id}/", response_model=Application)
async def get_application(id: int = Path(..., gt=0)):
    application = await get(id)
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    return application

# Обновить отклик
@router.patch("/{id}/", response_model=Application)
async def update_application(
    id: int = Path(..., gt=0),
    application_update: ApplicationUpdate = Body(...),
    current_user: dict = Depends(verify_user_is_company)
):
    company = await companies.get_company_by_user_id(current_user["user_id"])
    if not company:
        raise HTTPException(
            status_code=403,
            detail="You are not authorized to update applications for the vacancy."
        )
    
    vacancy = await vacancies.get(id)
    if not vacancy or vacancy.company_id != company.id:
        raise HTTPException(
            status_code=404,
            detail="Vacancy not found or you are not authorized to update it."
        )
    
    updated_application = await put(id, application_update.dict(exclude_unset=True))
    if not updated_application:
        raise HTTPException(status_code=404, detail="Application not found or update failed")
    return updated_application

# Удалить отклик
@router.delete("/{id}/")
async def delete_application(
    id: int = Path(..., gt=0),
    current_user: dict = Depends(verify_user_is_candidate)
):
    candidate = await get_candidate_by_user_id(current_user["user_id"])
    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate profile not found.",
        )
        
    application = await get(id)
    if not application or application.candidate_id != candidate.id:
        raise HTTPException(status_code=404, detail="Access denied or application not found")
        
    await delete(id, candidate.id)
    return {"message": "Application deleted successfully"}

@router.post("/{id}/resume/", response_model=Application)
async def upload_resume(
    id: int = Path(..., gt=0),
    file: UploadFile = File(...),
    current_user: dict = Depends(verify_user_is_candidate)
):
    candidate = await get_candidate_by_user_id(current_user["user_id"])
    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate profile not found.",
        )
        
    # Проверяем, существует ли отклик
    application = await get(id)
    if not application or application.candidate_id != candidate.id:
        raise HTTPException(status_code=403, detail="Access denied or application not found")

    # Генерируем уникальное имя файла
    unique_filename = f"{uuid4()}_{file.filename}"
    file_path = os.path.join(RESUME_UPLOAD_DIR, unique_filename)

    # Сохраняем файл локально
    with open(file_path, "wb") as f:
        f.write(await file.read())
        
    # Обновление пути в базе данных
    resume_url = f"/avatars/{unique_filename}"
    await update_resume(id, resume_url)

    return JSONResponse(
        status_code=200,
        content={"message": "Resume uploaded successfully.", "resume_url": f"http://localhost:8002{resume_url}"}
    )