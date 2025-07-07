code-cleanup:
	poetry run black .
	poetry run isort .

check:
	poetry run python -m mypy .
	poetry run black --check .
	poetry run isort --check .

test:
	poetry run pytest

init-db:
	poetry run python -m src.utils.init_db

build-docker:
	docker build -t fai .

run-docker:
	docker run -p 8080:8080 fai
