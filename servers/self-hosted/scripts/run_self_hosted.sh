#!/bin/bash
set -euo pipefail

source /app/servers/self-hosted/.env

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
minio server ${MINIO_VOLUMES} --console-address ":9001" &
minio_pid=$!

echo "Waiting for MinIO to start..."
timeout=30
while ! nc -z localhost 9000; do
    if [ $timeout -le 0 ]; then
        echo "Error: MinIO failed to start within 30 seconds"
        exit 1
    fi
    sleep 1
    timeout=$((timeout - 1))
done

echo "MinIO server is up and running"

# Initialize MinIO
mc alias set minio http://localhost:9000 minioadmin minioadmin
mc mb minio/${MINIO_BUCKET_NAME}

# -----------  Finish run MinIO  -----------

# -----------  Postgres and MinIO setup  -----------

echo "Creating Postgres database..."
psql -U postgres -c "CREATE DATABASE ${DATABASE_NAME};"

echo "Running database migrations..."
DATABASE_URL=${DATABASE_URL} prisma migrate deploy --schema /app/servers/fdr/prisma/schema.prisma

# -----------  Finish Postgres and MinIO setup  -----------

# -----------  Start run FDR  -----------

LOCAL_MODE_OVERRIDE=true \
DATABASE_URL=${DATABASE_URL} \
MINIO_USERNAME=${MINIO_USERNAME} \
MINIO_PASSWORD=${MINIO_PASSWORD} \
MINIO_URL=${MINIO_URL} \
MINIO_BUCKET_NAME=${MINIO_BUCKET_NAME} \
node --loader /app/servers/fdr/ts-loader.js --experimental-specifier-resolution=node /app/servers/fdr/dist/server.js & fdr_pid=$!

echo "Waiting for fdr to start at localhost:8080..."
while ! nc -z localhost 8080; do
    if [ $timeout -le 0 ]; then
        echo "Error: FDR failed to start within 30 seconds"
        exit 1
    fi
    sleep 1
    timeout=$((timeout - 1))
done
echo "FDR is up and running at localhost:8080"

# -----------  Finish run FDR  -----------

if [ "${RUN_MODE:-}" = "shell" ]; then
    echo "Entering shell mode..."
    exec /bin/sh
fi

wait $postgres_pid
wait $minio_pid
wait $fdr_pid
