#!/usr/bin/env bash

set -e

TAG="$1"
DOCKER_NAME=mdx-bundler:"$TAG"

PACKAGE_DIR="$(pwd)"
DOCKER_DIR="$PACKAGE_DIR"

docker build \
  -f "$DOCKER_DIR/Dockerfile" \
  -t "$DOCKER_NAME" "$DOCKER_DIR/../.."

# Create the tar directory if it doesn't exist
TAR_DIR="$DOCKER_DIR/../../docker/build/tar"
mkdir -p "$TAR_DIR"

docker save "$DOCKER_NAME" -o "$TAR_DIR/$DOCKER_NAME.tar"

echo
echo "Built docker: $DOCKER_NAME"
echo "To run image: docker run $DOCKER_NAME"
echo
