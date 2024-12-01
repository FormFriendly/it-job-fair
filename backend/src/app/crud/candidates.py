from sqlalchemy import select, insert, update
from app.db import candidates, database

async def get(candidate_id: int):
    query = select(candidates).where(candidates.c.id == candidate_id)
    return await database.fetch_one(query)

async def get_candidate_by_user_id(user_id: int):
    query = select(candidates).where(candidates.c.user_id == user_id)
    return await database.fetch_one(query)

async def post(candidate_data: dict):
    query = insert(candidates).values(**candidate_data).returning(candidates)
    return await database.fetch_one(query)

async def put(user_id: int, candidate_data: dict):
    query = update(candidates).where(candidates.c.user_id == user_id).values(**candidate_data).returning(candidates)
    return await database.fetch_one(query)
