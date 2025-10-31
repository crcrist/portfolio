# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js portfolio website with an arcade/retro gaming theme featuring a Space Shooter game, interactive 3D elements using Three.js, and a RAG-powered chatbot using Google Cloud Vertex AI (Gemini 2.5).

## Development Commands

### Running the Development Server
```bash
npm run dev
```
Development server runs on http://localhost:3000

### Building for Production
```bash
npm run build
```

### Running Production Build
```bash
npm start
```

## Architecture

### Technology Stack
- **Framework**: Next.js 15 (Pages Router)
- **Styling**: Tailwind CSS with custom arcade-themed design
- **3D Graphics**: Three.js via @react-three/fiber and @react-three/drei
- **Animations**: Framer Motion
- **Particles**: @tsparticles
- **Backend**: Next.js API Routes
- **AI/ML**: Google Cloud Vertex AI (Gemini models + text-embedding-005)
- **Vector Store**: Custom in-memory JSON-based vector store

### Project Structure

```
portfolio/
├── pages/
│   ├── _app.tsx              # App wrapper
│   ├── index.tsx             # Main portfolio page with all sections
│   └── api/                  # API routes
│       ├── chat.ts           # RAG chatbot endpoint (Gemini 2.5 Flash)
│       ├── embed.ts          # Build vector embeddings from GCS
│       ├── retrieve.ts       # Retrieve relevant context
│       └── context.ts        # Additional context endpoint
├── components/
│   ├── ArcadeCabinet.tsx     # Main hero arcade machine component
│   ├── SpaceShooterGame.tsx  # Playable space shooter game
│   ├── Chatbot.tsx           # "Player 2" chatbot UI
│   ├── ProjectCard.tsx       # Arcade-style project cards
│   ├── Navbar.tsx            # Navigation with credits display
│   ├── HeroCanvas.tsx        # 3D Three.js scene
│   ├── ServerRackHero.tsx    # 3D server rack visualization
│   ├── CRTMonitor.tsx        # CRT monitor effect component
│   └── PlaygroundParticles.tsx # Particle effects
├── lib/
│   └── rag/
│       ├── embedText.ts      # Vertex AI text embedding utilities
│       ├── vectorStore.ts    # JSON-based vector database
│       ├── retrieve.ts       # Semantic search implementation
│       └── fetchGCS.ts       # Google Cloud Storage file fetching
├── data/
│   └── embeddings.json       # Local vector store (embeddings + metadata)
└── styles/
    └── globals.css           # Global styles with Tailwind directives
```

### Key Architectural Patterns

#### RAG (Retrieval-Augmented Generation) System
The chatbot uses a custom RAG pipeline:
1. **Embedding Generation** (`pages/api/embed.ts`): Fetches resume/project data from GCS, chunks text, generates embeddings via Vertex AI text-embedding-005, stores in `data/embeddings.json`
2. **Retrieval** (`lib/rag/retrieve.ts`): Queries are embedded and matched against stored vectors using cosine similarity
3. **Generation** (`pages/api/chat.ts`): Top-k retrieved chunks are injected as context into Gemini 2.5 Flash prompts

The vector store is a simple JSON file (`data/embeddings.json`) that stores:
- `id`: Unique identifier
- `source`: Source reference (e.g., "resume.txt#0", "projects.json#2")
- `text`: Original text chunk
- `embedding`: 768-dimensional vector from text-embedding-005

#### Component State Management
- **Credits System**: Managed at top level in `pages/index.tsx`, passed down to `Navbar` and `ArcadeCabinet`
- **Game State**: Controlled by `ArcadeCabinet`, which toggles between attract mode and `SpaceShooterGame`
- **Chatbot**: Independent floating component with its own message state

#### Styling Approach
Heavy use of inline styles for arcade effects (neon glows, scanlines, CRT effects) combined with Tailwind utility classes. Color scheme: cyan (#00ffff), fuchsia/magenta (#ff00ff), yellow (#ffff00) for that classic arcade aesthetic.

## Google Cloud Configuration

This project requires Google Cloud Platform credentials:

### Required Environment Variables
```bash
GCP_PROJECT_ID=your-project-id
```

### Authentication
The application uses Google Cloud Application Default Credentials (ADC). Ensure you have authenticated via:
```bash
gcloud auth application-default login
```

### Required GCP Services
- **Vertex AI API**: For Gemini models and text embeddings
- **Cloud Storage**: For storing resume/project data (referenced in embed.ts)

### Embedding Pipeline
To rebuild the vector store from GCS data:
```bash
curl -X POST http://localhost:3000/api/embed
```
This endpoint should be protected in production.

## Component Dependencies

### ArcadeCabinet Component
- Manages game credits and state
- Contains SpaceShooterGame component
- Shows attract mode when inactive
- Stores high score in localStorage

### Chatbot Component
- Fixed position "Player 2" button in bottom-right
- Calls `/api/chat` endpoint for RAG responses
- Arcade-themed chat UI with scanlines and neon borders

### SpaceShooterGame
- Canvas-based space shooter implementation
- Arrow keys for movement, spacebar to fire
- Game over triggers callback to return to attract mode

## Development Notes

### TypeScript Configuration
- Strict mode is disabled (`"strict": false`)
- ES2017 target
- No linting/testing configured

### Styling System
- Tailwind CSS configured via `tailwind.config.js` and `postcss.config.js`
- Heavy use of custom shadows, gradients, and animations for arcade effects
- Monospace font (`monospace`) and Impact font for arcade feel

### State Persistence
- High scores stored in browser localStorage
- Vector embeddings persisted in `data/embeddings.json`

## API Endpoints

### POST /api/chat
Chatbot endpoint that uses RAG to answer questions about Connor's portfolio.
- **Input**: `{ message: string }`
- **Output**: `{ output: string }` (Gemini response)
- **Model**: gemini-2.5-flash

### POST /api/embed
Builds/refreshes vector embeddings from GCS files (dev-only, should be protected).
- **Input**: None
- **Output**: `{ status: "ok", chunks: number, sources: {...} }`

### GET/POST /api/retrieve
Retrieves relevant chunks for a query.

### GET/POST /api/context
Additional context endpoint (implementation not shown).

## Theme & Design System

The portfolio uses an 80s/90s arcade aesthetic:
- **Colors**: Cyan, fuchsia/magenta, yellow (neon)
- **Effects**: CRT scanlines, glow shadows, pulsing animations
- **Typography**: Impact for headers, monospace for body
- **Layout**: Arcade cabinet as hero, game selection grid for projects, CRT-style sections

## Current State (Git Status)

Modified files on branch `new-theme`:
- components/Chatbot.tsx
- components/Navbar.tsx
- components/ProjectCard.tsx
- pages/index.tsx
- styles/globals.css

New files:
- components/ArcadeCabinet.tsx
- components/SpaceShooterGame.tsx
