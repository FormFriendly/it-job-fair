import os
from typing import List
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import JSONResponse
from app.models.company import CompanyUpdate, Company
from app.crud.companies import put, get, get_all, get_company_by_user_id, update_company_logo
from app.api.auth import verify_user_is_company

router = APIRouter()

# Получить список компаний
@router.get("/", response_model=List[Company])
async def get_companies_list():
    companies = await get_all()
    if not companies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profiles not found"
        )
    return companies

# Получить профиль своей компании
@router.get("/me", response_model=Company)
async def get_my_company_profile(current_user: dict = Depends(verify_user_is_company)):
    company = await get_company_by_user_id(current_user["user_id"])
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found.",
        )
    return company

# Получить компанию по id
@router.get("/{company_id}", response_model=Company)
async def get_company_profile(company_id: int):
    company = await get(company_id)
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found"
        )
    return company

# Обновить профиль своей компании
@router.put("/me", response_model=Company)
async def update_my_company_profile(
    company_update: CompanyUpdate, 
    current_user: dict = Depends(verify_user_is_company)
):
    user_id = current_user["user_id"]
    existing_company = await get_company_by_user_id(user_id)
    if not existing_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Company profile not found"
        )
        
    await put(user_id, company_update.dict(exclude_unset=True))

    return await get_company_by_user_id(user_id)

@router.post("/me/logo", response_model=dict)
async def upload_company_logo(
    file: UploadFile = File(...),
    current_user: dict = Depends(verify_user_is_company),
):
    # Проверка формата файла
    if not file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file format. Allowed formats: .png, .jpg, .jpeg"
        )

    # Формирование пути сохранения
    filename = f"{current_user['user_id']}_{file.filename}"
    file_path = os.path.join("uploads/avatars/companies", filename)

    # Сохранение файла
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Обновление пути в базе данных
    logo_url = f"/avatars/companies/{filename}"
    await update_company_logo(current_user["user_id"], logo_url)

    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"message": "Logo uploaded successfully.", "logo_url": f"http://localhost:8002{logo_url}"}
    )