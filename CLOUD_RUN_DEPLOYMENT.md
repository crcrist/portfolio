# Cloud Run Deployment Guide

## Project Details
- **GCP Project ID**: `optical-name-470223-i3`
- **Service**: `portfolio`
- **Region**: `us-central1`
- **Existing URL**: https://portfolio-528730556404.us-central1.run.app

## Prerequisites

1. **Google Cloud CLI** installed and configured
2. **Docker** installed (for local testing)
3. **Authentication**: Service account or user credentials with Cloud Run admin access

## Environment Variables for Cloud Run

Set these in Cloud Run service environment variables:

```
GCP_PROJECT_ID=optical-name-470223-i3
NODE_ENV=production
```

## Build and Deploy Steps

### 1. Authenticate with Google Cloud
```bash
gcloud auth login
gcloud config set project optical-name-470223-i3
```

### 2. Build Docker Image
```bash
docker build -t gcr.io/optical-name-470223-i3/portfolio:latest .
```

### 3. Push to Google Container Registry
```bash
docker push gcr.io/optical-name-470223-i3/portfolio:latest
```

### 4. Deploy to Cloud Run
```bash
gcloud run deploy portfolio \
  --image gcr.io/optical-name-470223-i3/portfolio:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars GCP_PROJECT_ID=optical-name-470223-i3,NODE_ENV=production
```

Or using `gcloud run deploy` with a service account:
```bash
gcloud run deploy portfolio \
  --image gcr.io/optical-name-470223-i3/portfolio:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --service-account [SERVICE_ACCOUNT_EMAIL] \
  --set-env-vars GCP_PROJECT_ID=optical-name-470223-i3,NODE_ENV=production
```

### 5. Verify Deployment
```bash
# Check the service status
gcloud run services list --region us-central1

# Get the service details
gcloud run services describe portfolio --region us-central1
```

## Service Account Setup

For the chatbot to work properly, ensure:

1. **Service Account** has these roles:
   - Vertex AI User
   - Cloud Storage Viewer (if using GCS for embeddings)
   - Service Account Token Creator (if needed)

2. **Create service account** (if not exists):
```bash
gcloud iam service-accounts create portfolio-service \
  --display-name "Portfolio Cloud Run Service"
```

3. **Grant roles**:
```bash
gcloud projects add-iam-policy-binding optical-name-470223-i3 \
  --member="serviceAccount:portfolio-service@optical-name-470223-i3.iam.gserviceaccount.com" \
  --role="roles/aiplatform.user"

gcloud projects add-iam-policy-binding optical-name-470223-i3 \
  --member="serviceAccount:portfolio-service@optical-name-470223-i3.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"
```

4. **Use in Cloud Run deployment**:
```bash
--service-account portfolio-service@optical-name-470223-i3.iam.gserviceaccount.com
```

## Troubleshooting

### Port Configuration
- Cloud Run expects the app to listen on port 8080
- Next.js by default uses port 3000, but we've configured it in the Dockerfile

### Environment Variables
- All env vars must be set in Cloud Run service settings
- Not read from .env files during deployment

### Service Account Permissions
- If chatbot API fails, check service account has Vertex AI User role

### Logs
```bash
gcloud run logs read portfolio --region us-central1 --limit 50
```

## Next Steps

1. ✅ Build Docker image
2. ✅ Push to Container Registry
3. ✅ Deploy to Cloud Run
4. ⏳ Fix chatbot integration (after deployment)
5. ⏳ Set up custom domain (if needed)

## References
- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Deploying Next.js to Cloud Run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs)
- [Vertex AI API Documentation](https://cloud.google.com/vertex-ai/docs)
