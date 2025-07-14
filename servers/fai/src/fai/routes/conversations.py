from typing import Optional

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from src.fai.app import fai_app
from src.fai.dependencies import get_db
from src.settings import LOGGER


MOCK_CONVERSATIONS_DATA = [
    {
        "conversation_id": "conv_123",
        "created_at": "2024-01-15T10:30:00",
        "turns": [
            {"role": "user", "text": "How do I make a chocolate cake?", "created_at": "2024-01-15T10:30:00"},
            {
                "role": "assistant",
                "text": "Here's a simple chocolate cake recipe...",
                "created_at": "2024-01-15T10:30:30",
            },
        ],
    },
    {
        "conversation_id": "conv_456",
        "created_at": "2024-01-15T11:00:00",
        "turns": [
            {"role": "user", "text": "What's the weather like today?", "created_at": "2024-01-15T11:00:00"},
            {
                "role": "assistant",
                "text": "I don't have access to real-time weather data...",
                "created_at": "2024-01-15T11:00:15",
            },
            {"role": "user", "text": "Ok, thanks anyway!", "created_at": "2024-01-15T11:00:30"},
        ],
    },
]


@fai_app.get("/conversations/{domain}")
async def get_conversations(
    domain: str,
    source: Optional[str] = "CHAT",
    page: Optional[int] = None,
    limit: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    LOGGER.info(f"Retrieving conversations for domain {domain}")
    print(source, page, limit)
    return JSONResponse(content=jsonable_encoder({"conversations": MOCK_CONVERSATIONS_DATA}))
