# GitHub Integration Guide

## Overview

The portfolio now fetches live GitHub repository statistics and displays them on project cards. This includes stars, forks, and primary language information.

## What Was Implemented

### 1. GitHub API Service (`lib/github.ts`)
- Fetches repository data from GitHub REST API
- Supports both GitHub URLs and `owner/repo` format
- Optional Personal Access Token support for higher rate limits
- Type-safe interfaces for GitHub data

### 2. API Endpoint (`pages/api/github/repo.ts`)
- Server-side endpoint at `/api/github/repo`
- Caches responses for 5 minutes to avoid rate limiting
- Handles errors gracefully
- Example: `/api/github/repo?repo=crcrist/customgpt-actions-test`

### 3. Enhanced ProjectCard Component
- Automatically fetches GitHub stats when `githubRepo` prop is provided
- Displays:
  - ⭐ Star count
  - 🍴 Fork count
  - 💻 Primary language (as badge)
- Smooth loading states
- Falls back gracefully if API fails

### 4. Updated Projects Data
- Added `githubRepo` field to project objects
- Example: `"crcrist/customgpt-actions-test"`
- Maintains backward compatibility with existing projects

## How to Add GitHub Repos to Your Projects

Edit `components/sections/Projects.tsx` and add these fields to any project:

```typescript
{
  title: "Your Project Name",
  description: "Project description...",
  tags: ["Tag1", "Tag2"],

  // Add these two fields:
  githubUrl: "https://github.com/crcrist/your-repo",
  githubRepo: "crcrist/your-repo",  // ← This triggers stats fetching
}
```

## Current Integration

Currently integrated:
- **CustomGPT Actions Test** → `crcrist/customgpt-actions-test`

## Optional: GitHub Personal Access Token

To avoid rate limiting (60 requests/hour → 5000 requests/hour), add to `.env.local`:

```bash
GITHUB_TOKEN=your_github_token_here
```

Generate a token at: https://github.com/settings/tokens

**Required permissions**: None (public read-only access)

## Testing

Build successful with no errors:
```bash
npm run build
✓ Compiled successfully
```

API endpoint tested and working with live GitHub data.

## Features

- ✅ Live GitHub stats (stars, forks, language)
- ✅ Automatic caching (5 minutes)
- ✅ Error handling and fallbacks
- ✅ Type-safe TypeScript implementation
- ✅ Server-side rendering compatible
- ✅ Responsive design integration
- ✅ Rate limit protection

## Next Steps

To add more of your GitHub repos:
1. Get the repo name from GitHub (e.g., `crcrist/budget-blaster`)
2. Add `githubRepo` field to the project in `Projects.tsx`
3. Stats will automatically appear on the project card!
