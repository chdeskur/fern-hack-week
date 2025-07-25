import json
import uuid

from datetime import datetime

from fastapi import Body
from fastapi import Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.fai.api_models.index import IndexRequest
from src.fai.api_models.index import UpdateIndexRequest
from src.fai.app import fai_app
from src.fai.db_models.context import Context
from src.fai.dependencies import get_db
from src.settings import LOGGER


@fai_app.post("/index/{domain}")
async def index(
    domain: str,
    body: IndexRequest = Body(...),
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    try:
        db_context = Context(
            context_id=str(uuid.uuid4()),
            domain=domain,
            context=json.dumps(body.context),
            content=body.content,
            document_id=body.document_id,
            is_active=True,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.add(db_context)
        await db.commit()
        await db.refresh(db_context)
        LOGGER.info(f"Indexed document {body.document_id} for domain: {domain}")
        return JSONResponse(content=jsonable_encoder({"message": "Document indexed successfully"}))

    except Exception as e:
        LOGGER.exception("Failed to index document")
        return JSONResponse(status_code=500, content={"detail": str(e)})


@fai_app.post("/index/{domain}/update")
async def update(
    domain: str,
    document_id: str,
    body: UpdateIndexRequest = Body(...),
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    try:
        db_context = await db.execute(
            select(Context).where(Context.document_id == document_id, Context.domain == domain)
        )
        db_context = db_context.scalar_one_or_none()
        if db_context:
            if body.context is not None:
                db_context.context = json.dumps(body.context)
            if body.content is not None:
                db_context.content = body.content
            if body.is_active is not None:
                db_context.is_active = body.is_active
            await db.commit()
            await db.refresh(db_context)
            LOGGER.info(f"Updated document {document_id} for domain: {domain}")
        return JSONResponse(content=jsonable_encoder({"message": "Document updated successfully"}))

    except Exception as e:
        LOGGER.exception("Failed to update document")
        return JSONResponse(status_code=500, content={"detail": str(e)})


@fai_app.get("/index/{domain}")
async def get_context(
    domain: str,
    document_id: str,
    db: AsyncSession = Depends(get_db),
) -> JSONResponse:
    try:
        db_context = await db.execute(
            select(Context).where(Context.document_id == document_id, Context.domain == domain)
        )
        db_context = db_context.scalar_one_or_none()
        if db_context:
            return JSONResponse(content=jsonable_encoder(db_context))
        return JSONResponse(content=jsonable_encoder({"message": "Document not found"}))

    except Exception as e:
        LOGGER.exception("Failed to get document context")
        return JSONResponse(status_code=500, content={"detail": str(e)})
