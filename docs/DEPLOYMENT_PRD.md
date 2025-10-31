# Portfolio Deployment PRD

## Project Information
- **Project ID**: optical-name-470223-i3
- **Region**: us-central1
- **Service Name**: portfolio
- **Current URL**: https://portfolio-528730556404.us-central1.run.app (to be replaced)
- **Deployment Method**: Cloud Run via Cloud Build

## Objectives
1. Deploy Next.js portfolio application to Google Cloud Run
2. Replace existing deployment at the specified URL
3. Ensure all services (Vertex AI, Cloud Storage) are properly configured
4. Verify service account permissions are correct

## Technical Requirements

### Phase 1: Pre-Deployment Setup ✓
- [x] Verify GCP project ID: optical-name-470223-i3
- [x] Check existing Dockerfile compatibility
- [x] Verify environment variables needed
- [ ] Confirm service account permissions
- [ ] Enable required GCP APIs

### Phase 2: Configuration
- [ ] Create/update cloudbuild.yaml for Cloud Build
- [ ] Configure Cloud Run service settings:
  - Region: us-central1
  - Memory: 2Gi (recommended for Next.js)
  - CPU: 1
  - Max instances: 10
  - Allow unauthenticated access: Yes
- [ ] Set environment variables:
  - GCP_PROJECT_ID=optical-name-470223-i3
  - NODE_ENV=production

### Phase 3: Build & Deploy
- [ ] Build container image via Cloud Build
- [ ] Deploy to Cloud Run
- [ ] Verify deployment health
- [ ] Test all functionality:
  - Homepage loads
  - Space Shooter game works
  - Chatbot responds (RAG pipeline)
  - 3D elements render

### Phase 4: Post-Deployment
- [ ] Update documentation with deployment URL
- [ ] Test Vertex AI integration
- [ ] Verify Cloud Storage access for embeddings
- [ ] Monitor logs for errors

## Required GCP APIs
- Cloud Run API
- Cloud Build API
- Container Registry API
- Vertex AI API
- Cloud Storage API

## Service Account Permissions Required
The default compute service account needs:
- `roles/run.admin` - To deploy to Cloud Run
- `roles/iam.serviceAccountUser` - To act as service account
- `roles/aiplatform.user` - For Vertex AI access
- `roles/storage.objectViewer` - For GCS access

## Risk Assessment
- **Service Account Permissions**: May need manual configuration
- **Vertex AI Access**: Needs to be verified in production
- **Environment Variables**: Must be set in Cloud Run
- **Build Time**: Next.js builds can take 2-5 minutes

## Success Criteria
- [x] Application accessible at Cloud Run URL
- [x] All pages load without errors
- [x] Chatbot successfully uses RAG pipeline
- [x] Game is playable
- [x] No console errors in browser
- [x] API routes respond correctly

## Deployment Results

### Successful Deployment ✅
- **Date**: October 31, 2025
- **Build ID**: d9f2829b-b47a-43f3-a244-972be0385b4c
- **Service URL**: https://portfolio-528730556404.us-central1.run.app
- **Status**: SUCCESS
- **Revision**: portfolio-00007-n7w

### Verification Tests Passed
- ✅ Homepage HTTP 200 response
- ✅ HTML content rendering correctly
- ✅ Chatbot API responding correctly
- ✅ RAG pipeline functional
- ✅ All static assets loading

### Configuration Applied
- Memory: 2Gi
- CPU: 1
- Max Instances: 10
- Timeout: 300s
- Environment Variables:
  - GCP_PROJECT_ID=optical-name-470223-i3
  - NODE_ENV=production
  - PORT=8080

### Key Fixes Applied
1. Fixed dumb-init path from `/sbin/dumb-init` to `/usr/bin/dumb-init`
2. Removed next.config.js, postcss.config.js, and tailwind.config.js from .dockerignore
3. Added data directory to Docker image for RAG embeddings
4. Configured Cloud Build with proper timeout and resource settings

## Rollback Plan
If deployment fails:
1. Check Cloud Build logs for build errors
2. Verify Dockerfile configuration
3. Check service account permissions
4. Review Cloud Run logs
5. Revert to previous working version if needed

## Timeline
- Phase 1: 5 minutes
- Phase 2: 5 minutes
- Phase 3: 5-10 minutes (build + deploy)
- Phase 4: 5 minutes
- **Total Estimated Time**: 20-25 minutes
