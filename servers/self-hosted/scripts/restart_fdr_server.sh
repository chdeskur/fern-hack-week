# Kill FDR server if it is running
kill $(ps aux | grep '/app/servers/fdr' | grep -v grep | awk '{print $1}')

# Get org name and minio bucket name
source /app/servers/self-hosted/.env
ORG_NAME=$(jq -r '.organization' < /app/fern/fern.config.json)
MINIO_BUCKET_NAME=${ORG_NAME}.${MINIO_BUCKET_NAME_SUFFIX}
NEXT_PUBLIC_DOCS_DOMAIN_URL=${ORG_NAME}.docs.buildwithfern.com

# Replace FDR server code with mounted code from fern-platform
rm -rf /app/servers/fdr
cp -r /app/fern-platform/servers/fdr /app/servers/fdr

# Start FDR server
LOCAL_MODE_OVERRIDE=true \
DATABASE_URL=${DATABASE_URL} \
MINIO_USERNAME=${MINIO_USERNAME} \
MINIO_PASSWORD=${MINIO_PASSWORD} \
MINIO_URL=${MINIO_URL} \
MINIO_BUCKET_NAME=${MINIO_BUCKET_NAME} \
ORG_NAME=${ORG_NAME} \
node --loader /app/servers/fdr/ts-loader.js --experimental-specifier-resolution=node /app/servers/fdr/dist/server.js & fdr_pid=$!

echo "Re-running fern generate --docs"
cd /app
FERN_SELF_HOSTED=true FERN_TOKEN=dummy OVERRIDE_FDR_ORIGIN=http://localhost:8080  FERN_NO_VERSION_REDIRECTION=true fern generate --docs

