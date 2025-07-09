# Vision UI Dashboard Template

A React-based admin dashboard template with automated GitHub deployment.

## Development Workflow

### 1. Local Development

Before making any changes, test locally:

```bash
# Install dependencies (first time only)
npm install

# Run locally to test changes
npm start
# Opens at http://localhost:3000

# Build locally to ensure it compiles
npm run build
```

### 2. Making Changes

```bash
# Always work on development branch
git checkout development

# Pull latest changes
git pull origin development

# Make your changes, then commit
git add .
git commit -m "Description of changes"
git push origin development
```

### 3. Creating a Pull Request

1. Go to your GitHub repository
2. Click "Pull requests" → "New pull request"
3. Set: base: `main` ← compare: `development`
4. Click "Create pull request"
5. Review your changes
6. Click "Merge pull request" → "Confirm merge"

### 4. Build Status

After merging:
1. Go to the "Actions" tab in your repository
2. Click on the latest workflow run
3. Check if the build succeeded (green checkmark) or failed (red X)

### 5. If Build Fails

1. Click on the failed workflow to see error details
2. Fix the issues in your local development branch:
   ```bash
   git checkout development
   git pull origin main
   git pull origin development
   
   # Fix the issues
   # Test locally with npm start and npm run build
   
   git add .
   git commit -m "Fix build errors"
   git push origin development
   ```
3. Create a new pull request and merge again

## Quick Reference

- **Local test**: `npm start`
- **Local build**: `npm run build`
- **Working branch**: `development`
- **Production branch**: `main` (protected)
- **Check build status**: GitHub → Actions tab
- **View deployed site**: GitHub → Settings → Pages

## Important Notes

- Never commit directly to `main`
- Always test with `npm run build` locally before pushing
- The build process uses Node.js 24 on GitHub Actions
- Successful builds are automatically deployed to GitHub Pages