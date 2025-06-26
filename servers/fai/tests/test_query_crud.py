import datetime

import requests

from src.fai.models.query import QueryApi


def test_create_query(fai_docker: None, docker_ip: str) -> None:
    """Test creating a new query."""
    query_data = QueryApi(
        domain="test-domain",
        conversation_id="test-convo-1",
        query="test query",
        output="test output",
        created_at=datetime.datetime.now(),  # Remove isoformat() call since model_dump will handle serialization
        time_to_first_token=0.5,
    )

    print(f"Sending POST request with: {query_data}")
    response = requests.post(
        f"http://{docker_ip}:8080/queries",
        json=query_data.model_dump(mode="json"),  # Use mode='json' to properly serialize datetime
        timeout=5,
    )

    assert response.status_code == 200
    created_query = QueryApi(**response.json())
    print(f"Created query: {created_query}")
    assert created_query.query_id is not None


def test_list_queries(fai_docker: None, docker_ip: str) -> None:
    """Test listing all queries."""
    response = requests.get(f"http://{docker_ip}:8080/queries", timeout=5)
    assert response.status_code == 200

    queries = [QueryApi(**q) for q in response.json()]
    assert queries

    for query in queries:
        assert query.query_id is not None
