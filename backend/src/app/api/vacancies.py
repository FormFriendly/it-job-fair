from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.crud import companies
from app.models.vacancy import VacancyCreate, Vacancy, VacancyUpdate
from app.api.auth import verify_user_is_company
from app.crud.vacancies import post, put, get, get_all

router = APIRouter()

# Получить все вакансии
@router.get("/", response_model=List[Vacancy])
async def get_all_vacancies():
    vacancies = await get_all()
    if not vacancies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vacancies not found"
        )
    return vacancies

# Получить вакансию по ID
@router.get("/{vacancy_id}", response_model=Vacancy)
async def get_vacancy_route(vacancy_id: int):
    vacancy = await get(vacancy_id)
    if not vacancy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vacancy not found."
        )
    return vacancy

# Создать вакансию
@router.post("/", response_model=Vacancy)
async def create_vacancy(
    vacancy_data: VacancyCreate,
    current_user: dict = Depends(verify_user_is_company)
):
    company = await companies.get_company_by_user_id(current_user["user_id"])
    if not company:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a vacancy."
        )
    company_id = company.id
    vacancy_dict = vacancy_data.dict()
    vacancy_dict["company_id"] = company_id
    return await post(vacancy_dict)

# Обновить вакансию
@router.put("/{vacancy_id}", response_model=Vacancy)
async def update_vacancy(
    vacancy_id: int,
    vacancy_data: VacancyUpdate,
    current_user: dict = Depends(verify_user_is_company)
):
    company = await companies.get_company_by_user_id(current_user["user_id"])
    if not company:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to create a vacancy."
        )
    company_id = company.id
    vacancy = await get(vacancy_id)
    if not vacancy or vacancy.company_id != company_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vacancy not found or you are not authorized to update it."
        )
    return await put(vacancy_id, vacancy_data)
