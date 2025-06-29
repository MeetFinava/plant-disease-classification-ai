@echo off
echo 🌍 Starting Complete Multilingual Plant Disease Detection App
echo =============================================================
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

echo 🌐 Starting Complete Multilingual Frontend Server (Port 3000)...
start "Complete Multilingual Frontend" cmd /k "cd plant-disease-app-frontend && echo 🎨 Complete Multilingual UI Loading... && npm start"

echo.
echo ✅ Complete Multilingual Plant Disease Detection App is starting!
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
echo   - Language selector with proper label in header
echo   - ALL text translated including:
echo     * Navigation menu
echo     * Plant names and diseases
echo     * Upload instructions
echo     * Analysis results
echo     * Confidence labels
echo     * Button text
echo     * Error messages
echo     * Plant information page
echo     * Contact form
echo.
echo 🌱 Complete Plant Information:
echo   - All 8 plant types included
echo   - Apple, Tomato, Potato, Corn
echo   - Grape, Bell Pepper, Strawberry, Cherry
echo   - Complete disease information
echo   - Symptoms, prevention, and treatment
echo   - Multilingual plant and disease names
echo.
echo 🚨 Smart Plant Selection:
echo   - Popup appears when uploading without plant selection
echo   - Beautiful glassmorphism design
echo   - Circular plant icons with hover effects
echo   - Easy selection with visual feedback
echo.
echo 📡 URLs:
echo   Backend API: http://localhost:8080
echo   Frontend App: http://localhost:3000
echo   API Docs: http://localhost:8080/docs
echo.
echo 💡 Test ALL the enhanced features:
echo   1. Change language using selector in header (with proper label)
echo   2. Upload image without selecting plant (popup appears)
echo   3. See improved predictions with accuracy labels
echo   4. View top 3 results with detailed confidence scores
echo   5. Check Plant Info page for all plants
echo   6. Test all text in different languages
echo   7. Try drag and drop functionality
echo   8. View image analysis information
echo.
echo 🎯 Complete Features List:
echo   ✅ Plant selection popup when uploading without selection
echo   ✅ All plants added to Plant Info page
echo   ✅ Complete multilingual support (EN/ES/FR/HI)
echo   ✅ Enhanced backend accuracy with image analysis
echo   ✅ Beautiful top 3 predictions display
echo   ✅ Language persistence (remembers your choice)
echo   ✅ Language selector with proper label
echo   ✅ ALL text translated throughout the website
echo   ✅ Drag and drop upload with translated text
echo   ✅ Confidence labels in all languages
echo   ✅ Plant and disease names translated
echo   ✅ Error messages and status text translated
echo   ✅ Upload instructions translated
echo   ✅ Analysis results fully translated
echo.
echo 🌍 Translation Coverage:
echo   ✅ Header navigation
echo   ✅ Language selector label
echo   ✅ Main page title and subtitle
echo   ✅ Plant selection text
echo   ✅ Upload area text
echo   ✅ Drag and drop instructions
echo   ✅ File format information
echo   ✅ Button labels
echo   ✅ Analysis results
echo   ✅ Confidence scores
echo   ✅ Top predictions section
echo   ✅ Image analysis information
echo   ✅ Plant and disease names
echo   ✅ Accuracy labels
echo   ✅ Demo mode messages
echo   ✅ Error messages
echo   ✅ Plant info page content
echo   ✅ Contact form labels
echo   ✅ Footer text
echo.

pause
