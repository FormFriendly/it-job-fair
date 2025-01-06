from sqlalchemy import select
from app.db import events, database

async def get(event_id: int):
    query = select(events).where(events.c.id == event_id)
    return await database.fetch_one(query)

async def get_all():
    query = select(events)
    return await database.fetch_all(query=query)