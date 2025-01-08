from typing import List
from sqlalchemy import select, insert, update, delete
from app.db import vacancies, vacancies_skills, specializations, skills, database
from app.crud.companies import get as get_company
from app.models.vacancy import Vacancy, VacancyUpdate

# Создать вакансию
async def post(vacancy_data: dict):
    skill_ids = vacancy_data.pop("skills_ids", [])
     # Создать запись о вакансии
    query = insert(vacancies).values(**vacancy_data)
    vacancy_id = await database.execute(query)
    
    # Если есть навыки, привязать их через VacanciesSkills
    if skill_ids:
        skills_data = [{"vacancy_id": vacancy_id, "skill_id": skill_id} for skill_id in skill_ids]
        skills_query = insert(vacancies_skills).values(skills_data)  # Массовая вставка
        await database.execute(skills_query)  # Используем стандартный execute

    return await get(vacancy_id)

# Обновить вакансию
async def put(vacancy_id: int, vacancy_data: VacancyUpdate):
    # Обновление основных данных вакансии
    vacancy_update_data = vacancy_data.dict(exclude_unset=True, exclude={"skills_ids"})
    if vacancy_update_data:
        query = (
            update(vacancies)
            .where(vacancies.c.id == vacancy_id)
            .values(**vacancy_update_data)
        )
        await database.execute(query)

    # Обновление навыков (skills_ids)
    if "skills_ids" in vacancy_data.model_fields_set:
        skills_ids: List[int] = vacancy_data.skills_ids or []

        # Удаляем текущие навыки
        delete_query = delete(vacancies_skills).where(vacancies_skills.c.vacancy_id == vacancy_id)
        await database.execute(delete_query)

        # Добавляем новые навыки, если они указаны
        if skills_ids:
            insert_query = insert(vacancies_skills)
            values = [{"vacancy_id": vacancy_id, "skill_id": skill_id} for skill_id in skills_ids]
            await database.execute_many(insert_query, values)

    # Возвращаем обновлённую вакансию
    return await get(vacancy_id)

# Получить вакансию по ID
async def get(vacancy_id: int):
    # Основной запрос для получения вакансии
    vacancy_query = (
        select(
            vacancies,
            specializations.c.name.label("specialization_name"),
        )
        .where(vacancies.c.id == vacancy_id)
        .join(specializations, vacancies.c.specialization_id == specializations.c.id)
    )
    vacancy = await database.fetch_one(vacancy_query)
    if not vacancy:
        return None

    # Получение списка навыков
    skills_query = (
        select(skills.c.id, skills.c.skill)
        .join(vacancies_skills, skills.c.id == vacancies_skills.c.skill_id)
        .where(vacancies_skills.c.vacancy_id == vacancy_id)
    )
    skill_records = await database.fetch_all(skills_query)

    # Преобразование результатов
    skills_result = [{"id": skill["id"], "skill": skill["skill"]} for skill in skill_records]
    vacancy_data = dict(vacancy)
    vacancy_data["skills"] = skills_result
    vacancy_data["specialization"] = {"id": vacancy["specialization_id"], "name": vacancy["specialization_name"]}
    vacancy_data["company"] = await get_company(vacancy.company_id)

    return Vacancy(**vacancy_data)

# Получить все вакансии
async def get_all():
    # Основной запрос для вакансий
    vacancies_query = (
        select(
            vacancies,
            specializations.c.name.label("specialization_name"),
        )
        .join(specializations, vacancies.c.specialization_id == specializations.c.id)
    )
    vacancies_data = await database.fetch_all(vacancies_query)

    # Получить все навыки, связанные с вакансиями
    skills_query = (
        select(
            vacancies_skills.c.vacancy_id,
            skills.c.id.label("skill_id"),
            skills.c.skill.label("skill_skill"),
        )
        .join(skills, vacancies_skills.c.skill_id == skills.c.id)
    )
    skills_data = await database.fetch_all(skills_query)

    # Организовать навыки по вакансиям
    skills_mapping = {}
    for skill in skills_data:
        vacancy_id = skill["vacancy_id"]
        if vacancy_id not in skills_mapping:
            skills_mapping[vacancy_id] = []
        skills_mapping[vacancy_id].append({"id": skill["skill_id"], "skill": skill["skill_skill"]})

    # Формирование финального результата
    vacancies_result = []
    for vacancy in vacancies_data:
        vacancy_id = vacancy["id"]
        vacancies_result.append(
            Vacancy(
                **vacancy,
                skills=skills_mapping.get(vacancy_id, []),
                specialization={
                    "id": vacancy["specialization_id"],
                    "name": vacancy["specialization_name"],
                },
                company = await get_company(vacancy.company_id)
            )
        )

    return vacancies_result

# Получить вакансии по event_id
async def get_by_event_id(event_id: int):
    # Основной запрос для вакансий с фильтром по event_id
    vacancies_query = (
        select(
            vacancies,
            specializations.c.name.label("specialization_name"),
        )
        .where(vacancies.c.event_id == event_id)
        .join(specializations, vacancies.c.specialization_id == specializations.c.id)
    )
    vacancies_data = await database.fetch_all(vacancies_query)

    if not vacancies_data:
        return []

    # Получить все навыки, связанные с вакансиями
    skills_query = (
        select(
            vacancies_skills.c.vacancy_id,
            skills.c.id.label("skill_id"),
            skills.c.skill.label("skill_skill"),
        )
        .join(skills, vacancies_skills.c.skill_id == skills.c.id)
        .where(vacancies_skills.c.vacancy_id.in_([v["id"] for v in vacancies_data]))
    )
    skills_data = await database.fetch_all(skills_query)

    # Организовать навыки по вакансиям
    skills_mapping = {}
    for skill in skills_data:
        vacancy_id = skill["vacancy_id"]
        if vacancy_id not in skills_mapping:
            skills_mapping[vacancy_id] = []
        skills_mapping[vacancy_id].append({"id": skill["skill_id"], "skill": skill["skill_skill"]})

    # Формирование финального результата
    vacancies_result = []
    for vacancy in vacancies_data:
        vacancy_id = vacancy["id"]
        vacancies_result.append(
            Vacancy(
                **vacancy,
                skills=skills_mapping.get(vacancy_id, []),
                specialization={
                    "id": vacancy["specialization_id"],
                    "name": vacancy["specialization_name"],
                },
                company=await get_company(vacancy["company_id"])
            )
        )

    return vacancies_result
