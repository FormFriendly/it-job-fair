from app.db import ApplicationStatus, applications, database
from app.crud.candidates import get as get_candidate
from app.models.application import Application

# Создать отклик
async def post(application_data: dict):
    query = applications.insert().values(**application_data, status=ApplicationStatus.pending, is_favorited=False, is_withdrawn=False).returning(applications)
    return await database.fetch_one(query)

# Получить отклик по ID
async def get(id: int):
    query = applications.select().where(applications.c.id == id)
    application = await database.fetch_one(query)
    if not application:
        return None
    
    # Получение данных кандидата
    candidate = await get_candidate(application["candidate_id"])

    # Формирование итогового результата
    application_data = dict(application)
    application_data["candidate"] = dict(candidate) if candidate else None

    return Application(**application_data)

# Получить отклики по вакансии
async def get_by_vacancy(vacancy_id: int):
    query = applications.select().where(applications.c.vacancy_id == vacancy_id)
    application_records = await database.fetch_all(query)
    
    # Формирование списка откликов с данными кандидатов
    applications_data = []
    for application in application_records:
        applications_data.append(
            Application(
                **application,
                candidate = await get_candidate(application.candidate_id)
            )
        )

    return applications_data

# Получить отклики кандидата
async def get_by_candidate(candidate_id: int):
    # Основной запрос для откликов
    query = applications.select().where(applications.c.candidate_id == candidate_id)
    application_records = await database.fetch_all(query)

    # Получение данных кандидата (один раз, так как кандидат один)
    candidate = await get_candidate(candidate_id)

    # Формирование списка откликов с данными кандидата
    applications_data = []
    for application in application_records:
        application_data = dict(application)
        application_data["candidate"] = dict(candidate) if candidate else None
        applications_data.append(Application(**application_data))

    return applications_data

# Обновить отклик
async def put(id: int, update_data: dict):
    query = applications.update().where(applications.c.id == id).values(**update_data).returning(applications)
    return await database.fetch_one(query)

# Удалить отклик
async def delete(id: int, candidate_id: int):
    query = applications.delete().where(applications.c.id == id, applications.c.candidate_id == candidate_id)
    return await database.execute(query)

async def update_resume(id: int, resume_path: str):
    query = applications.update().where(applications.c.id == id).values(resume_path=resume_path)
    await database.execute(query)