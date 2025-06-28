# 🌱 Plant Disease Detection - Backend API

FastAPI backend for the Plant Disease Detection application with AI/ML capabilities.

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

The API will be available at `http://localhost:8000`

### API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 📁 Project Structure

```
plant-disease-app-backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── Dockerfile          # Docker configuration
├── models/             # ML models directory
├── download_model.py   # Model download script
└── start_server.py     # Alternative server starter
```

## 🔧 API Endpoints

### Health Check
- `GET /health` - Check if the API is running

### Disease Detection
- `POST /predict` - Upload plant image for disease detection
- `POST /predict/{plant_type}` - Predict disease for specific plant type

### Plant Information
- `GET /plants` - Get list of supported plants
- `GET /diseases` - Get list of detectable diseases

## 🐳 Docker Deployment

```bash
# Build the image
docker build -t plant-disease-api .

# Run the container
docker run -p 8000:8000 plant-disease-api
```

## 🌐 Deployment Options

### Railway (Recommended)
1. Connect your GitHub repository
2. Select this backend folder
3. Railway will auto-deploy

### Heroku
```bash
heroku create your-backend-name
git subtree push --prefix=plant-disease-app-backend heroku main
```

### DigitalOcean App Platform
1. Connect GitHub repository
2. Set source directory to this folder
3. Configure build and run commands

## 🔒 Environment Variables

```bash
PORT=8000
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

## 🧠 ML Model

The application uses a TensorFlow/Keras model trained on the PlantVillage dataset to detect:

- **Apple**: Scab, Black Rot, Cedar Apple Rust
- **Tomato**: Early Blight, Late Blight, Leaf Mold, Bacterial Spot
- **Potato**: Early Blight, Late Blight
- **Corn**: Cercospora Leaf Spot, Common Rust, Northern Leaf Blight
- **Grape**: Black Rot, Esca, Leaf Blight
- **Pepper**: Bacterial Spot
- **Cherry**: Powdery Mildew
- **Strawberry**: Leaf Scorch

## 📝 License

MIT License - feel free to use this project for your own purposes!
