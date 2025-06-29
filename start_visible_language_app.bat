@echo off
echo 🌍 Starting Enhanced Visible Language Selector App
echo ==================================================
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

echo 🌐 Starting Enhanced Language Selector Frontend (Port 3000)...
start "Enhanced Language Frontend" cmd /k "cd plant-disease-app-frontend && echo 🎨 Enhanced Language UI Loading... && npm start"

echo.
echo ✅ Enhanced Visible Language Selector App is starting!
echo.
echo 🎯 Language Selector Enhancements:
echo   ✅ Highly visible current language selection
echo   ✅ Clear "Language:" label in header
echo   ✅ Prominent flag and language name display
echo   ✅ Green gradient background for visibility
echo   ✅ Hover effects and animations
echo   ✅ Selected language highlighted in dropdown
echo   ✅ "Selected" indicator in current language
echo   ✅ Border highlighting for current selection
echo   ✅ Larger, more readable text
echo.
echo 🎨 Visual Improvements:
echo   ✅ Button variant: Enhanced with green gradient
echo   ✅ Chip variant: Compact with clear labeling
echo   ✅ Dropdown menu: Clear selection indicators
echo   ✅ Responsive design: Works on all screen sizes
echo   ✅ Accessibility: High contrast and clear text
echo.
echo 🌍 Language Visibility Features:
echo   ✅ Current language clearly shown in header
echo   ✅ Flag emoji for quick visual identification
echo   ✅ Language name in both English and native script
echo   ✅ "Language:" prefix for context
echo   ✅ Green highlighting for selected language
echo   ✅ Checkmark and "Selected" text in dropdown
echo   ✅ Smooth transitions and hover effects
echo.
echo 🔬 Backend Features:
echo   - Enhanced image analysis with color detection
echo   - Improved prediction accuracy
echo   - Top 3 predictions with confidence scores
echo   - Detailed accuracy labels
echo.
echo 🎨 Frontend Features:
echo   - Beautiful top 3 predictions display
echo   - Stylish plant selection popup
echo   - Complete multilingual support
echo   - Enhanced language selector visibility
echo.
echo 📡 URLs:
echo   Backend API: http://localhost:8080
echo   Frontend App: http://localhost:3000
echo   API Docs: http://localhost:8080/docs
echo.
echo 💡 Test the Enhanced Language Selector:
echo   1. Look at the header - you'll clearly see current language
echo   2. Click the language selector button
echo   3. Notice the selected language is highlighted
echo   4. See the checkmark and "Selected" text
echo   5. Switch languages and see immediate visual feedback
echo   6. Test on mobile - chip variant is compact but clear
echo.
echo 🎯 What You'll See:
echo   ✅ Header shows: "Language: 🇺🇸 English" (clearly visible)
echo   ✅ Green gradient background makes it stand out
echo   ✅ Dropdown shows selected language with green highlight
echo   ✅ Checkmark (✓) and "Selected" text for current choice
echo   ✅ Smooth animations and hover effects
echo   ✅ Responsive design adapts to screen size
echo.
echo 🌟 Language Selector is now HIGHLY VISIBLE!
echo   - No more confusion about current language
echo   - Clear visual indicators throughout
echo   - Professional, accessible design
echo   - Smooth user experience
echo.

pause
