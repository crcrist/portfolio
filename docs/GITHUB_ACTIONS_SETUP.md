# GitHub Actions CI/CD Setup Guide

This document provides step-by-step instructions for configuring GitHub Actions to automatically test and deploy your Next.js portfolio to Google Cloud Run.

## 📋 Overview

Two workflows have been created:

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Runs on: Pull requests and commits to main
   - Actions: Type checking, building, artifact validation
   - Caching: npm dependencies and Next.js build cache

2. **CD Workflow** (`.github/workflows/deploy.yml`)
   - Runs on: Push to main branch
   - Actions: Build Docker image, push to GCR, deploy to Cloud Run
   - Output: Deployment summary with service URL

## 🔐 Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

### 1. GCP_PROJECT_ID

**Description**: Your Google Cloud Project ID
**Value**: `optical-name-470223-i3`

### 2. GCP_SA_KEY

**Description**: Google Cloud Service Account credentials (JSON key)

**How to Create:**

#### Step 1: Create a Service Account

```bash
# Set your project ID
export PROJECT_ID="optical-name-470223-i3"

# Create service account
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions CI/CD" \
  --project=$PROJECT_ID
```

#### Step 2: Grant Required Permissions

```bash
# Service Account email
export SA_EMAIL="github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

# Grant necessary roles
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:${SA_EMAIL}" \
  --role="roles/iam.serviceAccountUser"
```

#### Step 3: Create and Download JSON Key

```bash
# Create JSON key
gcloud iam service-accounts keys create github-actions-key.json \
  --iam-account=$SA_EMAIL \
  --project=$PROJECT_ID

# Display the key content (copy this)
cat github-actions-key.json
```

**⚠️ Security Note**:
- Never commit this file to your repository
- Delete the local file after adding to GitHub Secrets
- Store it securely if you need a backup

```bash
# Clean up local key file
rm github-actions-key.json
```

## 🔧 Adding Secrets to GitHub

### Via GitHub Web Interface

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret:

   **Secret 1:**
   - Name: `GCP_PROJECT_ID`
   - Value: `optical-name-470223-i3`

   **Secret 2:**
   - Name: `GCP_SA_KEY`
   - Value: Paste the entire JSON key content from Step 3

### Via GitHub CLI

```bash
# Set GCP_PROJECT_ID
gh secret set GCP_PROJECT_ID --body "optical-name-470223-i3"

# Set GCP_SA_KEY from file
gh secret set GCP_SA_KEY < github-actions-key.json
```

## ✅ Verification

### 1. Check Secrets are Configured

```bash
gh secret list
```

You should see:
```
GCP_PROJECT_ID
GCP_SA_KEY
```

### 2. Test CI Workflow

Create a test branch and push to trigger CI:

```bash
git checkout -b test/github-actions
git add .github/workflows/
git commit -m "test: add GitHub Actions workflows"
git push origin test/github-actions
```

Create a pull request to trigger the CI workflow.

### 3. Test CD Workflow

Merge to main to trigger deployment:

```bash
git checkout main
git merge test/github-actions
git push origin main
```

Monitor deployment at: `https://github.com/YOUR_USERNAME/portfolio/actions`

## 📊 Workflow Features

### CI Workflow Features

- ✅ **Build caching**: npm and Next.js build cache for faster runs
- ✅ **Type checking**: TypeScript validation with `tsc --noEmit`
- ✅ **Build validation**: Ensures Next.js build succeeds
- ✅ **Artifact upload**: Stores build artifacts for 7 days
- ✅ **Path filtering**: Skips docs and markdown changes

### CD Workflow Features

- ✅ **Automated deployment**: Deploys on every main branch push
- ✅ **Docker image tagging**: Uses commit SHA + latest tag
- ✅ **Cloud Run configuration**: Matches existing cloudbuild.yaml settings
- ✅ **Deployment summary**: Shows service URL and commit info
- ✅ **Path filtering**: Skips docs and markdown changes

## 🎯 Cloud Run Configuration

The deployment workflow configures Cloud Run with:

- **Service Name**: portfolio
- **Region**: us-central1
- **Memory**: 2Gi
- **CPU**: 1 vCPU
- **Max Instances**: 10
- **Timeout**: 300s (5 minutes)
- **Port**: 8080
- **Environment Variables**:
  - `GCP_PROJECT_ID`: optical-name-470223-i3
  - `NODE_ENV`: production

## 🔄 Workflow Triggers

### CI Workflow Triggers:
- Pull requests to `main`
- Pushes to `main`
- **Ignores**: Changes to `docs/`, `*.md`, `deploy.yml`

### CD Workflow Triggers:
- Pushes to `main` only
- **Ignores**: Changes to `docs/`, `*.md`, `ci.yml`

## 🛠️ Customization

### Adding Test Scripts

To add testing to the CI workflow, update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

Then update `.github/workflows/ci.yml` to add:

```yaml
- name: Run tests
  run: npm test

- name: Run linter
  run: npm run lint
```

### Adding Status Badges

Add to your README.md:

```markdown
[![CI](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/ci.yml)
[![CD](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml)
```

### Changing Deployment Trigger

To deploy only on tagged releases instead of every main push:

```yaml
on:
  push:
    tags:
      - 'v*.*.*'
```

## 🐛 Troubleshooting

### Issue: "Permission denied" errors

**Solution**: Verify service account has required roles:
- `roles/run.admin`
- `roles/storage.admin`
- `roles/iam.serviceAccountUser`

### Issue: "Failed to authenticate with GCP"

**Solution**:
1. Verify `GCP_SA_KEY` secret contains valid JSON
2. Check service account key hasn't been deleted
3. Ensure key has proper line breaks preserved

### Issue: Build fails with "GCP_PROJECT_ID not set"

**Solution**: Verify `GCP_PROJECT_ID` secret is configured in GitHub

### Issue: Docker push fails

**Solution**: Check service account has `roles/storage.admin` for GCR

### Issue: Cloud Run deployment fails

**Solution**:
1. Verify image was pushed successfully
2. Check Cloud Run API is enabled in GCP project
3. Verify service account has `roles/run.admin`

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [GCP Service Account Best Practices](https://cloud.google.com/iam/docs/best-practices-service-accounts)
- [GitHub Actions for GCP](https://github.com/google-github-actions)

## 🔒 Security Best Practices

1. ✅ Use service accounts with minimal required permissions
2. ✅ Rotate service account keys regularly (every 90 days)
3. ✅ Never commit credentials to repository
4. ✅ Use GitHub Secrets for sensitive data
5. ✅ Review GitHub Actions audit logs regularly
6. ✅ Enable branch protection on main branch
7. ✅ Require PR reviews before merging

## 📝 Next Steps

After setup is complete:

1. ✅ Test both workflows by creating a PR and merging
2. ✅ Monitor first deployment to verify success
3. ✅ Add status badges to README if desired
4. ✅ Consider adding automated testing
5. ✅ Set up monitoring and alerts in Cloud Run
6. ✅ Document any custom deployment steps for your team

---

**Deployment URL**: https://portfolio-528730556404.us-central1.run.app

For questions or issues, refer to the troubleshooting section or check GitHub Actions logs.
