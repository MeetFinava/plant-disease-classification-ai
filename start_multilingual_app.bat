@echo off
echo 🌍 Starting Multilingual Plant Disease Detection App
echo ===================================================
echo.

echo 🔄 Stopping any existing servers...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1

echo ⏳ Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo 🌱 Starting Enhanced Backend Server (Port 8080)...
start "Enhanced Backend" cmd /k "cd plant-disease-app-backend && echo 🔬 Enhanced AI Model with Image Analysis Loading... && python main.py"

echo ⏳ Waiting 8 seconds for backend to fully start...
timeout /t 8 /nobreak >nul

echo 🌐 Starting Multilingual Frontend Server (Port 3000)...
start "Multilingual Frontend" cmd /k "cd plant-disease-app-frontend && echo 🎨 Multilingual UI Loading... && npm start"

echo.
echo ✅ Multilingual Plant Disease Detection App is starting!
echo.
echo 🔬 Backend Features:
echo   - Enhanced image analysis with color detection
echo   - Improved prediction accuracy based on image features
echo   - Top 3 predictions with confidence scores
echo   - Detailed accuracy labels
echo   - Real-time image processing
echo.
echo 🎨 Frontend Features:
echo   - Beautiful top 3 predictions display
echo   - Rank badges and confidence visualization
echo   - Stylish plant selection popup
echo   - Image analysis information display
echo   - Enhanced accuracy labels
echo.
echo 🌍 Multilingual Support:
echo   - English (🇺🇸)
echo   - Spanish (🇪🇸) 
echo   - French (🇫🇷)
echo   - Hindi (🇮🇳)
echo   - Language selector in header
echo   - All text translated including plant names
echo.
echo 🌱 Plant Information:
echo   - All 8 plant types included
echo   - Apple, Tomato, Potato, Corn
echo   - Grape, Bell Pepper, Strawberry, Cherry
echo   - Complete disease information
echo   - Symptoms, prevention, and treatment
echo.
echo 📡 URLs:
echo   Backend API: http://localhost:8080
echo   Frontend App: http://localhost:3000
echo   API Docs: http://localhost:8080/docs
echo.
echo 💡 Test the enhanced features:
echo   1. Change language using the selector in header
echo   2. Upload an image without selecting plant (popup appears)
echo   3. See improved predictions with accuracy labels
echo   4. View top 3 results with detailed confidence scores
echo   5. Check Plant Info page for all plants
echo.
echo 🎯 New Features:
echo   ✅ Plant selection popup when uploading without selection
echo   ✅ All plants added to Plant Info page
echo   ✅ Complete multilingual support (EN/ES/FR/HI)
echo   ✅ Enhanced backend accuracy with image analysis
echo   ✅ Beautiful top 3 predictions display
echo   ✅ Language persistence (remembers your choice)
echo.

pause
