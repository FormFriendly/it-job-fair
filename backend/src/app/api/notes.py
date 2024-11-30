# from typing import List # Для аннотации типов списков

# from fastapi.params import Path # Для валидации и получения параметров из URL path
# from app.crud import notes # Модуль с функциями для взаимодействия с БД
# from app.models.notes import NoteDB, NoteSchema # Модели данных для валидации и сериализации
# from fastapi import APIRouter, HTTPException # Для создания маршрутов и обработки исключений

# router = APIRouter()

# # Получение заметки по id
# @router.get("/{id}/", response_model=NoteDB)
# async def read_note(id: int = Path(..., gt=0)):
#     note = await notes.get(id)
#     if not note: # Если заметка не найдена, возвращается ошибка 404
#         raise HTTPException(status_code=404, detail="Note not found")
#     return note

# # Получение всех заметок
# @router.get("/", response_model=List[NoteDB])
# async def read_all_notes():
#     return await notes.get_all()

# # Создание новой заметки
# @router.post("/", response_model=NoteDB, status_code=201)
# async def create_note(payload: NoteSchema): # Принимает payload в формате NoteSchema
#     note_id = await notes.post(payload)

#     response_object = {
#         "id": note_id,
#         "title": payload.title,
#         "description": payload.description,
#     }
#     return response_object # Возвращает созданную заметку с присвоенным id

# # Обновление заметки по id
# @router.put("/{id}/", response_model=NoteDB)
# async def update_note(payload: NoteSchema, id: int = Path(..., gt=0),):
#     note = await notes.get(id)
#     if not note: # Если заметка не найдена, возвращается ошибка 404
#         raise HTTPException(status_code=404, detail="Note not found")
    
#     note_id = await notes.put(id, payload)

#     response_object = {
#         "id": note_id,
#         "title": payload.title,
#         "description": payload.description,
#     }
#     return response_object # Возвращает обновленную заметку

# # Удаление заметки
# @router.delete("/{id}/", response_model=NoteDB)
# async def delete_note(id: int = Path(..., gt=0)):
#     note = await notes.get(id)
    
#     if not note: # Если заметка не найдена, возвращается ошибка 404
#         raise HTTPException(status_code=404, detail="Note not found")

#     await notes.delete(id)

#     return note # Возвращает удаленную заметку