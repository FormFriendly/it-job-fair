from app.db import applications, database

# Создать отклик
async def post(application_data: dict):
    query = applications.insert().values(**application_data).returning(applications)
    return await database.fetch_one(query)

# Получить отклик по ID
async def get(id: int):
    query = applications.select().where(applications.c.id == id)
    return await database.fetch_one(query)

# Получить отклики по вакансии
async def get_by_vacancy(vacancy_id: int):
    query = applications.select().where(applications.c.vacancy_id == vacancy_id)
    return await database.fetch_all(query)

# Получить отклики кандидата
async def get_by_candidate(candidate_id: int):
    query = applications.select().where(applications.c.candidate_id == candidate_id)
    return await database.fetch_all(query)

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