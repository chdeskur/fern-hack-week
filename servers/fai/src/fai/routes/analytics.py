from datetime import datetime
from datetime import timedelta

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import and_
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.fai.app import fai_app
from src.fai.db_models.query import Query
from src.fai.dependencies import get_db
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
        st = datetime.fromisoformat(start_date)
        ed = datetime.fromisoformat(end_date)

        if groupBy not in {"DAY", "WEEK", "MONTH"}:
            return JSONResponse(status_code=400, content={"detail": "Invalid groupBy. Use DAY, WEEK, or MONTH."})

        date_trunc_format = {
            "DAY": "day",
            "WEEK": "week",
            "MONTH": "month",
        }[groupBy]

        date_label = func.date_trunc(date_trunc_format, Query.created_at).label("label")
        conversation_count_label = func.count(func.distinct(Query.conversation_id)).label("conversationCount")
        query_count_label = func.count(Query.query_id).label("queryCount")

        stmt = (
            select(date_label, conversation_count_label, query_count_label)
            .where(
                and_(
                    Query.domain == domain,
                    Query.created_at >= st,
                    Query.created_at <= ed,
                )
            )
            .group_by(date_label)
            .order_by(date_label)
        )

        result = await db.execute(stmt)
        rows = result.fetchall()

        counts_by_label = {
            row.label.strftime("%Y-%m-%d"): {
                "conversationCount": row.conversationCount,
                "queryCount": row.queryCount,
            }
            for row in rows
        }

        data = []
        if groupBy == "DAY":
            current = st
            while current <= ed:
                label = current.strftime("%Y-%m-%d")
                count = counts_by_label.get(label, {"conversationCount": 0, "queryCount": 0})
                data.append(
                    {"label": label, "conversationCount": count["conversationCount"], "queryCount": count["queryCount"]}
                )
                current += timedelta(days=1)
        else:
            data = [
                {
                    "label": row.label.strftime("%Y-%m-%d"),
                    "conversationCount": row.conversationCount,
                    "queryCount": row.queryCount,
                }
                for row in rows
            ]

        LOGGER.info(f"Retrieved histogram data for domain: {domain}, groupBy: {groupBy}")
        return JSONResponse(content=jsonable_encoder({"bars": data}))

    except Exception as e:
        LOGGER.exception("Failed to get histogram analytics")
        return JSONResponse(status_code=500, content={"detail": str(e)})
