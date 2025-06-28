#!/bin/bash

# 🚀 PlantCare AI - Quick Deployment Script

echo "🌱 PlantCare AI - Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the plant-disease-app-frontend directory."
    exit 1
fi

echo "📋 Pre-deployment checks..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

echo "✅ Dependencies are ready"

# Test build
echo "🔨 Testing production build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful!"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        exit 1
    fi
fi

echo "✅ Vercel CLI is ready"

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""
echo "📝 Deployment Instructions:"
echo "1. When prompted, choose your Vercel account"
echo "2. Set project name to: plantcare-ai"
echo "3. Confirm the directory is correct"
echo "4. Wait for deployment to complete"
echo ""

vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment Successful!"
    echo "========================"
    echo ""
    echo "✅ Your PlantCare AI app is now live!"
    echo "🌐 Check your Vercel dashboard for the live URL"
    echo "📱 Test all features on mobile and desktop"
    echo "🌍 Try different languages (EN/ES/FR/HI)"
    echo ""
    echo "📋 Post-deployment checklist:"
    echo "- [ ] App loads correctly"
    echo "- [ ] Plant selection works"
    echo "- [ ] Image upload functions"
    echo "- [ ] Language switching works"
    echo "- [ ] Mobile responsive"
    echo "- [ ] PWA installable"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Set up custom domain (optional)"
    echo "2. Configure environment variables"
    echo "3. Set up backend API (optional)"
    echo "4. Monitor performance with Vercel Analytics"
    echo ""
else
    echo "❌ Deployment failed. Please check the error messages above."
    echo "💡 Common solutions:"
    echo "- Run 'vercel login' first"
    echo "- Check your internet connection"
    echo "- Verify your Vercel account permissions"
    exit 1
fi
