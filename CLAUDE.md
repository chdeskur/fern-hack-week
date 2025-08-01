# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development Commands

- `pnpm build` - Build all packages using Turbo
- `pnpm compile` - Compile TypeScript across all packages
- `pnpm test` - Run tests with CI=true flag
- `pnpm test:update` - Update test snapshots
- `pnpm lint` - Run ESLint, style linting, and format checking
- `pnpm lint:fix` - Fix all linting and formatting issues
- `pnpm format` - Format code with Prettier

### Fern-Specific Commands

- `pnpm fern check` - Validate API definitions (all Fern commands must be prefixed with pnpm)
- `pnpm fdr:generate` - Generate FDR SDK locally
- `pnpm fai:generate` - Generate FAI SDK in preview mode
- `pnpm upgrade fern-api` - Update Fern dependency

### Documentation Commands

- `pnpm docs:dev` - Start docs development server
- `pnpm docs:build` - Build documentation
- `pnpm docs:local-bundle:build` - Build local documentation bundle
- `pnpm docs:self-hosted-bundle:build` - Build self-hosted documentation bundle

### Testing Commands

- Individual package tests: Use `turbo test --filter=<package-name>`
- End-to-end tests: Available in servers/fdr with separate vitest configs for local and e2e tests

## Architecture

### Repository Structure

This is a monorepo managing Fern's documentation platform with the following key areas:

- **fern/apis/** - API definitions for all services (fai, fdr, fern-docs, generator-cli, proxy, vercel)
- **packages/** - Shared packages and libraries
- **servers/** - Backend services
  - **fdr/** - Fern Definition Registry (Node.js/Express, main docs backend)
  - **fai/** - AI service (Python/FastAPI)
  - **fern-bot/** - GitHub automation bot (Serverless)
  - **mdx-bundler/** - MDX processing service
  - **self-hosted/** - Self-hosted documentation solution
- **tests/** - Test configurations and examples

### Key Services

#### FDR (Fern Definition Registry)

- Main backend for Fern's docs product
- Node.js Express server hosted on ECS
- Provides API for storing/retrieving API definitions and docs
- Auto-deploys to dev on main branch changes
- Production releases via "fdr@<tag>" git tags
- Uses Prisma for database management with PostgreSQL
- API definition at fern/apis/fdr/

#### FAI (Fern AI)

- Python FastAPI service for AI-powered features
- Uses Poetry for dependency management
- Located in servers/fai/

### Package Management

- Uses pnpm workspaces with Turborepo for build orchestration
- All packages use TypeScript with shared configurations
- Packages are organized by domain (commons/, fern-docs/, etc.)

### Documentation Platform

- Multi-tenant documentation hosting
- Supports both cloud-hosted and self-hosted deployments
- MDX-based content with custom bundling
- Integrated search with AI-powered features

### Development Workflow

- All API definitions must be defined in Fern format
- Changes to FDR auto-deploy to dev environment
- Production releases require git tags with specific formats
- Use Turbo for efficient builds and caching across the monorepo
