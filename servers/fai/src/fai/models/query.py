from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import String

from src.fai.db import Base


class QueryApi(BaseModel):
    query_id: str
    conversation_id: str
    domain: str
    text: str
    role: str
    created_at: datetime
    time_to_first_token: Optional[float] = None


class Query(Base):
    __tablename__ = "queries"

    query_id = Column(String, primary_key=True, index=True)
    conversation_id = Column(String, nullable=False)
    domain = Column(String, nullable=False)
    text = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=False)
    time_to_first_token = Column(Float, nullable=True)

    def to_api(self) -> QueryApi:
        return QueryApi(
            query_id=self.query_id,
            conversation_id=self.conversation_id,
            domain=self.domain,
            text=self.text,
            role=self.role,
            created_at=self.created_at,
            time_to_first_token=self.time_to_first_token,
        )
