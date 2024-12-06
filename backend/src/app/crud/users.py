from app.db import database, users

async def get_user_by_email(email: str):
    query = users.select().where(users.c.email == email)
    return await database.fetch_one(query)

async def create_user(user_data: dict):
    query = users.insert().values(user_data).returning(users.c.id, users.c.email, users.c.role, users.c.created_at)
    return await database.fetch_one(query)
