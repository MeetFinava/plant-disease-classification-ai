#!/bin/bash

# 🧹 Cleanup Script - Remove unnecessary files before Git commit

echo "🧹 Cleaning up unnecessary files..."

# Remove node_modules if they exist
if [ -d "plant-disease-app-frontend/node_modules" ]; then
    echo "🗑️  Removing frontend node_modules..."
    rm -rf plant-disease-app-frontend/node_modules
fi

if [ -d "node_modules" ]; then
    echo "🗑️  Removing root node_modules..."
    rm -rf node_modules
fi

# Remove build directories
if [ -d "plant-disease-app-frontend/build" ]; then
    echo "🗑️  Removing frontend build directory..."
    rm -rf plant-disease-app-frontend/build
fi

# Remove Python cache
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find . -name "*.pyc" -delete 2>/dev/null
find . -name "*.pyo" -delete 2>/dev/null

# Remove log files
find . -name "*.log" -delete 2>/dev/null

# Remove temporary files
find . -name "*.tmp" -delete 2>/dev/null
find . -name "*.temp" -delete 2>/dev/null

# Remove OS generated files
find . -name ".DS_Store" -delete 2>/dev/null
find . -name "Thumbs.db" -delete 2>/dev/null

# Remove IDE files
rm -rf .vscode 2>/dev/null
rm -rf .idea 2>/dev/null

# Remove environment files (keep .env.example if it exists)
find . -name ".env" -not -name ".env.example" -delete 2>/dev/null
find . -name ".env.local" -delete 2>/dev/null

# Remove package lock files (optional - uncomment if you want to remove them)
# find . -name "package-lock.json" -delete 2>/dev/null
# find . -name "yarn.lock" -delete 2>/dev/null

echo "✅ Cleanup completed!"
echo ""
echo "📋 Files that were cleaned:"
echo "- node_modules directories"
echo "- build directories"
echo "- Python cache files (__pycache__, *.pyc)"
echo "- Log files (*.log)"
echo "- Temporary files (*.tmp, *.temp)"
echo "- OS files (.DS_Store, Thumbs.db)"
echo "- IDE files (.vscode, .idea)"
echo "- Environment files (.env, .env.local)"
echo ""
echo "🚀 Your project is now clean and ready for Git!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Initial commit with clean project structure'"
echo "3. git push origin main"
