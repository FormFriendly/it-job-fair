from sqlalchemy import select, insert, update
from app.db import companies, database

async def get(company_id: int):
    query = select(companies).where(companies.c.id == company_id)
    return await database.fetch_one(query)

async def get_all():
    query = select(companies)
    return await database.fetch_all(query=query)

async def get_company_by_user_id(user_id: int):
    query = select(companies).where(companies.c.user_id == user_id)
    return await database.fetch_one(query)

async def post(company_data: dict):
    query = insert(companies).values(**company_data).returning(companies)
    return await database.fetch_one(query)

async def put(user_id: int, company_data: dict):
    query = update(companies).where(companies.c.user_id == user_id).values(**company_data)
    await database.execute(query)
