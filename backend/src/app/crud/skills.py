from sqlalchemy import select
from app.db import skills, database

async def get(skill_id: int):
    query = select(skills).where(skills.c.id == skill_id)
    return await database.fetch_one(query)

async def get_all():
    query = select(skills)
    return await database.fetch_all(query=query)