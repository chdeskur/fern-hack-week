import importlib
import pkgutil

import uvicorn

from fastapi import Response

from src.fai.app import fai_app
from src.settings import LOGGER


ROUTES_PACKAGE_NAME = "src.fai.routes"


@fai_app.get("/health")
def health() -> Response:
    return Response(content='{"status": "hello fernie!"}', media_type="application/json")


def start() -> None:
    """Launched with `poetry run start` at root level"""

    LOGGER.info("Importing all routes...")
    for _, module_name, _ in pkgutil.iter_modules([ROUTES_PACKAGE_NAME.replace(".", "/")]):
        full_module_name = f"{ROUTES_PACKAGE_NAME}.{module_name}"
        importlib.import_module(full_module_name)

    LOGGER.info("Starting FastAPI application...")
    uvicorn.run("src.fai.main:fai_app", host="0.0.0.0", port=8080, server_header=False)


if __name__ == "__main__":
    start()
