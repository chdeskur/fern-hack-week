from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


fai_app = FastAPI()

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
