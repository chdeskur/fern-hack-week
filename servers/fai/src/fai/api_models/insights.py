from typing import List

from pydantic import BaseModel


class InsightApi(BaseModel):
    insightText: str
    numberOfQueries: int
    examples: List[str]


class InsightsApi(BaseModel):
    insights: List[InsightApi]
