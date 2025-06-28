#!/usr/bin/env python3
"""
Railway startup script for Plant Disease Detection API
"""
import os
import sys

def main():
    print("🚀 Starting Plant Disease Detection API on Railway...")
    
    # Get port from environment
    port = os.environ.get("PORT", "8000")
    print(f"📡 Using port: {port}")
    
    # Set environment variables
    os.environ["PORT"] = str(port)
    
    # Import and run the main app
    try:
        from main import app
        import uvicorn
        
        print("✅ FastAPI app imported successfully")
        print(f"🌐 Starting server on 0.0.0.0:{port}")
        
        uvicorn.run(
            app, 
            host="0.0.0.0", 
            port=int(port),
            log_level="info"
        )
        
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
