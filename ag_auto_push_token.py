"""
ag_auto_push_token.py
=====================
BlueSync — Anti-Gravity Auto Push Script (HTTPS + PAT)
Repo   : https://github.com/faranofadini-creator/bluesync.git
Branch : main

HOW TO SET YOUR TOKEN (choose one):
  Option A — Environment Variable (recommended, most secure):
    Windows PowerShell : $env:GH_PAT = "ghp_your_token_here"
    Windows CMD        : set GH_PAT=ghp_your_token_here
    Linux/Mac          : export GH_PAT=ghp_your_token_here
    Then run: python ag_auto_push_token.py

  Option B — Fallback variable below (for local use only, never commit):
    Set GITHUB_TOKEN = "ghp_your_token_here"  on line marked [INSERT TOKEN HERE]
"""

import os
import subprocess
import sys
from datetime import datetime

# ─────────────────────────────────────────────────────────────────────────────
# CONFIGURATION
# ─────────────────────────────────────────────────────────────────────────────

REPO_OWNER   = "faranofadini-creator"
REPO_NAME    = "bluesync"
BRANCH       = "main"
GIT_USERNAME = "faranofadini-creator"
GIT_EMAIL    = "bot@antigravity.local"
GIT_BOT_NAME = "Anti-Gravity Bot"

# ── TOKEN: read from env var first, then fallback ────────────────────────────
GITHUB_TOKEN = os.environ.get("GH_PAT") or os.environ.get("GITHUB_TOKEN") or \
               "ghp_INSERT_YOUR_TOKEN_HERE"   # ← [INSERT TOKEN HERE] if no env var

# ─────────────────────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def mask(text: str) -> str:
    """Replace the real PAT with *** in any log output."""
    return text.replace(GITHUB_TOKEN, "ghp_***MASKED***")


def run(cmd: list[str], cwd: str = None, capture: bool = False) -> str:
    """
    Run a git command via subprocess.
    Masks the token in any printed output so it never appears in logs.
    """
    display_cmd = mask(" ".join(cmd))
    print(f"  → {display_cmd}")
    try:
        result = subprocess.run(
            cmd,
            cwd=cwd or os.getcwd(),
            check=True,
            text=True,
            capture_output=capture,
        )
        if capture and result.stdout:
            print(mask(result.stdout.strip()))
        return result.stdout.strip() if capture else ""
    except subprocess.CalledProcessError as e:
        err = mask(e.stderr or e.stdout or str(e))
        print(f"\n  ❌ Command failed: {display_cmd}")
        print(f"     Error: {err}")
        sys.exit(1)


def has_staged_changes(cwd: str) -> bool:
    """Return True if there are changes staged for commit."""
    result = subprocess.run(
        ["git", "diff", "--cached", "--quiet"],
        cwd=cwd,
    )
    return result.returncode != 0  # non-zero = there ARE changes


def is_git_repo(path: str) -> bool:
    result = subprocess.run(
        ["git", "rev-parse", "--is-inside-work-tree"],
        cwd=path,
        capture_output=True,
    )
    return result.returncode == 0


# ─────────────────────────────────────────────────────────────────────────────
# MAIN PIPELINE
# ─────────────────────────────────────────────────────────────────────────────

def main():
    project_dir = os.path.abspath(os.path.dirname(__file__))
    timestamp   = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    commit_msg  = f"auto(AG): update bluesync [{timestamp}]"

    # Authenticated remote URL — token is embedded but masked in all logs
    remote_url         = f"https://{GITHUB_TOKEN}@github.com/{REPO_OWNER}/{REPO_NAME}.git"
    remote_url_display = f"https://ghp_***MASKED***@github.com/{REPO_OWNER}/{REPO_NAME}.git"

    print()
    print("🌊 ══════════════════════════════════════════════════")
    print("   BlueSync — Anti-Gravity Auto Push Pipeline")
    print(f"   Project : {project_dir}")
    print(f"   Remote  : {remote_url_display}")
    print(f"   Branch  : {BRANCH}")
    print(f"   Commit  : {commit_msg}")
    print("🌊 ══════════════════════════════════════════════════")
    print()

    # ── Validate token ───────────────────────────────────────────────────────
    if "INSERT_YOUR_TOKEN" in GITHUB_TOKEN or not GITHUB_TOKEN.startswith("ghp_"):
        print("❌ No valid GitHub PAT found!")
        print("   Set environment variable GH_PAT before running:")
        print("   PowerShell: $env:GH_PAT = 'ghp_your_token'")
        print("   CMD:        set GH_PAT=ghp_your_token")
        sys.exit(1)
    print("✅ Token detected and masked in all log output.")

    # ── STEP 1: Init repo ────────────────────────────────────────────────────
    print("\n[1/6] Checking git repository...")
    if not is_git_repo(project_dir):
        print("      Not a git repo — initializing...")
        run(["git", "init"], cwd=project_dir)
    else:
        print("      ✅ Git repo already initialized.")

    # ── STEP 2: Configure git user identity ──────────────────────────────────
    print("\n[2/6] Configuring git identity...")
    run(["git", "config", "user.name",  GIT_BOT_NAME], cwd=project_dir)
    run(["git", "config", "user.email", GIT_EMAIL],    cwd=project_dir)

    # ── STEP 3: Set remote origin ────────────────────────────────────────────
    print("\n[3/6] Setting remote origin...")
    check_remote = subprocess.run(
        ["git", "remote", "get-url", "origin"],
        cwd=project_dir, capture_output=True
    )
    if check_remote.returncode == 0:
        run(["git", "remote", "set-url", "origin", remote_url], cwd=project_dir)
        print(f"      Updated remote → {remote_url_display}")
    else:
        run(["git", "remote", "add", "origin", remote_url], cwd=project_dir)
        print(f"      Added remote → {remote_url_display}")

    # ── STEP 4: Set branch to main ───────────────────────────────────────────
    print("\n[4/6] Setting branch to 'main'...")
    run(["git", "branch", "-M", BRANCH], cwd=project_dir)

    # ── STEP 5: Stage and commit ─────────────────────────────────────────────
    print("\n[5/6] Staging all changes (git add .)...")
    run(["git", "add", "."], cwd=project_dir)

    if has_staged_changes(project_dir):
        print(f"      Committing: {commit_msg}")
        run(["git", "commit", "-m", commit_msg], cwd=project_dir)
    else:
        print("      ✅ Nothing new to commit — working tree is clean.")

    # ── STEP 6: Push to GitHub ───────────────────────────────────────────────
    print("\n[6/6] Pushing to GitHub...")
    run(["git", "push", "-u", "origin", BRANCH], cwd=project_dir)

    print()
    print("✅ ══════════════════════════════════════════════════")
    print("   SUCCESS! BlueSync pushed to GitHub!")
    print(f"   👉 https://github.com/{REPO_OWNER}/{REPO_NAME}")
    print("🌊 ══════════════════════════════════════════════════")
    print()


if __name__ == "__main__":
    main()