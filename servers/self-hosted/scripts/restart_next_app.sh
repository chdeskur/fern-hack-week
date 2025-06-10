#!/bin/bash

# Kill next-server
kill $(ps aux | grep 'next-server' | grep -v grep | awk '{print $1}')

# Remove existing nextapp directory
rm -rf /app/nextapp

# Recreate nextapp directory and extract bundle
mkdir -p /app/nextapp
tar -xzf /app/fern-platform/docs_bundle.tar.gz -C /app/nextapp

# Install esbuild because its not included in the bundle
cd /app/nextapp && \
    pnpm add esbuild

# Change to the bundle directory and start the Next.js app
cd /app/nextapp/packages/fern-docs/bundle
HOSTNAME="0.0.0.0" \
PORT=3000 \
NEXT_PUBLIC_FDR_ORIGIN_PORT=8080 \
NEXT_PUBLIC_FDR_ORIGIN="http://localhost:8080" \
NEXT_PUBLIC_DOCS_DOMAIN=example-org.docs.buildwithfern.com \
NEXT_PUBLIC_IS_SELF_HOSTED=1 \
NEXT_DISABLE_CACHE=1 \
NODE_PATH=/app/nextapp/.next/standalone/packages/fern-docs/bundle \
node server.js & docs_pid=$!
echo "docs_pid: $docs_pid"