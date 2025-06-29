@echo off
echo 🌱 Plant Disease Detection - Local Development Setup
echo =====================================================
echo.

echo This will start both backend and frontend servers.
echo.
echo 📋 What will happen:
echo 1. Backend will start on http://localhost:8000
echo 2. Frontend will start on http://localhost:3000
echo 3. Two command windows will open
echo.

pause

echo 🚀 Starting Backend Server...
start "Backend Server" cmd /k "cd plant-disease-app-backend && start_backend.bat"

echo ⏳ Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo 🚀 Starting Frontend Server...
start "Frontend Server" cmd /k "cd plant-disease-app-frontend && start_frontend.bat"

echo.
echo ✅ Both servers are starting!
echo.
echo 📡 Backend: http://localhost:8000
echo 🌐 Frontend: http://localhost:3000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo 💡 Tip: Wait for both servers to fully start before testing
echo.

pause
