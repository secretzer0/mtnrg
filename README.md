# Vision UI Dashboard Template

A React-based admin dashboard template with automated GitHub deployment.

## Getting Started - Run Locally

### Development Mode
```bash
# Install dependencies (first time only)
npm install

# Run in development mode
npm start
# Opens at http://localhost:3000
```

### Production Build & Preview
```bash
# Create production build
npm run build

# Serve the production build locally
npx serve -s build
# Opens at http://localhost:3000

# Alternative: Install serve globally
npm install -g serve
serve -s build
```

The production build creates optimized static files in the `build/` directory that can be deployed to any static hosting service.

## Development Workflow

### 1. Making Changes

```bash
# Always work on development branch
git checkout development
git pull origin development

# Make your changes and test locally
npm start

# When ready, commit and push
git add .
git commit -m "Description of changes"
git push origin development
```

### 2. Deploy to Production

#### Option A: Automated Deployment (Recommended)

Use the included deploy script for one-command deployment:

```bash
./deploy.sh
```

This script will automatically:
- Check all prerequisites
- Create a pull request
- Merge it to trigger deployment
- Show you the build status URL

**First-time setup for automated deployment:**

1. Install GitHub CLI:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install gh
   
   # Or using snap
   sudo snap install gh
   ```

2. Authenticate with GitHub:
   ```bash
   gh auth login
   # Choose: GitHub.com → HTTPS → Login with web browser
   ```

3. Run the deploy script:
   ```bash
   ./deploy.sh
   ```

#### Option B: Manual Deployment (GitHub Web UI)

**Step 1: Create Pull Request**
1. Go directly to: https://github.com/secretzer0/mtnrg/compare/main...development
2. Click the green **"Create pull request"** button

**Step 2: Review Your Changes**
1. Check the title (auto-filled from your commit)
2. Add description if needed
3. Review the changes shown below
4. Click green **"Create pull request"** button

**Step 3: Merge to Production**
1. Wait for checks to pass (if any)
2. Click green **"Merge pull request"** button
3. Click green **"Confirm merge"** button
4. Done! The build starts automatically

### 3. Check Build Status

1. Click the **"Actions"** tab at the top
2. Look for your merge (top of the list)
3. ✅ Green check = Success (site is live)
4. ❌ Red X = Failed (see below)

### 4. If Build Fails

1. Click the failed workflow to see errors
2. Fix locally on development branch
3. Push fixes: `git push origin development`
4. Repeat pull request process above

## Quick Reference

- **Test locally**: `npm start`
- **Your GitHub repo**: https://github.com/secretzer0/mtnrg
- **Live site**: https://nrg.vyzon.ai
- **Working branch**: `development` (you edit this)
- **Production branch**: `main` (never edit directly)
- **Deploy**: Push to development → Pull Request → Merge

## Important Notes

- Never commit directly to `main`
- Always test with `npm run build` locally before pushing
- The build process uses Node.js 24 on GitHub Actions
- Successful builds are automatically deployed to GitHub Pages