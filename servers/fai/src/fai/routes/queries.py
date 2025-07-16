from datetime import datetime
from datetime import timedelta
from typing import Optional

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import desc
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from fai.api_models.query import QueryApi
from fai.db_models.query import Query
from src.fai.app import fai_app
from src.fai.dependencies import get_db
from src.settings import LOGGER


@fai_app.get("/queries/{domain}")
async def get_recent_queries(
    domain: str,
    page: int = 1,
    limit: int = 10,
    start_time: datetime = datetime.now(),
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    LOGGER.info("Listing queries")
    offset = (page - 1) * limit

    result = await db.execute(
        select(Query)
        .where(Query.domain == domain)
        .where(Query.role == "USER")
        .where(Query.created_at < start_time)
        .order_by(desc(Query.created_at))
        .offset(offset)
        .limit(limit)
    )
    queries = result.scalars().all()
    api_queries = [query.to_api() for query in queries]

    total_result = await db.execute(
        select(func.count(Query.query_id))
        .where(Query.domain == domain)
        .where(Query.role == "USER")
        .where(Query.created_at < start_time)
    )
    total_count = total_result.scalar()

    return JSONResponse(
        content=jsonable_encoder({"queries": [q.model_dump() for q in api_queries], "total": total_count})
    )


@fai_app.post("/queries")
async def create_query(query: QueryApi, db: AsyncSession = Depends(get_db)) -> JSONResponse:
    LOGGER.info("Creating new query")
    try:
        db_query = Query(
            query_id=query.query_id,
            domain=query.domain,
            conversation_id=query.conversation_id,
            text=query.text,
            role=query.role,
            source=query.source,
            created_at=query.created_at,
            time_to_first_token=query.time_to_first_token,
        )
        db.add(db_query)
        await db.commit()
        await db.refresh(db_query)
        LOGGER.info("Query created")
        data = db_query.to_api().model_dump()
        return JSONResponse(content=jsonable_encoder(data))
    except Exception as e:
        LOGGER.exception("Failed to create query")
        return JSONResponse(status_code=500, content={"detail": str(e)})
