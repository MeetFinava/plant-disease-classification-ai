from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

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

@app.get("/")
def get_classes():
    return {
        "classes": get_all_classes(),
        "total_classes": len(get_all_classes()),
        "plants": list(PLANT_CLASSES.keys())
    }

handler = app
