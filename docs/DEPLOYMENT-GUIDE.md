# 🚀 Deployment Guide

## Quick Start

Your enhanced arcade portfolio is now ready to deploy! Here's how to get it live.

## 🏗️ Build Status

✅ **BUILD SUCCESSFUL**
- All TypeScript types validated
- Production build optimized
- Bundle sizes optimized
- No compilation errors

## 📦 What Was Built

### Bundle Sizes
- Main page: 18.1 kB (162 kB First Load JS)
- Shared chunks: 151 kB
- **Total First Load: ~162 kB** (excellent performance!)

### Routes
- `/` - Main portfolio page (static)
- `/api/chat` - RAG chatbot endpoint
- `/api/embed` - Embedding generation
- `/api/retrieve` - Context retrieval
- `/api/context` - Additional context

## 🎯 Next Steps

### 1. Add Sound Files (Optional)

For full audio experience, add these files to `/public/sounds/`:
- `coin.mp3` - Coin insertion sound
- `button.mp3` - Button click sound
- `laser.mp3` - Laser shoot sound
- `explosion.mp3` - Explosion sound
- `achievement.mp3` - Achievement unlock
- `level-up.mp3` - Level up sound
- `game-over.mp3` - Game over sound
- `menu-select.mp3` - Menu navigation
- `powerup.mp3` - Power-up sound

**Where to find arcade sounds:**
- https://freesound.org/ (search "arcade")
- https://opengameart.org/
- https://mixkit.co/free-sound-effects/arcade/
- https://www.zapsplat.com/ (free with attribution)

### 2. Update Personal Information

Edit `pages/index.tsx` to update:
- Your name (line ~149: "CONNOR CRIST")
- Contact links (lines ~304-306)
- Email, LinkedIn, GitHub URLs
- Project descriptions
- Tech stack items

Edit `components/SEOHead.tsx` to update:
- Portfolio title
- Description
- Keywords
- Social media links
- Domain URL

### 3. Create Favicon

Create a favicon for your portfolio:
1. Use a tool like https://favicon.io/ or https://realfavicongenerator.net/
2. Generate arcade-themed favicon (maybe a joystick or pixel art)
3. Place files in `/public/`:
   - `favicon.ico`
   - `apple-touch-icon.png`
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`

### 4. Create OG Image

Create Open Graph image for social media previews:
1. Create 1200x630 px image showcasing your portfolio
2. Include your name and "Portfolio" text
3. Use arcade aesthetic (neon colors, retro style)
4. Save as `/public/og-image.png`

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Easiest deployment for Next.js:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to Vercel account
# - Choose project name
# - Configure settings (defaults are fine)
```

**OR use Vercel Dashboard:**
1. Go to https://vercel.com/
2. Click "Add New" → "Project"
3. Import your Git repository
4. Vercel auto-detects Next.js
5. Click "Deploy"

**Environment Variables on Vercel:**
Add in Project Settings → Environment Variables:
- `GCP_PROJECT_ID` - Your Google Cloud project ID

### Option 2: Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
GCP_PROJECT_ID=your-project-id
```

### Option 3: Docker

```bash
# Build Docker image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 -e GCP_PROJECT_ID=your-project portfolio
```

### Option 4: Self-Hosted

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm i -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

## 🔐 Environment Setup

### Google Cloud Configuration

Your portfolio uses Google Cloud Vertex AI for the chatbot. Setup:

1. **Create Google Cloud Project** (if not done):
   - Go to https://console.cloud.google.com/
   - Create new project or use existing
   - Note the Project ID

2. **Enable Required APIs**:
   ```bash
   gcloud services enable aiplatform.googleapis.com
   gcloud services enable storage.googleapis.com
   ```

3. **Authentication** (choose one):

   **Option A: Service Account (Production)**
   ```bash
   # Create service account
   gcloud iam service-accounts create portfolio-bot

   # Grant permissions
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:portfolio-bot@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/aiplatform.user"

   # Create key
   gcloud iam service-accounts keys create key.json \
     --iam-account=portfolio-bot@YOUR_PROJECT_ID.iam.gserviceaccount.com

   # Set environment variable
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"
   ```

   **Option B: Application Default Credentials (Development)**
   ```bash
   gcloud auth application-default login
   ```

4. **Set Environment Variable**:
   ```bash
   export GCP_PROJECT_ID=your-project-id
   ```

## 📊 Performance Optimization

### Lighthouse Targets
Current build should achieve:
- ✅ Performance: > 90
- ✅ Accessibility: > 95
- ✅ Best Practices: > 95
- ✅ SEO: > 95

### Further Optimizations

If you want even better performance:

1. **Image Optimization**:
   - Use `next/image` for all images
   - Add `priority` prop to hero image
   - Use WebP format

2. **Font Optimization**:
   ```tsx
   import { Inter } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'] })
   ```

3. **Code Splitting**:
   ```tsx
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Loader />,
     ssr: false
   })
   ```

4. **Service Worker** (optional):
   - Add next-pwa for offline support
   - Cache static assets
   - Enable PWA features

## 🧪 Testing Before Deployment

```bash
# Run development server
npm run dev

# Test in browser
open http://localhost:3000

# Test features:
# ✓ Arcade loader animation
# ✓ Custom cursor (desktop only)
# ✓ Matrix rain background
# ✓ Scroll animations
# ✓ Space Shooter game
# ✓ Achievement system (click trophy icon)
# ✓ Audio controls (click speaker icon)
# ✓ Konami code: ↑↑↓↓←→←→BA
# ✓ Chatbot (click "Player 2")
# ✓ Mobile responsiveness (use DevTools)

# Run production build locally
npm run build
npm start
```

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Audio Doesn't Work
- Audio requires user interaction to start (browser policy)
- Click anywhere to activate audio context
- Ensure sound files exist in `/public/sounds/`

### Chatbot Errors
- Check `GCP_PROJECT_ID` environment variable
- Verify Google Cloud authentication
- Check API quotas in GCP Console

### Achievements Not Saving
- Check browser LocalStorage isn't disabled
- Clear LocalStorage if corrupted:
  ```js
  localStorage.clear()
  ```

## 📱 Mobile Testing

Test on real devices or use:
- Chrome DevTools device emulation
- BrowserStack
- Responsively App

**Check:**
- Touch interactions work
- Virtual joystick appears on mobile
- Custom cursor hidden on touch devices
- Matrix rain performs well
- Layout responsive at all breakpoints

## 🎨 Customization After Deployment

### Change Colors
Edit Tailwind config or inline styles:
- Cyan: `#00ffff` → Your color
- Fuchsia: `#ff00ff` → Your color
- Yellow: `#ffff00` → Your color

### Add More Achievements
Edit `lib/achievements/achievementManager.ts`:
```tsx
{
  id: "custom-achievement",
  name: "Your Achievement",
  description: "Do something cool",
  icon: "🎮",
  rarity: "epic",
  points: 75,
  unlocked: false,
}
```

### Modify Matrix Rain
Edit `components/effects/MatrixRain.tsx`:
- Change characters
- Adjust speed
- Modify colors

## 📈 Analytics (Optional)

Add analytics to track portfolio views:

**Google Analytics:**
```tsx
// pages/_app.tsx
import Script from 'next/script'

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

**Vercel Analytics:**
```tsx
import { Analytics } from '@vercel/analytics/react'

<Analytics />
```

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Test all features on live site
2. ✅ Share portfolio link
3. ✅ Add to resume/LinkedIn
4. ✅ Submit to portfolio showcases
5. ✅ Get feedback and iterate

## 🆘 Support

If you run into issues:
- Check Next.js docs: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- Google Cloud docs: https://cloud.google.com/docs

## 🎮 Enjoy Your Sick Arcade Portfolio!

You now have a cutting-edge, interactive portfolio with:
- ✨ Custom cursor with neon trails
- 🌧️ Matrix rain background
- 🎰 Retro arcade loader
- 🏆 15 achievements to unlock
- 🎵 Full audio system
- 🎯 Konami code easter egg
- 📱 Mobile virtual controls
- 🔍 SEO optimized
- ⚡ Lightning fast performance

**GO MAKE IT LIVE AND SHOW THE WORLD!** 🚀
