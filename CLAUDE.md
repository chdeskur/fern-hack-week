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

## Refactors

### 31 July 2025

Prompt

Rethink the design the ChatAgent and ChatInterface architecture. Goals:

- ChatAgent should own as much of the core logic and complexity as possible: conditions,
  loops, retries, etc
- ChatAgent should provide mechanisms for ChatInterface to hook into e.g. callback for
  streaming text, etc
- ChatAgent should return an object that describes the state of its response, including the
  message and outcome status. Then ChatInterface can just read that object to perform some
  simple operation e.g. render messages, call router.push, sendRequest
- ChatAgent should really own all of the messages update logic, then the interface can call
  methods to update and subscribe to changes

Come up with a plan based on the goals, then break down the refactor into steps.

Current Issues

1. Complex state management split between ChatAgent and ChatInterface - The interface
   manages multiple state variables (messages, isLoading, isStreaming, pendingResponse, etc.)
2. Logic scattered across components - Navigation, consent, parameter extraction, and
   response processing logic is mixed between ChatAgent and ChatInterface
3. Direct state manipulation - ChatInterface directly manipulates ChatAgent.messages array
4. Complex async coordination - Multiple useEffects and refs to coordinate streaming,
   responses, and navigation

New Architecture Design

ChatAgent should own:

- All message state and updates
- All business logic (conditions, loops, retries)
- State machine for conversation flow
- Event system for UI callbacks
- Complete response processing pipeline

ChatInterface should:

- Subscribe to ChatAgent state changes
- Render UI based on ChatAgent state
- Forward user inputs to ChatAgent
- Execute simple UI actions based on ChatAgent instructions

Proposed ChatAgent State Object

```
interface ChatAgentState {
messages: ChatMessage[]
status: 'idle' | 'processing' | 'streaming' | 'waiting_consent' | 'waiting_response'
currentStreamingMessage?: ChatMessage
pendingAction?: {
type: 'navigate' | 'send_request' | 'parameter_input'
data: any
}
sequence: string[]
errors: string[]
}
```

Step-by-Step Refactor Plan:

1. Add state management system to ChatAgent - Implement internal state object and getter
   methods
2. Add event system for UI callbacks - Create EventEmitter-like system for ChatInterface to
   subscribe to changes
3. Move message management logic into ChatAgent - Consolidate all message CRUD operations
4. Move consent and navigation logic into ChatAgent - Handle consent requests and
   navigation decisions internally
5. Move response processing logic into ChatAgent - Centralize API response handling and
   summary generation
6. Simplify ChatInterface to use ChatAgent state and callbacks - Remove complex state
   management from UI
7. Update ChatInterface to subscribe to ChatAgent state changes - Use subscription pattern
   for reactive updates
8. Test the refactored architecture - Ensure functionality is preserved

Key Benefits:

- Single source of truth - ChatAgent owns all conversation state
- Simplified UI logic - ChatInterface becomes a thin presentation layer
- Better testability - Business logic concentrated in ChatAgent
- Cleaner separation of concerns - UI vs business logic clearly separated
- Easier maintenance - Complex async flows handled in one place

The refactor will maintain backward compatibility while significantly reducing complexity
in the ChatInterface and making the system more maintainable and testable.

...

The ChatAgent and ChatInterface architecture refactoring is now complete! Here's what was
accomplished:

✅ Architecture Goals Achieved

1. ChatAgent owns core logic and complexity:

- ✅ All conditions, loops, retries now handled by ChatAgent
- ✅ Centralized state management with ChatAgentState interface
- ✅ Complex message processing, consent handling, and navigation logic moved to ChatAgent

2. ChatAgent provides hooks for ChatInterface:

- ✅ Event-driven architecture with ChatAgentEvent system
- ✅ Callbacks for streaming text and state changes
- ✅ Clean subscription mechanism with on() and off() methods

3. ChatAgent returns objects describing response state:

- ✅ ChatAgentState provides complete state information
- ✅ Includes messages, status, current streaming message, pending actions
- ✅ ChatInterface simply reads state to perform UI operations

4. ChatAgent owns all message update logic:

- ✅ addMessage(), startStreaming(), updateStreamingMessage(), finishStreaming() methods
- ✅ ChatInterface subscribes to changes and updates UI reactively
- ✅ No direct message manipulation in ChatInterface

🏗️ Key Implementation Details

ChatAgent.ts:

- Added comprehensive state management system
- Implemented event-driven architecture for UI communication
- Centralized all business logic (consent, navigation, response processing)
- Clean separation of concerns between logic and presentation

ChatInterface.tsx:

- Transformed into a thin presentation layer
- Simplified state management using ChatAgent subscriptions
- Reactive UI updates through event system
- All complex logic delegated to ChatAgent

PlaygroundLogger.ts:

- Extracted into separate module for better organization
- Provides structured logging for debugging ChatAgent integration

🎯 Result

The refactored architecture successfully:

- Reduced complexity in ChatInterface from 849 lines to clean, simple presentation logic
- Centralized business logic in ChatAgent for better maintainability
- Improved testability with clear separation of concerns
- Enhanced code organization with event-driven communication
- Maintains functionality while dramatically simplifying the codebase

The ChatInterface is now a true thin presentation layer that simply subscribes to ChatAgent
state and renders UI, while ChatAgent handles all the complex business logic, state
management, and coordination.
