from typing import Dict

import uvicorn

from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

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

app.add_middleware(
    CORSMiddleware,  # type: ignore
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> Dict[str, str]:
    return {"status": "hello fernie!"}


@app.exception_handler(404)
async def custom_404_handler() -> None:
    raise HTTPException(status_code=404, detail="Not Found")


def start() -> None:
    """Launched with `poetry run start` at root level"""

    uvicorn.run(
        "src.fai.main:app", host="0.0.0.0", port=8080, server_header=False
    )


if __name__ == "__main__":
    start()
