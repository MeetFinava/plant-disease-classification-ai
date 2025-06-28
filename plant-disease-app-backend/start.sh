#!/bin/bash
echo "Starting Plant Disease Detection API..."
echo "Installing dependencies..."
pip install -r requirements.txt
echo "Starting server..."
python main.py
