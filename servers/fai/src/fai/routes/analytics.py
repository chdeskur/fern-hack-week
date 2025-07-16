from datetime import datetime

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.fai.app import fai_app
from src.fai.db_models.query import Query
from src.fai.dependencies import get_db
from src.fai.utils.fetch_grouped_data import fetch_grouped_data
from src.fai.utils.fill_date_gaps import fill_date_gaps
from src.fai.utils.get_insights_from_queries import get_insights_from_queries
from src.settings import LOGGER


@fai_app.get("/analytics/histogram/{domain}")
async def get_histogram_analytics(
    domain: str,
    start_date: str,
    end_date: str,
    groupBy: str,
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    try:
        start = datetime.fromisoformat(start_date)
        end = datetime.fromisoformat(end_date)

        valid_groups = {"DAY": "day", "WEEK": "week", "MONTH": "month"}
        if groupBy not in valid_groups:
            return JSONResponse(
                status_code=400,
                content={"detail": "Invalid groupBy. Use DAY, WEEK, or MONTH."},
            )

        grouped_data = await fetch_grouped_data(db, domain, start, end, valid_groups[groupBy])

        histogram_analytics = fill_date_gaps(start, end, groupBy, grouped_data)

        LOGGER.info(f"Retrieved histogram data for domain: {domain}, groupBy: {groupBy}")
        return JSONResponse(content=jsonable_encoder(histogram_analytics))

    except Exception as e:
        LOGGER.exception("Failed to get histogram analytics")
        return JSONResponse(status_code=500, content={"detail": str(e)})


@fai_app.get("/analytics/insights/{domain}")
async def get_insights_analytics(
    domain: str,
    start_date: str,
    end_date: str,
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    try:
        start = datetime.fromisoformat(start_date)
        end = datetime.fromisoformat(end_date)

        result = await db.execute(
            select(Query)
            .where(Query.domain == domain)
            .where(Query.role == "USER")
            .where(Query.created_at >= start)
            .where(Query.created_at <= end)
        )

        queries = result.scalars().all()
        api_queries = [query.to_api() for query in queries]
        insights = await get_insights_from_queries(api_queries)

        return JSONResponse(content=jsonable_encoder(insights))

    except Exception as e:
        LOGGER.exception("Failed to get insights analytics")
        return JSONResponse(status_code=500, content={"detail": str(e)})
