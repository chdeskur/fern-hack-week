set -e

echo "Building self-hosted docker image"

NAME="${1:-fern-self-hosted}"
TAG="${2:-latest}"
DOCKER_NAME="${NAME}:${TAG}"

PACKAGE_DIR="$(pwd)"
DOCKER_DIR="$PACKAGE_DIR"

docker build \
  -f "$DOCKER_DIR/Dockerfile.self_hosted" \
  -t "$DOCKER_NAME" "$DOCKER_DIR/../.."

echo
echo "Built docker: $DOCKER_NAME"
echo "To run image: docker run $DOCKER_NAME"
echo
