FROM node:20.18-alpine3.20

# Install dependencies
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@v9.4.0

# Create and set permissions for /tmp directory
RUN mkdir -p /tmp && chmod 777 /tmp

WORKDIR /app

# Copy the entire monorepo structure
COPY . .

# Install dependencies
RUN pnpm install

# Build workspace dependencies first
RUN pnpm --filter @fern-docs/mdx compile

# Build the main package
RUN pnpm --filter @fern-platform/mdx-bundler bundler:build

EXPOSE 8080

CMD ["pnpm", "--filter", "@fern-platform/mdx-bundler", "bundler:start"]
