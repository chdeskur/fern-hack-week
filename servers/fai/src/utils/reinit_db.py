import asyncio

from fai.models.query import Query
from src.fai.db import Base
from src.fai.db import engine


async def reinit() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)


if __name__ == "__main__":
    asyncio.run(reinit())
