@echo off
REM 🧹 Cleanup Script - Remove unnecessary files before Git commit

echo 🧹 Cleaning up unnecessary files...

REM Remove node_modules if they exist
if exist "plant-disease-app-frontend\node_modules" (
    echo 🗑️  Removing frontend node_modules...
    rmdir /s /q "plant-disease-app-frontend\node_modules"
)

if exist "node_modules" (
    echo 🗑️  Removing root node_modules...
    rmdir /s /q "node_modules"
)

REM Remove build directories
if exist "plant-disease-app-frontend\build" (
    echo 🗑️  Removing frontend build directory...
    rmdir /s /q "plant-disease-app-frontend\build"
)

REM Remove Python cache
echo 🗑️  Removing Python cache files...
for /d /r . %%d in (__pycache__) do @if exist "%%d" rmdir /s /q "%%d"
del /s /q *.pyc >nul 2>&1
del /s /q *.pyo >nul 2>&1

REM Remove log files
echo 🗑️  Removing log files...
del /s /q *.log >nul 2>&1

REM Remove temporary files
echo 🗑️  Removing temporary files...
del /s /q *.tmp >nul 2>&1
del /s /q *.temp >nul 2>&1

REM Remove OS generated files
echo 🗑️  Removing OS generated files...
del /s /q .DS_Store >nul 2>&1
del /s /q Thumbs.db >nul 2>&1

REM Remove IDE files
if exist ".vscode" (
    echo 🗑️  Removing .vscode directory...
    rmdir /s /q ".vscode"
)

if exist ".idea" (
    echo 🗑️  Removing .idea directory...
    rmdir /s /q ".idea"
)

REM Remove environment files (keep .env.example if it exists)
echo 🗑️  Removing environment files...
for /r . %%f in (.env) do @if exist "%%f" if not "%%~nxf"==".env.example" del "%%f"
del /s /q .env.local >nul 2>&1

echo ✅ Cleanup completed!
echo.
echo 📋 Files that were cleaned:
echo - node_modules directories
echo - build directories
echo - Python cache files (__pycache__, *.pyc)
echo - Log files (*.log)
echo - Temporary files (*.tmp, *.temp)
echo - OS files (.DS_Store, Thumbs.db)
echo - IDE files (.vscode, .idea)
echo - Environment files (.env, .env.local)
echo.
echo 🚀 Your project is now clean and ready for Git!
echo.
echo Next steps:
echo 1. git add .
echo 2. git commit -m "Initial commit with clean project structure"
echo 3. git push origin main

pause
