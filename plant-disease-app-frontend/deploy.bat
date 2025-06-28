@echo off
REM 🚀 PlantCare AI - Quick Deployment Script for Windows

echo 🌱 PlantCare AI - Deployment Script
echo ==================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the plant-disease-app-frontend directory.
    pause
    exit /b 1
)

echo 📋 Pre-deployment checks...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

echo ✅ Dependencies are ready

REM Test build
echo 🔨 Testing production build...
npm run build
if errorlevel 1 (
    echo ❌ Build failed. Please fix errors before deploying.
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo 📥 Installing Vercel CLI...
    npm install -g vercel
    if errorlevel 1 (
        echo ❌ Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

echo ✅ Vercel CLI is ready

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
echo.
echo 📝 Deployment Instructions:
echo 1. When prompted, choose your Vercel account
echo 2. Set project name to: plantcare-ai
echo 3. Confirm the directory is correct
echo 4. Wait for deployment to complete
echo.

vercel --prod

if errorlevel 0 (
    echo.
    echo 🎉 Deployment Successful!
    echo ========================
    echo.
    echo ✅ Your PlantCare AI app is now live!
    echo 🌐 Check your Vercel dashboard for the live URL
    echo 📱 Test all features on mobile and desktop
    echo 🌍 Try different languages (EN/ES/FR/HI)
    echo.
    echo 📋 Post-deployment checklist:
    echo - [ ] App loads correctly
    echo - [ ] Plant selection works
    echo - [ ] Image upload functions
    echo - [ ] Language switching works
    echo - [ ] Mobile responsive
    echo - [ ] PWA installable
    echo.
    echo 🎯 Next steps:
    echo 1. Set up custom domain (optional)
    echo 2. Configure environment variables
    echo 3. Set up backend API (optional)
    echo 4. Monitor performance with Vercel Analytics
    echo.
) else (
    echo ❌ Deployment failed. Please check the error messages above.
    echo 💡 Common solutions:
    echo - Run 'vercel login' first
    echo - Check your internet connection
    echo - Verify your Vercel account permissions
)

pause
