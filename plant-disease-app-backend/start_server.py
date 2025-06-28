#!/usr/bin/env python3
"""
Startup script for the Plant Disease Detection API server
"""

import subprocess
import sys
import os
import time

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def download_model():
    """Download the plant disease model"""
    print("Setting up the plant disease model...")
    try:
        subprocess.check_call([sys.executable, "download_model.py"])
        print("✅ Model setup completed!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error setting up model: {e}")
        return False
    return True

def start_server():
    """Start the FastAPI server"""
    print("Starting the Plant Disease Detection API server...")
    print("🌱 Server will be available at: http://localhost:8000")
    print("📖 API documentation: http://localhost:8000/docs")
    print("🔄 Health check: http://localhost:8000/health")
    print("\nPress Ctrl+C to stop the server\n")
    
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload"
        ])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")

def main():
    """Main function to set up and start the server"""
    print("🌱 Plant Disease Detection API Setup")
    print("=" * 40)
    
    # Change to backend directory
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(backend_dir)
    
    # Install requirements
    if not install_requirements():
        print("❌ Failed to install requirements. Exiting.")
        sys.exit(1)
    
    # Download model
    if not download_model():
        print("❌ Failed to set up model. Exiting.")
        sys.exit(1)
    
    # Start server
    start_server()

if __name__ == "__main__":
    main()
