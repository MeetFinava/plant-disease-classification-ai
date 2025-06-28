#!/bin/bash
echo "Starting Plant Disease Detection API..."
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Starting server..."
uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
