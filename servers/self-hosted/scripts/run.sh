#!/bin/bash
set -euo pipefail

if [ ! -d "/fern" ]; then
    echo "Fern folder not found. Please ensure you are mounting yours in."
    exit 1
fi

export ORG_NAME=$(jq -r '.organization' < /fern/fern.config.json)
export MINIO_BUCKET_NAME=${ORG_NAME}.${MINIO_BUCKET_NAME_SUFFIX}
export NEXT_PUBLIC_DOCS_DOMAIN_URL=${ORG_NAME}.docs.buildwithfern.com

# -----------  Start Postgres setup  -----------
echo "Starting PostgreSQL service..."
service postgresql start
echo "PostgreSQL service started."

# 'pgrep' may not be available in slim images; use alternative to get postgres PID
# 'ps' is not available; fallback to pgrep or skip PID retrieval if unavailable
postgres_pid=$(pgrep -u postgres -n postgres || true)
echo "PostgreSQL PID: $postgres_pid"

echo "Creating Postgres database..."

echo "Running database migrations..."
DATABASE_URL=${DATABASE_URL} prisma migrate deploy --schema /prisma/schema.prisma
# -----------  End Postgres setup  -----------

# -----------  Start MeiliSearch setup  -----------
export MEILI_HTTP_ADDR=0.0.0.0:7700

echo "Starting MeiliSearch..."
./meilisearch --master-key="fern123!" > /var/log/meilisearch.log 2>&1 &
meili_pid=$!
echo "MeiliSearch PID: $meili_pid"

export MEILISEARCH_URL="http://localhost:7700"
# -----------  End MeiliSearch setup  -----------


# -----------  Start MINIO setup  -----------
echo "Starting MinIO server..."
minio server ${MINIO_VOLUMES} --console-address ":9001" > /var/log/minio.log 2>&1 &
minio_pid=$!
echo "MinIO PID: $minio_pid"

# Wait for MinIO to be ready
echo "Waiting for MinIO to start..."
until curl -f ${MINIO_URL}/minio/health/live 2>/dev/null; do
    echo "MinIO not ready yet, waiting 2 seconds..."
    sleep 2
done
echo "MinIO is ready!"

# Initialize MinIO
mc alias set minio ${MINIO_URL} ${MINIO_USERNAME} ${MINIO_PASSWORD}
mc mb minio/${MINIO_BUCKET_NAME}

# map custom domain to local machine
echo "127.0.0.1 $ORG_NAME.docs.buildwithfern.com.localhost" >> /etc/hosts
echo "::1 $ORG_NAME.docs.buildwithfern.com.localhost" >> /etc/hosts
# -----------  End MINIO setup  -----------

echo "Starting FDR server..."
node /fdr/server.cjs &
fdr_pid=$!
echo "FDR server PID: $fdr_pid"

echo "Waiting for FDR to start at localhost:8080/health..."
until curl -f http://localhost:8080/health 2>/dev/null; do
    echo "FDR not ready yet, waiting 2 seconds..."
    sleep 2
done
echo "FDR is up and running at localhost:8080/health"


# --------------  Generate docs and insert into MinIO via FDR --------------

echo "running fern generate --docs"

FERN_SELF_HOSTED=true FERN_TOKEN=dummy OVERRIDE_FDR_ORIGIN=http://localhost:8080  FERN_NO_VERSION_REDIRECTION=true fern generate --docs

echo " docs generated successfully"

# --------------  Finish generate docs --------------

# --------------  Start nextapp --------------

echo "Waiting for docs to start at localhost:3000..."

cd /nextapp/packages/fern-docs/bundle
HOSTNAME="0.0.0.0" \
PORT=3000 \
NEXT_PUBLIC_FDR_ORIGIN_PORT=8080 \
NEXT_PUBLIC_FDR_ORIGIN="http://localhost:8080" \
NEXT_PUBLIC_FILES_ORIGIN="http://${NEXT_PUBLIC_DOCS_DOMAIN_URL}.localhost:9000" \
NEXT_PUBLIC_ASSET_HOSTING="1" \
NEXT_PUBLIC_DOCS_DOMAIN=${NEXT_PUBLIC_DOCS_DOMAIN_URL} \
NEXT_PUBLIC_IS_SELF_HOSTED=1 \
NEXT_DISABLE_CACHE=1 \
NEXT_PUBLIC_MEILISEARCH_ORIGIN="http://localhost:7700" \
NEXT_PUBLIC_MEILISEARCH_API_KEY="fern123!" \
node server.js & docs_pid=$!
if [ $? -ne 0 ]; then
    echo "Warning: Failed to start docs server (server.js), continuing anyway."
else
    echo "docs_pid: $docs_pid"
fi

# --------------  Finish nextapp --------------

echo "Calling /api/fern-docs/search/v2/reindex/meilisearch route..."
until curl -f -X GET http://localhost:3000/api/fern-docs/search/v2/reindex/meilisearch; do
    echo "Reindex route not ready yet, retrying in 2 seconds..."
    sleep 2
done
echo "Successfully called /api/fern-docs/search/v2/reindex/meilisearch"

echo "All services started. Tailing logs to keep the container running."
tail -f /dev/null