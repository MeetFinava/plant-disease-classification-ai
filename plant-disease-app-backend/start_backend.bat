@echo off
echo 🌱 Starting Plant Disease Detection Backend...
echo.

REM Check if we're in the right directory
if not exist "main.py" (
    echo ❌ Error: main.py not found. Please run this script from the backend directory.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
pip install -r requirements.txt

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.
echo 🚀 Starting FastAPI server...
echo 📡 Backend will be available at: http://localhost:8000
echo 📚 API Documentation: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

python main.py

pause
