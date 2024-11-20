from fastapi import FastAPI

from app.api import ping, notes # Роутеры для обработки запросов к API
from app.db import engine, metadata, database # Объекты для работы с БД из db.py

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
app.include_router(notes.router, prefix="/notes", tags=["notes"]) # Подключение роутера, установка префикса пути и тега для документации