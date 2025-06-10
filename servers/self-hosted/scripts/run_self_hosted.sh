#!/bin/bash
set -euo pipefail

if [ ! -d "/app/fern" ]; then
    echo "Fern folder not found. Please ensure you are mounting yours in."
    exit 1
fi

# --------------------------------------------

source /app/servers/self-hosted/.env
ORG_NAME=$(jq -r '.organization' < /app/fern/fern.config.json)
MINIO_BUCKET_NAME=${ORG_NAME}.${MINIO_BUCKET_NAME_SUFFIX}
NEXT_PUBLIC_DOCS_DOMAIN_URL=${ORG_NAME}.docs.buildwithfern.com

# --------------------------------------------


# map custom domain to local machine
echo "127.0.0.1 $ORG_NAME.docs.buildwithfern.com.localhost" >> /etc/hosts
echo "::1 $ORG_NAME.docs.buildwithfern.com.localhost" >> /etc/hosts

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
mc alias set minio ${MINIO_URL} ${MINIO_USERNAME} ${MINIO_PASSWORD}
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
ORG_NAME=${ORG_NAME} \
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

cd /app/

if [ -d "fern" ]; then
    echo "Found fern folder in current directory"
else
    echo "fern folder NOT found in current directory"
fi

# --------------  Generate docs and insert into MinIO via FDR --------------

echo "running fern generate --docs"

FERN_SELF_HOSTED=true FERN_TOKEN=dummy OVERRIDE_FDR_ORIGIN=http://localhost:8080  FERN_NO_VERSION_REDIRECTION=true fern generate --docs

echo " docs generated successfully"

# --------------  Finish generate docs --------------

# --------------  Start nextapp --------------

echo "Waiting for docs to start at localhost:3000..."

cd /app/nextapp/packages/fern-docs/bundle
HOSTNAME="0.0.0.0" \
PORT=3000 \
NEXT_PUBLIC_FDR_ORIGIN_PORT=8080 \
NEXT_PUBLIC_FDR_ORIGIN="http://localhost:8080" \
NEXT_PUBLIC_DOCS_DOMAIN=${NEXT_PUBLIC_DOCS_DOMAIN_URL} \
NEXT_PUBLIC_IS_SELF_HOSTED=1 \
NEXT_DISABLE_CACHE=1 \
NODE_PATH=/app/nextapp/.next/standalone/packages/fern-docs/bundle \
node server.js & docs_pid=$!
echo "docs_pid: $docs_pid"

# --------------  Finish nextapp --------------

if [ "${RUN_MODE:-}" = "shell" ]; then
    echo "Entering shell mode..."
    exec /bin/sh
fi

wait $postgres_pid
wait $minio_pid
wait $fdr_pid
wait $docs_pid