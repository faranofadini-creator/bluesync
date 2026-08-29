#!/bin/bash
# ============================================================
#  BlueSync - Auto Git Push Script (SSH)
#  Usage : bash auto_push.sh ["optional commit message"]
#  Repo  : https://github.com/faranofadini-creator/bluesync
# ============================================================

set -e

REMOTE_URL="git@github.com:faranofadini-creator/bluesync.git"
BRANCH="main"
COMMIT_MSG="${1:-auto update bluesync}"

echo ""
echo "🌊 ============================================="
echo "   BlueSync — Auto Git Push"
echo "   Remote : $REMOTE_URL"
echo "   Branch : $BRANCH"
echo "   Commit : $COMMIT_MSG"
echo "🌊 ============================================="
echo ""

# 1. Init repo if not already initialized
if [ ! -d ".git" ]; then
  echo "📁 [1/6] Initializing git repository..."
  git init
else
  echo "✅ [1/6] Git repo already initialized."
fi

# 2. Add or update remote origin
echo ""
echo "🔗 [2/6] Setting up remote origin..."
if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$REMOTE_URL"
  echo "   Updated remote URL -> $REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
  echo "   Added remote URL  -> $REMOTE_URL"
fi

# 3. Set branch to main
echo ""
echo "🌿 [3/6] Setting branch to '$BRANCH'..."
git branch -M "$BRANCH"

# 4. Stage all files
echo ""
echo "📦 [4/6] Staging all files (git add .)..."
git add .

# 5. Commit
echo ""
echo "💾 [5/6] Committing..."
if git diff --cached --quiet; then
  echo "   Nothing new to commit — working tree is clean."
else
  git commit -m "$COMMIT_MSG"
  echo "   ✅ Committed: $COMMIT_MSG"
fi

# 6. Push
echo ""
echo "🚀 [6/6] Pushing to GitHub..."
git push -u origin "$BRANCH"

echo ""
echo "✅ ============================================="
echo "   SUCCESS! BlueSync pushed to GitHub!"
echo "   👉 https://github.com/faranofadini-creator/bluesync"
echo "🌊 ============================================="
echo ""