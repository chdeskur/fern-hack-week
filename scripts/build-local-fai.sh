#!/usr/bin/env bash

set -e

cd servers/fai

docker build -t fai-local .
