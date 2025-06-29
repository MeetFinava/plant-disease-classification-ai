@echo off
echo 🚀 Restarting Enhanced Plant Disease Detection App
echo ================================================
echo.

echo 🔄 Stopping any existing servers...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1

echo ⏳ Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo 🌱 Starting Enhanced Backend Server (Port 8080)...
start "Enhanced Backend" cmd /k "cd plant-disease-app-backend && echo 🔬 Enhanced AI Model Loading... && python main.py"

echo ⏳ Waiting 8 seconds for backend to fully start...
timeout /t 8 /nobreak >nul

echo 🌐 Starting Enhanced Frontend Server (Port 3000)...
start "Enhanced Frontend" cmd /k "cd plant-disease-app-frontend && echo 🎨 Enhanced UI Loading... && npm start"

echo.
echo ✅ Enhanced Plant Disease Detection App is starting!
echo.
echo 🔬 Backend Features:
echo   - Enhanced image analysis with color detection
echo   - Improved prediction accuracy based on image features
echo   - Top 3 predictions with confidence scores
echo   - Detailed accuracy labels
echo.
echo 🎨 Frontend Features:
echo   - Beautiful top 3 predictions display
echo   - Rank badges and confidence visualization
echo   - Image analysis information
echo   - Enhanced accuracy labels
echo.
echo 📡 URLs:
echo   Backend API: http://localhost:8080
echo   Frontend App: http://localhost:3000
echo   API Docs: http://localhost:8080/docs
echo.
echo 💡 Test the enhanced features:
echo   1. Upload a plant image
echo   2. See improved predictions with accuracy labels
echo   3. View top 3 results with detailed confidence scores
echo.

pause
