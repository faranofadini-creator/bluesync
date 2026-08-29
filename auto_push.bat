@echo off
REM ============================================================
REM  BlueSync - Auto Git Push Script (HTTPS)
REM  Usage : auto_push.bat [optional commit message]
REM  Repo  : https://github.com/faranofadini-creator/bluesync
REM ============================================================

setlocal enabledelayedexpansion

set "REMOTE_URL=https://github.com/faranofadini-creator/bluesync.git"
set "BRANCH=main"

REM Use first argument as commit message, or default
if "%~1"=="" (
    set "COMMIT_MSG=auto update bluesync"
) else (
    set "COMMIT_MSG=%~1"
)

echo.
echo =============================================
echo   BlueSync ^| Auto Git Push Script
echo   Remote : %REMOTE_URL%
echo   Branch : %BRANCH%
echo   Commit : %COMMIT_MSG%
echo =============================================
echo.

REM ── Check Git is installed ──────────────────────────────
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH.
    echo         Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

REM ── STEP 1: Init repo ───────────────────────────────────
echo [1/6] Checking git repository...
if not exist ".git" (
    echo       Initializing new git repo...
    git init
) else (
    echo       Git repo already initialized.
)

REM ── STEP 2: Set remote ──────────────────────────────────
echo.
echo [2/6] Setting up remote origin...
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo       Remote exists -- updating URL...
    git remote set-url origin %REMOTE_URL%
) else (
    echo       Adding new remote...
    git remote add origin %REMOTE_URL%
)
echo       Remote URL: %REMOTE_URL%

REM ── STEP 3: Set branch ──────────────────────────────────
echo.
echo [3/6] Setting branch to %BRANCH%...
git branch -M %BRANCH%

REM ── STEP 4: Stage files ─────────────────────────────────
echo.
echo [4/6] Staging all files (git add .)...
git add .

REM ── STEP 5: Commit ──────────────────────────────────────
echo.
echo [5/6] Committing changes...
git diff --cached --quiet >nul 2>&1
if %errorlevel% equ 0 (
    echo       Nothing new to commit -- working tree is clean.
) else (
    git commit -m "%COMMIT_MSG%"
    echo       Committed: %COMMIT_MSG%
)

REM ── STEP 6: Push ────────────────────────────────────────
echo.
echo [6/6] Pushing to GitHub...
git push -u origin %BRANCH%
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed!
    echo   Make sure you are logged in to GitHub.
    echo   If asked for password, use a Personal Access Token:
    echo   GitHub > Settings > Developer Settings > Personal Access Tokens
    pause
    exit /b 1
)

echo.
echo =============================================
echo   SUCCESS! BlueSync pushed to GitHub!
echo   https://github.com/faranofadini-creator/bluesync
echo =============================================
echo.
pause