from typing import List
from typing import Optional

from pydantic import BaseModel


class IndexRequest(BaseModel):
    index_name: Optional[str] = None
    document_id: str
    context: List[str]
    content: str


class UpdateIndexRequest(BaseModel):
    context: Optional[List[str]] = None
    content: Optional[str] = None
    is_active: Optional[bool] = None
