@echo off
title Tomato - Food Delivery App Launcher
color 0A

echo.
echo  =========================================
echo       TOMATO - Food Delivery App
echo  =========================================
echo.

:: ── Check Node is installed ──────────────────────────────────
where node >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Node.js is not installed or not in PATH.
    echo  Download it from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: ── Check .env files exist ───────────────────────────────────
if not exist "backend\.env" (
    color 0E
    echo  [WARNING] backend\.env not found.
    echo  Copying from backend\.env.example ...
    copy "backend\.env.example" "backend\.env" >nul
    echo  Done. Please edit backend\.env with your credentials before running again.
    echo.
    pause
    exit /b 1
)
if not exist "frontend\.env" (
    echo  [INFO] frontend\.env not found - copying from example...
    copy "frontend\.env.example" "frontend\.env" >nul
)
if not exist "admin\.env" (
    echo  [INFO] admin\.env not found - copying from example...
    copy "admin\.env.example" "admin\.env" >nul
)

:: ── Install dependencies if node_modules missing ─────────────
echo  [1/3] Checking backend dependencies...
if not exist "backend\node_modules" (
    echo  Installing backend packages...
    cd backend
    call npm install --silent
    cd ..
)

echo  [2/3] Checking frontend dependencies...
if not exist "frontend\node_modules" (
    echo  Installing frontend packages...
    cd frontend
    call npm install --silent
    cd ..
)

echo  [3/3] Checking admin dependencies...
if not exist "admin\node_modules" (
    echo  Installing admin packages...
    cd admin
    call npm install --silent
    cd ..
)

echo.
echo  All dependencies ready!
echo.

:: ── Start backend ─────────────────────────────────────────────
echo  Starting Backend  (http://localhost:4000) ...
start "Tomato - Backend" cmd /k "cd /d %~dp0backend && color 0B && echo  TOMATO BACKEND  ^| http://localhost:4000 && echo. && npm start"

:: Wait for backend to be ready before launching React apps
timeout /t 4 /nobreak > nul

:: ── Start frontend ────────────────────────────────────────────
echo  Starting Frontend (http://localhost:3000) ...
start "Tomato - Frontend" cmd /k "cd /d %~dp0frontend && color 0D && echo  TOMATO FRONTEND ^| http://localhost:3000 && echo. && npm start"

:: Small gap so both React dev servers don't fight over the port prompt
timeout /t 3 /nobreak > nul

:: ── Start admin ───────────────────────────────────────────────
echo  Starting Admin    (http://localhost:3001) ...
start "Tomato - Admin" cmd /k "cd /d %~dp0admin && color 0E && echo  TOMATO ADMIN    ^| http://localhost:3001 && echo. && set PORT=3001 && npm start"

:: Wait for React dev servers to compile (usually 20-40 s)
echo.
echo  Waiting for apps to compile (30 seconds)...
timeout /t 30 /nobreak > nul

:: ── Open browser tabs ─────────────────────────────────────────
echo  Opening browser tabs...
start "" "http://localhost:3000"
timeout /t 2 /nobreak > nul
start "" "http://localhost:3001"

echo.
echo  =========================================
echo   Everything is running!
echo  =========================================
echo.
echo   Frontend  :  http://localhost:3000
echo   Admin     :  http://localhost:3001
echo   Backend   :  http://localhost:4000
echo.
echo   Close the 3 colored terminal windows
echo   to stop all servers.
echo.
echo  =========================================
echo.
pause
