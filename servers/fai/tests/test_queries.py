import datetime
import uuid

import requests

from src.fai.api_models.query import QueryApi


def generate_unique_query_data() -> QueryApi:
    """Helper to generate a query with a unique ID."""
    now = datetime.datetime.now(datetime.timezone.utc)
    return QueryApi(
        query_id=f"test-query-{uuid.uuid4()}",
        conversation_id=f"test-convo-{uuid.uuid4()}",
        domain="test-domain",
        text="test query",
        role="USER",
        source="CHAT",
        created_at=now,
        time_to_first_token=0.5,
    )


def test_create_query(fai_docker: None, docker_ip: str) -> None:
    """Test creating a new query with unique IDs to avoid PK conflicts."""
    query_data = generate_unique_query_data()

    print(f"Sending POST request with: {query_data}")
    response = requests.post(
        f"http://{docker_ip}:8080/queries",
        json=query_data.model_dump(mode="json"),
        timeout=5,
    )

    assert response.status_code == 200, f"Unexpected response: {response.text}"
    created_query = QueryApi(**response.json())
    print(f"Created query: {created_query}")
    assert created_query.query_id == query_data.query_id


def test_list_queries(fai_docker: None, docker_ip: str) -> None:
    """Test listing all queries and verifying presence of a known query."""
    query_data = generate_unique_query_data()
    create_resp = requests.post(
        f"http://{docker_ip}:8080/queries",
        json=query_data.model_dump(mode="json"),
        timeout=5,
    )
    assert create_resp.status_code == 200

    response = requests.get(f"http://{docker_ip}:8080/queries", timeout=5)
    assert response.status_code == 200

    queries = [QueryApi(**q) for q in response.json()]
    assert queries, "Query list is empty"

    ids = [q.query_id for q in queries]
    assert query_data.query_id in ids, f"{query_data.query_id} not found in query list"
