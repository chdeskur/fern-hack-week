from typing import Optional

from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import and_
from sqlalchemy import desc
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.fai.app import fai_app
from src.fai.db_models.query import Query
from src.fai.dependencies import get_db
from src.settings import LOGGER


@fai_app.get("/conversations/{domain}")
async def get_conversations(
    domain: str,
    source: Optional[str] = "CHAT",
    page: int = 1,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    LOGGER.info(f"Retrieving conversations for domain {domain}")
    try:
        # Step 1: Paginate the conversation IDs based on the latest query time
        offset = (page - 1) * limit
        paginated_conv_ids_stmt = (
            select(Query.conversation_id)
            .where(and_(Query.domain == domain, Query.source == source))
            .group_by(Query.conversation_id)
            .order_by(desc(func.max(Query.created_at)))
            .offset(offset)
            .limit(limit)
        )

        paginated_conv_ids_result = await db.execute(paginated_conv_ids_stmt)
        paginated_conv_ids = [row[0] for row in paginated_conv_ids_result]

        if not paginated_conv_ids:
            return JSONResponse(content=jsonable_encoder({"conversations": []}))

        # Step 2: Fetch all queries for the paginated conversation IDs
        queries_stmt = select(Query).where(Query.conversation_id.in_(paginated_conv_ids)).order_by(Query.created_at)
        queries_result = await db.execute(queries_stmt)
        queries = queries_result.scalars().all()

        # Step 3: Group queries by conversation_id to form conversations
        conversations_map = {}
        for query in queries:
            if query.conversation_id not in conversations_map:
                conversations_map[query.conversation_id] = {
                    "conversation_id": query.conversation_id,
                    "created_at": None,
                    "turns": [],
                }

            turn_data = {
                "role": query.role,
                "text": query.text,
                "created_at": query.created_at.isoformat(),
            }
            conversations_map[query.conversation_id]["turns"].append(turn_data)

        # Step 4: Reconstruct the list in the correct paginated order and set created_at
        final_conversations = []
        for conv_id in paginated_conv_ids:
            conv_data = conversations_map[conv_id]
            # The created_at of a conversation is the created_at of the last turn.
            if conv_data["turns"]:
                conv_data["created_at"] = conv_data["turns"][-1]["created_at"]
            final_conversations.append(conv_data)

        return JSONResponse(content=jsonable_encoder(final_conversations))
    except Exception as e:
        LOGGER.exception("Failed to get conversations")
        return JSONResponse(status_code=500, content={"detail": str(e)})
