# Fern Self-Hosting

This repo contains a Dockerfile for self-hosting Fern's docs product. This project is a TypeScript monorepo that uses [pnpm](https://pnpm.io/). We've created a Dockerfile that can be used for self-hosting.

## Getting Started

### Pre-requisites

- Make sure Node.js 18+ and pnpm are installed on your machine
- Have Docker installed and have the daemon open on your machine

## Building the Docker Image:

To build the image from this directory:

1. execute the bash script from your terminal `sh create_self_hosted_docker.sh`
2. run the resulting image in a container `docker run fern-self-hosted:latest`

To enter a shell inside the container:

- use the variable `RUN_MODE=shell` like follows
  `docker run -it -e RUN_MODE=shell fern-self-hosted`

## Testing

To run the test suite from this directory:
`pnpm test:self-hosted`
