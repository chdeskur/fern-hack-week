from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from src.fai.app import fai_app
from src.fai.dependencies import get_db
from src.settings import LOGGER


MOCK_ANALYTICS_DATA = {
    "bars": [
        {"label": "2024-01-15", "conversationCount": 12},
        {"label": "2024-01-16", "conversationCount": 8},
        {"label": "2024-01-17", "conversationCount": 15},
    ]
}


@fai_app.get("/analytics/histogram/{domain}")
async def get_histogram_analytics(
    domain: str,
    start_date: str,
    end_date: str,
    groupBy: str,
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    LOGGER.info(f"Retrieving histogram analytics for domain {domain}")
    return JSONResponse(content=jsonable_encoder(MOCK_ANALYTICS_DATA))
