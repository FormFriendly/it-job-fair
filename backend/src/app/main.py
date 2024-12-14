from fastapi import FastAPI

from app.api import ping, auth, users, companies, candidates 
from app.db import engine, metadata, database

metadata.create_all(engine) # Создание таблиц, определенных в metadata, если они не существуют

app = FastAPI()

# Функция, выполняемая при запуске приложения
@app.on_event("startup")
async def startup():
    await  database.connect()

# Функция, выполняемая при остановке приложения
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# Подключение роутеров
app.include_router(ping.router) 
app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(companies.router, prefix="/api/companies", tags=["companies"])
app.include_router(candidates.router, prefix="/api/candidates", tags=["candidates"])