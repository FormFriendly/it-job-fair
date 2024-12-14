from sqlalchemy import select, insert, update
from app.db import candidates, database

async def get(candidate_id: int):
    query = select(candidates).where(candidates.c.id == candidate_id)
    return await database.fetch_one(query)

async def get_candidate_by_user_id(user_id: int):
    query = select(candidates).where(candidates.c.user_id == user_id)
    return await database.fetch_one(query)

# Создать новую запись кандидата
async def post(user_id: int):
    query = insert(candidates).values(user_id=user_id, name="", surname="").returning(candidates)
    return await database.fetch_one(query)

# Обновить запись кондидата
async def put(user_id: int, candidate_data: dict):
    query = update(candidates).where(candidates.c.user_id == user_id).values(**candidate_data).returning(candidates)
    return await database.fetch_one(query)
