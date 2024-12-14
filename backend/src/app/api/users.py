from fastapi import APIRouter, Depends, HTTPException
from app.models.user import User, UserUpdate
from app.crud.users import get_user_by_id, update_user
from app.api.auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=User)
async def read_current_user(current_user: dict = Depends(get_current_user)):
    user = await get_user_by_id(current_user["user_id"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/me", response_model=User)
async def update_current_user(
    user_update: UserUpdate,
    current_user: dict = Depends(get_current_user)
):
    updated_user = await update_user(current_user["user_id"], user_update.dict(exclude_unset=True))
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user