@echo off
echo 🌍 Starting Clean Multilingual Plant Disease Detection App
echo =========================================================
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

echo 🌐 Starting Clean Multilingual Frontend Server (Port 3000)...
start "Clean Multilingual Frontend" cmd /k "cd plant-disease-app-frontend && echo 🎨 Clean Code Loading... && npm start"

echo.
echo ✅ Clean Multilingual Plant Disease Detection App is starting!
echo.
echo 🧹 Code Quality:
echo   ✅ All ESLint warnings fixed
echo   ✅ No unused imports
echo   ✅ No duplicate keys
echo   ✅ Clean, optimized code
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
echo 🌍 Complete Multilingual Support:
echo   - English (🇺🇸) - Full support
echo   - Spanish (🇪🇸) - Full support  
echo   - French (🇫🇷) - Full support
echo   - Hindi (🇮🇳) - Full support
echo   - Language selector with proper label
echo   - ALL text translated throughout website
echo   - Language persistence across sessions
echo.
echo 🌱 Complete Plant Database:
echo   - All 8 plant types: Apple, Tomato, Potato, Corn
echo   - Grape, Bell Pepper, Strawberry, Cherry
echo   - Complete disease information
echo   - Multilingual plant and disease names
echo.
echo 🚨 Smart Features:
echo   - Plant selection popup when needed
echo   - Drag & drop image upload
echo   - Real-time image analysis
echo   - Confidence visualization
echo   - Professional UI design
echo.
echo 📡 URLs:
echo   Backend API: http://localhost:8080
echo   Frontend App: http://localhost:3000
echo   API Docs: http://localhost:8080/docs
echo.
echo 💡 Test Features:
echo   1. Change language using selector in header
echo   2. Upload image without selecting plant (popup appears)
echo   3. See improved predictions with accuracy labels
echo   4. View top 3 results with detailed confidence scores
echo   5. Check Plant Info page for all plants
echo   6. Test all text in different languages
echo.
echo 🎯 All Issues Fixed:
echo   ✅ Removed unused LanguageIcon import
echo   ✅ Removed unused LinearProgress, Paper, Divider imports
echo   ✅ Removed unused AnalyticsIcon import
echo   ✅ Added translation usage in ContactPage
echo   ✅ Fixed duplicate 'analyzing' keys in translations
echo   ✅ Clean code with no ESLint warnings
echo.
echo 🌟 Ready for Production!
echo   - Clean, optimized codebase
echo   - Complete multilingual support
echo   - Professional UI/UX
echo   - Enhanced AI accuracy
echo   - No code warnings or errors
echo.

pause
