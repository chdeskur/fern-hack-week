import os
import uuid

import pytest
import requests

from _pytest.config import Config
from pytest_docker.plugin import Services


@pytest.fixture(scope="session")
def docker_compose_file(pytestconfig: Config) -> str:
    os.environ["COMPOSE_PROJECT_NAME"] = f"pytest_{uuid.uuid4().hex[:8]}"
    return os.path.join(str(pytestconfig.rootdir), "docker-compose.yml")


def is_responsive(url: str) -> bool:
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return True
    except Exception:
        return False
    return False


@pytest.fixture(scope="session")
def fai_docker(docker_ip: str, docker_services: Services) -> None:
    docker_services.wait_until_responsive(
        timeout=30.0,
        pause=1,
        check=lambda: is_responsive(f"http://{docker_ip}:8080/health"),
    )
