from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.company import CompanyUpdate, Company
from app.crud.companies import put, get, get_all, get_company_by_user_id
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
