from sqlalchemy import select, insert, update
from app.db import candidates, database
from app.models.candidate import Candidate

async def get(candidate_id: int):
    query = select(candidates).where(candidates.c.id == candidate_id)
    return await database.fetch_one(query)

async def get_candidate_by_user_id(user_id: int):
    query = select(candidates).where(candidates.c.user_id == user_id)
    return await database.fetch_one(query)

# Создать новую запись кандидата
async def post(user_id: int):
    query = insert(candidates).values(user_id=user_id, name="Пользователь", surname=f"000{str(user_id)}").returning(candidates)
    data = await database.fetch_one(query)
    return Candidate(**data)

# Обновить запись кондидата
async def put(user_id: int, candidate_data: dict):
    query = update(candidates).where(candidates.c.user_id == user_id).values(**candidate_data).returning(candidates)
    return await database.fetch_one(query)

async def update_avatar(user_id: int, avatar_path: str):
    query = update(candidates).where(candidates.c.user_id == user_id).values(avatar_path=avatar_path)
    await database.execute(query)