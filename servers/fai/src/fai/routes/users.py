import json

from fastapi import Depends
from fastapi import Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.fai.app import fai_app
from src.fai.dependencies import get_db
from src.fai.models.user import User


@fai_app.get("/users")
async def list_users(db: AsyncSession = Depends(get_db)) -> Response:
    result = await db.execute(select(User))
    users = result.scalars().all()
    users_json = json.dumps([user.dict() for user in users])
    return Response(content=users_json, media_type="application/json")
