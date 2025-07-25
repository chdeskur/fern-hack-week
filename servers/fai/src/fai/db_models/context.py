import json

from sqlalchemy import JSON
from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import String

from src.fai.api_models.context import ContextApi
from src.fai.db import Base


class Context(Base):
    __tablename__ = "contexts"
    __table_args__ = {"extend_existing": True}

    context_id = Column(String, primary_key=True)
    domain = Column(String, nullable=False)
    context = Column(JSON, nullable=False)
    content = Column(String, nullable=False)
    document_id = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime(timezone=True), nullable=False)
    updated_at = Column(DateTime(timezone=True), nullable=False)

    def to_api(self) -> ContextApi:
        return ContextApi(
            context_id=self.context_id,
            domain=self.domain,
            context=json.loads(self.context),
            content=self.content,
            document_id=self.document_id,
            is_active=self.is_active,
            created_at=self.created_at,
            updated_at=self.updated_at,
        )
