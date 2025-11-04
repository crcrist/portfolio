# Portfolio - Project Overview

## Current Design & Theme

**Design System**: Modern glassmorphism with animated lava lamp background effects
**Color Palette**: Crimson/Ruby dramatic red tones
**Visual Style**: Clean, elegant, professional with subtle depth and layering

### Key Visual Elements
- **Background**: Dark gradient (`#0f0a0e` → `#1a1014` → `#2a1420`)
- **Animated Effects**: Lava lamp orbs with organic multi-directional movement
- **Glass Surfaces**: Frosted glass cards with backdrop blur and subtle borders
- **Accent Colors**:
  - Crimson: `#c41e3a`, `#a0141e`, `#7a0c1a`
  - Ruby: `#d32f2f`, `#b71c1c`, `#8b0000`

## Technology Stack

### Framework & Core
- **Next.js 15** (Pages Router)
- **React 19**
- **TypeScript** (ES2017 target, strict mode disabled)

### Styling & UI
- **Tailwind CSS** - Utility-first styling with custom theme
- **Framer Motion** - Smooth animations and transitions
- **Glassmorphism** - Modern glass effect UI design
- **Custom Animations** - Lava lamp keyframes, float effects

### 3D Graphics & Effects
- **Three.js** - 3D rendering engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **@react-three/postprocessing** - Post-processing effects
- **@tsparticles** - Particle system effects

### AI & Backend
- **Google Cloud Vertex AI** - Gemini 2.5 Flash for chatbot
- **text-embedding-005** - Vector embeddings for RAG
- **Next.js API Routes** - Backend endpoints
- **Custom Vector Store** - JSON-based semantic search

### Typography
- **Sans**: Inter, system-ui
- **Display**: Poppins, Inter
- **Mono**: JetBrains Mono

## Features

### Core Sections
1. **Hero** - Glassmorphism introduction with lava lamp background
2. **About** - Professional background and skills
3. **Projects** - Portfolio showcase with glass cards
4. **Contact** - Contact form and information
5. **Footer** - Links and copyright

### Interactive Elements
- **GlassChatbot** - RAG-powered AI assistant using Vertex AI Gemini
- **Smooth Scrolling** - Fluid navigation between sections
- **Hover Effects** - Interactive glass surfaces
- **Animated Background** - Lava lamp orbs with multi-directional movement

### RAG (Retrieval-Augmented Generation) System
- **Embedding Generation** - text-embedding-005 for semantic search
- **Vector Store** - `data/embeddings.json` with 768-dimensional vectors
- **Retrieval** - Cosine similarity matching for relevant context
- **Generation** - Gemini 2.5 Flash with injected context

## Architecture

```
portfolio/
├── pages/
│   ├── index.tsx              # Main page with all sections
│   └── api/                   # Backend API routes
│       ├── chat.ts            # RAG chatbot endpoint
│       ├── embed.ts           # Vector embedding generation
│       ├── retrieve.ts        # Semantic search
│       └── context.ts         # Additional context
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── glass/
│       └── GlassChatbot.tsx
├── lib/
│   └── rag/                   # RAG system utilities
├── data/
│   └── embeddings.json        # Vector database
├── styles/
│   └── globals.css           # Global styles + Tailwind
└── tailwind.config.js        # Theme configuration
```

## Deployment

### Production Environment
- **Platform**: Google Cloud Run
- **URL**: https://portfolio-528730556404.us-central1.run.app
- **Project ID**: optical-name-470223-i3
- **Region**: us-central1
- **Container**: Docker multi-stage build

### Configuration
- **Memory**: 2Gi
- **CPU**: 1 vCPU
- **Max Instances**: 10
- **Port**: 8080

### Build & Deploy
```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Deploy to Cloud Run
gcloud builds submit --config cloudbuild.yaml --project optical-name-470223-i3
```

## Authentication & APIs

### Required Environment Variables
- `GCP_PROJECT_ID` - Google Cloud project identifier

### Google Cloud Services
- **Vertex AI API** - Gemini models and embeddings
- **Cloud Storage** - Resume/project data storage (for RAG)
- **Cloud Run** - Container hosting
- **Cloud Build** - CI/CD pipeline

### Authentication
Uses Google Cloud Application Default Credentials (ADC):
```bash
gcloud auth application-default login
```

## Design History

**Previous Theme**: Arcade/retro gaming aesthetic with Space Shooter game
**Current Theme**: Modern glassmorphism with lava lamp effects (as of commit `34a70a1`)
**Transition Date**: October 2025

The portfolio evolved from an arcade-themed design with interactive games to a sophisticated, professional glassmorphism design focused on elegant presentation and smooth user experience.

## Key Notes

- No arcade or gaming elements in current design
- Focus on professional, clean, modern aesthetics
- RAG chatbot uses Gemini 2.5 Flash for intelligent responses
- Lava lamp animations provide subtle, elegant movement
- Glassmorphism creates depth through layering and blur effects
- Color palette: Crimson/Ruby (dramatic reds) on dark background
