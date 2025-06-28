from http.server import BaseHTTPRequestHandler
import json
import io
import random
from datetime import datetime
from urllib.parse import urlparse, parse_qs

# Plant disease classes
PLANT_CLASSES = {
    "apple": [
        "Apple___Apple_scab",
        "Apple___Black_rot", 
        "Apple___Cedar_apple_rust",
        "Apple___healthy"
    ],
    "tomato": [
        "Tomato___Bacterial_spot",
        "Tomato___Early_blight",
        "Tomato___Late_blight",
        "Tomato___Leaf_Mold",
        "Tomato___healthy"
    ],
    "potato": [
        "Potato___Early_blight",
        "Potato___Late_blight",
        "Potato___healthy"
    ],
    "corn": [
        "Corn_(maize)___Cercospora_leaf_spot",
        "Corn_(maize)___Common_rust",
        "Corn_(maize)___Northern_Leaf_Blight",
        "Corn_(maize)___healthy"
    ],
    "grape": [
        "Grape___Black_rot",
        "Grape___Esca_(Black_Measles)",
        "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
        "Grape___healthy"
    ],
    "pepper": [
        "Pepper,_bell___Bacterial_spot",
        "Pepper,_bell___healthy"
    ]
}

def get_all_classes():
    """Get all disease classes"""
    all_classes = []
    for plant_classes in PLANT_CLASSES.values():
        all_classes.extend(plant_classes)
    return sorted(all_classes)

def intelligent_prediction():
    """Generate intelligent prediction"""
    
    # Choose a random plant type
    plant_types = list(PLANT_CLASSES.keys())
    selected_plant = random.choice(plant_types)
    
    # Get diseases for this plant
    plant_diseases = PLANT_CLASSES[selected_plant]
    
    # 70% chance of healthy, 30% chance of disease
    is_healthy = random.random() > 0.3
    
    if is_healthy:
        # Select healthy class
        healthy_classes = [cls for cls in plant_diseases if "healthy" in cls.lower()]
        if healthy_classes:
            predicted_class = healthy_classes[0]
        else:
            predicted_class = plant_diseases[0]
        confidence = 0.85 + random.random() * 0.1
    else:
        # Select disease class
        disease_classes = [cls for cls in plant_diseases if "healthy" not in cls.lower()]
        if disease_classes:
            predicted_class = random.choice(disease_classes)
        else:
            predicted_class = plant_diseases[0]
        confidence = 0.75 + random.random() * 0.15
    
    # Generate top 3 predictions
    top_predictions = []
    
    # Main prediction
    plant_name = selected_plant.title()
    disease_name = predicted_class.split("___")[1].replace("_", " ").title()
    
    top_predictions.append({
        "plant": plant_name,
        "disease": disease_name,
        "confidence": confidence,
        "class_name": predicted_class
    })
    
    # Add 2 more predictions with lower confidence
    other_classes = [cls for cls in plant_diseases if cls != predicted_class]
    for i, cls in enumerate(other_classes[:2]):
        disease_name = cls.split("___")[1].replace("_", " ").title()
        top_predictions.append({
            "plant": plant_name,
            "disease": disease_name,
            "confidence": confidence - (0.1 + i * 0.1 + random.random() * 0.1),
            "class_name": cls
        })
    
    return {
        "prediction": top_predictions[0],
        "top_predictions": top_predictions,
        "confidence": confidence,
        "timestamp": datetime.now().isoformat(),
        "model_version": "demo-v1.0"
    }

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.end_headers()

    def do_GET(self):
        """Handle GET requests"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Parse the URL
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        
        try:
            if path == "/" or path == "":
                response = {
                    "message": "Plant Disease Detection API",
                    "version": "1.0.0",
                    "status": "active",
                    "endpoints": {
                        "health": "/health",
                        "classes": "/classes",
                        "predict": "/predict (POST)"
                    }
                }
            elif path == "/health":
                response = {
                    "status": "healthy",
                    "timestamp": datetime.now().isoformat(),
                    "service": "Plant Disease Detection API"
                }
            elif path == "/classes":
                response = {
                    "classes": get_all_classes(),
                    "total_classes": len(get_all_classes()),
                    "plants": list(PLANT_CLASSES.keys())
                }
            else:
                response = {"error": "Endpoint not found"}
                
        except Exception as e:
            response = {"error": str(e)}
        
        self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        """Handle POST requests"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Parse the URL
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        
        try:
            if path == "/predict":
                # For demo purposes, just return a prediction
                # In a real implementation, you'd process the uploaded image
                response = intelligent_prediction()
            else:
                response = {"error": "Endpoint not found"}
                
        except Exception as e:
            response = {"error": str(e)}
        
        self.wfile.write(json.dumps(response).encode())
