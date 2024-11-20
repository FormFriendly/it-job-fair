from pydantic import BaseModel
from pydantic.fields import Field

# Правила валидации для входящих заметок
class NoteSchema(BaseModel):
    title: str = Field(..., min_length=3, max_length=50)
    description: str = Field(..., min_length=3, max_length=50)

# Модель для заметок из БД, наследуемая от NoteSchema и добавляющая id
class NoteDB(NoteSchema):
    id: int