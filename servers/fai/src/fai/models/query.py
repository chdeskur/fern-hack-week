from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import String

from src.fai.db import Base


class QueryApi(BaseModel):
    query_id: Optional[int] = None
    domain: str
    conversation_id: str
    query: str
    output: str
    created_at: datetime
    time_to_first_token: float


class Query(Base):
    __tablename__ = "queries"

    query_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    domain = Column(String, nullable=False)
    conversation_id = Column(String, nullable=False)
    query = Column(String, nullable=False)
    output = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
    time_to_first_token = Column(Float, nullable=False)

    def to_api(self) -> QueryApi:
        return QueryApi(
            query_id=self.query_id,
            domain=self.domain,
            conversation_id=self.conversation_id,
            query=self.query,
            output=self.output,
            created_at=self.created_at,
            time_to_first_token=self.time_to_first_token,
        )
