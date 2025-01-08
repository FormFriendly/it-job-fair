from fastapi import APIRouter, Depends, HTTPException, Query, status, Path
from typing import List, Optional
from app.crud import companies
from app.db import EmploymentType, Experience, SalaryType, WorkMode
from app.models.vacancy import VacancyCreate, Vacancy, VacancyUpdate
from app.models.application import Application
from app.api.auth import verify_user_is_company
from app.crud.vacancies import post, put, get, get_all
from app.crud.applications import get_by_vacancy

router = APIRouter()

# Получить все вакансии
@router.get("/", response_model=List[Vacancy])
async def get_all_vacancies(
    text: Optional[str] = Query(None, description="Search by title or description"),
    location: Optional[str] = Query(None, description="Location"),
    salary: Optional[float] = Query(None, description="Salary"),
    salary_type: Optional[SalaryType] = Query(None, description="Salary type"),
    work_mode: Optional[WorkMode] = Query(None, description="Work mode"),
    experience: Optional[Experience] = Query(None, description="Work experience"),
    employment_type: Optional[EmploymentType] = Query(None, description="Employment type "),
    event_id: Optional[int] = Query(None, description="Event ID"),
    specialization_ids: Optional[List[int]] = Query(None, description="List of specialization IDs"),
    skill_ids: Optional[List[int]] = Query(None, description="List of skill IDs"),
):
    return await get_all(
        text=text,
        location=location,
        salary=salary,
        salary_type=salary_type,
        work_mode=work_mode,
        experience=experience,
        employment_type=employment_type,
        event_id=event_id,
        specialization_ids=specialization_ids,
        skill_ids=skill_ids,
    )

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

# Получить отклики по вакансии
@router.get("/{vacancy_id}/applications", response_model=List[Application])
async def get_applications_by_vacancy(
    vacancy_id: int = Path(..., gt=0),
    current_user: dict = Depends(verify_user_is_company)
):
    company = await companies.get_company_by_user_id(current_user["user_id"])
    if not company:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to view applications for the vacancy."
        )
    company_id = company.id
    
    vacancy = await get(vacancy_id)
    if not vacancy or vacancy.company_id != company_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vacancy not found or you are not authorized to view it's applications."
        )
        
    applications = await get_by_vacancy(vacancy_id)
    if not applications:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Applications not found"
        )
    return applications