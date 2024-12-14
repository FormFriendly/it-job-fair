from app.db import database, users

async def get_user_by_id(user_id: int):
    query = users.select().where(users.c.id == user_id)
    return await database.fetch_one(query=query)

async def get_user_by_email(email: str):
    query = users.select().where(users.c.email == email)
    return await database.fetch_one(query)

async def create_user(user_data: dict):
    query = users.insert().values(user_data).returning(users.c.id, users.c.email, users.c.role, users.c.created_at)
    return await database.fetch_one(query)

async def update_user(user_id: int, user_data: dict):
    if "password" in user_data:
        from app.core.security import hash_password
        user_data["password"] = hash_password(user_data["password"])
    query = users.update().where(users.c.id == user_id).values(**user_data).returning(*users.c)
    return await database.fetch_one(query)