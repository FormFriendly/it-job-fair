# from app.db import notes, database

# # Получение заметки по ее id
# async def get(id: int):
#     query = notes.select().where(id == notes.c.id)
#     return await database.fetch_one(query=query)

# # Получение всех заметок
# async def get_all():
#     query = notes.select()
#     return await database.fetch_all(query=query)

# # Добавление новой заметки
# async def post(payload: NoteSchema):
#     query = notes.insert().values(title=payload.title, description=payload.description)
#     return await database.execute(query=query)

# # Обновление существующей заметки по id
# async def put(id: int, payload: NoteSchema):
#     query = (
#         notes
#         .update()
#         .where(id == notes.c.id)
#         .values(title=payload.title, description=payload.description)
#         .returning(notes.c.id)
#     )
#     return await database.execute(query=query)

# # Удаление заметки по id
# async def delete(id: int):
#     query = notes.delete().where(id == notes.c.id)
#     return await database.execute(query=query)