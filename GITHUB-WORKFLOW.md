# GitHub Workflow Documentation

## Repository Structure

This repository follows a protected main branch workflow:

- **`main`** - Production branch (protected, no direct commits)
- **`development`** - Active development branch (default branch)

## Workflow Overview

```
development (default) → Pull Request → main (protected) → GitHub Actions → Deploy
```

## Key Features

1. **Branch Protection**: The `main` branch is protected and can only be updated via pull requests
2. **Automated Builds**: Every merge to `main` triggers a GitHub Actions workflow
3. **Static Site Deployment**: Successful builds are automatically deployed to GitHub Pages
4. **Node.js Compatibility**: Optimized for Node.js 24, but supports versions 14-24

## Development Process

### 1. Local Development
```bash
# Always work on development branch
git checkout development

# Make your changes
npm start

# Commit changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin development
```

### 2. Creating a Pull Request
```bash
# Ensure development is up to date
git pull origin development

# Create PR using GitHub CLI (optional)
gh pr create --base main --head development --title "Your PR title"

# Or create PR via GitHub web interface
```

### 3. Merging to Production
1. Create a pull request from `development` to `main`
2. Review the changes
3. Ensure all checks pass
4. Merge the pull request
5. GitHub Actions will automatically:
   - Build the project
   - Run tests (if configured)
   - Deploy to GitHub Pages

## GitHub Actions Workflow

The `.github/workflows/build-and-deploy.yml` file:
- Triggers on merges to `main`
- Uses Node.js 24 for optimal performance
- Builds the React application
- Deploys the build artifacts to GitHub Pages

## Initial Setup

1. **Create GitHub Repository**
   ```bash
   # Use the provided setup script
   ./setup-github-repo.sh
   ```

2. **Configure GitHub Repository**
   - Go to Settings → General → Default branch → Change to `development`
   - Go to Settings → Branches → Add rule for `main`
   - Enable GitHub Pages (Settings → Pages → Source: Deploy from branch → main)

3. **Configure Branch Protection** (see `.github/branch-protection-setup.md`)

## Environment Variables

If your project requires environment variables:

1. Add them to GitHub Secrets (Settings → Secrets and variables → Actions)
2. Update the workflow file to include them in the build step

Example:
```yaml
- name: Build project
  run: npm run build
  env:
    CI: false
    REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
```

## Troubleshooting

### Build Failures
- Check the Actions tab in GitHub for detailed logs
- Ensure all dependencies are properly listed in `package.json`
- Verify Node.js version compatibility

### Deployment Issues
- Verify GitHub Pages is enabled
- Check that the workflow has proper permissions
- Ensure the `build` directory is being created correctly

## Best Practices

1. **Always develop on the `development` branch**
2. **Test locally before creating pull requests**
3. **Write descriptive commit messages**
4. **Keep pull requests focused and small**
5. **Review the GitHub Actions logs after merging**

## Support

For issues with:
- The template itself: Check the Creative Tim documentation
- GitHub workflow: Review the Actions logs and this documentation
- Node.js compatibility: Use Node.js 24 for best results