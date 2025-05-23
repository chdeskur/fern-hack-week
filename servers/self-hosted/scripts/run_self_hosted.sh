#!/bin/bash
set -euo pipefail

# -----------  Start run Postgres  -----------

echo "Starting postgres..."
su postgres -c "postgres -D /var/lib/postgresql/data" &
postgres_pid=$!

echo "Waiting for postgres to start at localhost:5432..."
timeout=30
while ! nc -z localhost 5432; do
    if [ $timeout -le 0 ]; then
        echo "Error: PostgreSQL failed to start within 30 seconds"
        exit 1
    fi
    sleep 1
    timeout=$((timeout - 1))
done

echo "Postgres is up and running"

# -----------  Finish run Postgres  -----------

# -----------  Start run MinIO  -----------

echo "Starting MinIO server..."

exec minio server ${MINIO_VOLUMES} --console-address ":9001"

echo "MinIO server is up and running"

# -----------  Finish run MinIO  -----------

if [ "${RUN_MODE:-}" = "shell" ]; then
    echo "Entering shell mode..."
    exec /bin/sh
fi

wait $postgres_pid
