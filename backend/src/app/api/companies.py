from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.models.company import CompanyCreate, CompanyUpdate, Company
from app.crud.companies import post, put, get, get_all, get_company_by_user_id
from app.api.auth import verify_user_is_company

router = APIRouter()

@router.post("/", response_model=Company, status_code=status.HTTP_201_CREATED)
async def create_company(
    company: CompanyCreate, 
    current_user: dict = Depends(verify_user_is_company)
):
    user_id = current_user["user_id"]
    existing_company = await get_company_by_user_id(user_id)
    if existing_company:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="User already has a company profile"
        )
    company_data = company.dict()
    company_data["user_id"] = user_id
    new_company = await post(company_data)
    return new_company

@router.get("/{company_id}", response_model=Company)
async def get_company(company_id: int, current_user: dict = Depends(verify_user_is_company)):
    company = await get(company_id)
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profile not found"
        )
    return company

@router.get("/", response_model=List[Company])
async def get_companies(current_user: dict = Depends(verify_user_is_company)):
    companies = await get_all()
    if not companies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company profiles not found"
        )
    return companies

@router.put("/", response_model=Company)
async def update_company(
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
    update_data = company_update.dict(exclude_unset=True)
    await put(user_id, update_data)
    updated_company = await get_company_by_user_id(user_id)
    return updated_company
