from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.settings import LOGGER
from src.settings import VARIABLES
from src.utils.init_db import init


async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    if VARIABLES.IS_LOCAL:
        LOGGER.info("Setup: Local development mode. Initializing database...")
        try:
            await init()
            LOGGER.info("Setup: Database initialized.")
        except Exception as e:
            LOGGER.error(f"Setup: Error initializing database: {e}")
            raise e
    else:
        LOGGER.info("Setup: Production mode. Database not initialized.")
    yield
    LOGGER.info("Setup: Database not initialized.")


fai_app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "https://www.app.buildwithfern.com",
    "https://app.buildwithfern.com",
    "https://www.app-dev.buildwithfern.com",
    "https://app-dev.buildwithfern.com",
    "https://www.dashboard-dev.buildwithfern.com",
    "https://dashboard-dev.buildwithfern.com",
    "https://www.dashboard.buildwithfern.com",
    "https://dashboard.buildwithfern.com",
]

fai_app.add_middleware(
    CORSMiddleware,  # type: ignore
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
