import subprocess
import time

import requests


def test_health_endpoint() -> None:
    subprocess.run(["docker", "build", "-t", "fern-ai-test", "."], check=True)

    container = subprocess.Popen(
        ["docker", "run", "-p", "8080:8080", "fern-ai-test"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    container_id = None
    try:
        time.sleep(10)

        ps_result = subprocess.run(
            ["docker", "ps", "--latest", "--quiet"],
            capture_output=True,
            text=True,
            check=True,
        )
        container_id = ps_result.stdout.strip()

        for _ in range(5):
            try:
                response = requests.get(
                    "http://localhost:8080/health", timeout=5
                )
                assert response.status_code == 200, "Health check failed"
                break
            except requests.exceptions.ConnectionError:
                time.sleep(2)
        else:
            raise AssertionError("Health endpoint not available after retries")

    except Exception as e:
        print(f"Error: {e}")
        raise e

    finally:
        if container_id:
            subprocess.run(["docker", "stop", container_id], check=True)
            subprocess.run(["docker", "rm", container_id], check=True)
