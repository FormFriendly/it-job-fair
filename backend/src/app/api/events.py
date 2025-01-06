from typing import List
from fastapi import APIRouter, HTTPException, status
from app.models.event import Event
from app.crud.events import get, get_all

router = APIRouter()

# Получить список мероприятий
@router.get("/", response_model=List[Event])
async def get_events_list():
    events = await get_all()
    if not events:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Events not found"
        )
    return events

# Получить мероприятие по id
@router.get("/{event_id}", response_model=Event)
async def get_event(event_id: int):
    event = await get(event_id)
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )
    return event