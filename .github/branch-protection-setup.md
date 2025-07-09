# Branch Protection Setup

After creating the repository on GitHub, follow these steps to protect the main branch:

## 1. Navigate to Branch Protection Rules
- Go to your repository on GitHub
- Click on "Settings" → "Branches"
- Click "Add rule" or "Add branch protection rule"

## 2. Configure Protection for Main Branch
Set the following rules for the `main` branch:

### Required Settings:
- **Branch name pattern**: `main`
- ✅ **Require a pull request before merging**
  - ✅ Require approvals: 1 (or more if you have collaborators)
  - ✅ Dismiss stale pull request approvals when new commits are pushed
  - ✅ Require review from CODEOWNERS (optional)
- ✅ **Require status checks to pass before merging**
  - ✅ Require branches to be up to date before merging
  - Select "Build and Deploy" workflow as required status check
- ✅ **Require conversation resolution before merging**
- ✅ **Require linear history** (optional but recommended)
- ✅ **Include administrators** (to ensure even admins follow the rules)
- ✅ **Restrict who can push to matching branches**
  - Add specific users/teams if needed, or leave empty to prevent all direct pushes

### Additional Recommended Settings:
- ✅ **Do not allow bypassing the above settings**
- ✅ **Restrict who can dismiss pull request reviews**
- ✅ **Lock branch** (prevents deletion)

## 3. Save Changes
Click "Create" or "Save changes" to apply the protection rules.

## Result
With these settings:
- No one can push directly to `main`
- All changes must come through pull requests from `development`
- Pull requests must pass the build check before merging
- The main branch is fully protected from accidental changes