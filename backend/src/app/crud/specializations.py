from sqlalchemy import select
from app.db import specializations, database

async def get(specialization_id: int):
    query = select(specializations).where(specializations.c.id == specialization_id)
    return await database.fetch_one(query)

async def get_all():
    query = select(specializations)
    return await database.fetch_all(query=query)