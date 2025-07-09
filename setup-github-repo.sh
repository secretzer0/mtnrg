#!/bin/bash

# GitHub Repository Setup Script
# This script helps you push your code to GitHub and configure branch protection

echo "GitHub Repository Setup for Vision UI Dashboard Template"
echo "========================================================"
echo ""

# Check if git remote exists
if git remote get-url origin &>/dev/null; then
    echo "Remote 'origin' already exists:"
    git remote get-url origin
    echo ""
    read -p "Do you want to change it? (y/n): " change_remote
    if [[ $change_remote == "y" ]]; then
        read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " repo_url
        git remote set-url origin "$repo_url"
    fi
else
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " repo_url
    git remote add origin "$repo_url"
fi

echo ""
echo "Current branch structure:"
git branch -a
echo ""

# Push main branch
echo "Pushing main branch..."
git push -u origin main

# Push development branch
echo "Pushing development branch..."
git push -u origin development

# Set development as default branch locally
git checkout development

echo ""
echo "✅ Repository pushed successfully!"
echo ""
echo "Next Steps:"
echo "1. Go to your GitHub repository settings"
echo "2. Change the default branch to 'development' in Settings → General"
echo "3. Set up branch protection rules for 'main' branch (see .github/branch-protection-setup.md)"
echo "4. Enable GitHub Pages in Settings → Pages:"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo ""
echo "Your workflow is now configured:"
echo "- All development work happens on 'development' branch"
echo "- Create pull requests from 'development' to 'main'"
echo "- When merged, GitHub Actions will build and deploy automatically"
echo ""