#!/bin/bash

# Deploy script - Creates PR and auto-merges to production
# Usage: ./deploy.sh

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}   Automated Deployment Script${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ Error: GitHub CLI (gh) is not installed${NC}"
    echo ""
    echo "To install GitHub CLI on Ubuntu/Debian:"
    echo -e "${YELLOW}curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg${NC}"
    echo -e "${YELLOW}echo \"deb [arch=\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main\" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null${NC}"
    echo -e "${YELLOW}sudo apt update${NC}"
    echo -e "${YELLOW}sudo apt install gh${NC}"
    echo ""
    echo "Or using snap:"
    echo -e "${YELLOW}sudo snap install gh${NC}"
    echo ""
    echo "After installation, authenticate with:"
    echo -e "${YELLOW}gh auth login${NC}"
    exit 1
fi

# Check if authenticated with GitHub
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ Error: Not authenticated with GitHub${NC}"
    echo ""
    echo "Please authenticate by running:"
    echo -e "${YELLOW}gh auth login${NC}"
    echo ""
    echo "Choose:"
    echo "  - GitHub.com"
    echo "  - HTTPS"
    echo "  - Login with web browser"
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

# Check if we're on development branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "development" ]; then
    echo -e "${RED}❌ Error: You must be on the development branch${NC}"
    echo "Current branch: $CURRENT_BRANCH"
    echo ""
    echo "Switch to development branch:"
    echo -e "${YELLOW}git checkout development${NC}"
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${RED}❌ Error: You have uncommitted changes${NC}"
    echo ""
    echo "Options:"
    echo "1. Commit your changes:"
    echo -e "${YELLOW}   git add .${NC}"
    echo -e "${YELLOW}   git commit -m \"Your message\"${NC}"
    echo ""
    echo "2. Or stash them temporarily:"
    echo -e "${YELLOW}   git stash${NC}"
    exit 1
fi

# Check if remote is set up
if ! git remote get-url origin &> /dev/null; then
    echo -e "${RED}❌ Error: No remote 'origin' configured${NC}"
    echo ""
    echo "Add remote with:"
    echo -e "${YELLOW}git remote add origin git@github.com:secretzer0/mtnrg.git${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All checks passed!${NC}"
echo ""

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
git pull origin development

# Push to origin
echo -e "${YELLOW}📤 Pushing to development branch...${NC}"
git push origin development

# Get the latest commit message for PR title
COMMIT_MSG=$(git log -1 --pretty=%B | head -n 1)

# Create pull request
echo -e "${YELLOW}📝 Creating pull request...${NC}"
PR_OUTPUT=$(gh pr create \
    --base main \
    --head development \
    --title "Deploy: $COMMIT_MSG" \
    --body "Automated deployment from development to production

This PR was created automatically by the deploy.sh script.

Latest commit: $COMMIT_MSG" \
    2>&1)

# Extract PR URL and number
PR_URL=$(echo "$PR_OUTPUT" | grep -o 'https://[^ ]*')
PR_NUMBER=$(echo "$PR_URL" | grep -oE '[0-9]+$')

if [ -z "$PR_NUMBER" ]; then
    echo -e "${RED}❌ Error: Could not create pull request${NC}"
    echo "Output: $PR_OUTPUT"
    exit 1
fi

echo -e "${GREEN}✅ Pull request created: #$PR_NUMBER${NC}"
echo "   $PR_URL"

# Wait a moment for GitHub to process
echo -e "${YELLOW}⏳ Waiting for GitHub to process...${NC}"
sleep 3

# Auto-merge the PR
echo -e "${YELLOW}🔀 Merging pull request...${NC}"
if gh pr merge $PR_NUMBER --merge --delete-branch=false; then
    echo -e "${GREEN}✅ Pull request merged successfully!${NC}"
else
    echo -e "${RED}❌ Error: Could not merge pull request${NC}"
    echo "You may need to:"
    echo "  1. Check if branch protection rules are blocking the merge"
    echo "  2. Manually merge at: $PR_URL"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo "📊 Check build status at:"
echo "   https://github.com/secretzer0/mtnrg/actions"
echo ""
echo "🌐 Your site will be live at:"
echo "   https://nrg.vyzon.ai"
echo ""
echo "⏱️  Build usually takes 2-3 minutes"