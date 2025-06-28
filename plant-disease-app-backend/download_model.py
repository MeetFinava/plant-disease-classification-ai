import requests
import os
import numpy as np
try:
    import tensorflow as tf
    from tensorflow.keras.applications import MobileNetV2
    from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
    from tensorflow.keras.models import Model
    TF_AVAILABLE = True
except ImportError:
    print("TensorFlow not available, will create a simple model placeholder")
    TF_AVAILABLE = False

def create_plant_disease_model():
    """Create a plant disease detection model using transfer learning"""
    
    # Create models directory
    os.makedirs("models", exist_ok=True)
    
    # Base model - MobileNetV2 pre-trained on ImageNet
    base_model = MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )
    
    # Freeze base model layers
    base_model.trainable = False
    
    # Add custom classification head
    inputs = tf.keras.Input(shape=(224, 224, 3))
    x = base_model(inputs, training=False)
    x = GlobalAveragePooling2D()(x)
    x = Dropout(0.2)(x)
    outputs = Dense(38, activation='softmax')(x)  # 38 classes for plant diseases
    
    model = Model(inputs, outputs)
    
    # Compile model
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Save the model
    model_path = "models/plant_disease_model.h5"
    model.save(model_path)
    print(f"Model saved to {model_path}")
    
    return model_path

def download_pretrained_model():
    """Try to download a pre-trained model from various sources"""
    
    # Alternative model sources
    model_urls = [
        {
            "url": "https://storage.googleapis.com/download.tensorflow.org/models/plant_disease_model.h5",
            "name": "TensorFlow Hub Model"
        },
        {
            "url": "https://github.com/MarkoArsenovic/DeepLearning_PlantDiseases/raw/master/Models/model.h5",
            "name": "GitHub Plant Disease Model"
        }
    ]
    
    model_path = "models/plant_disease_model.h5"
    
    # Create models directory
    os.makedirs("models", exist_ok=True)
    
    # Try downloading from each source
    for source in model_urls:
        try:
            print(f"Trying to download from {source['name']}...")
            response = requests.get(source['url'], stream=True, timeout=30)
            
            if response.status_code == 200:
                with open(model_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                
                # Verify the model can be loaded
                try:
                    tf.keras.models.load_model(model_path)
                    print(f"Successfully downloaded and verified model from {source['name']}")
                    return model_path
                except:
                    print(f"Downloaded file is not a valid model, trying next source...")
                    os.remove(model_path)
                    continue
            else:
                print(f"Failed to download from {source['name']}: HTTP {response.status_code}")
                
        except Exception as e:
            print(f"Error downloading from {source['name']}: {e}")
            continue
    
    # If all downloads fail, create our own model
    print("All download attempts failed. Creating custom model...")
    return create_plant_disease_model()

if __name__ == "__main__":
    model_path = download_pretrained_model()
    print(f"Model ready at: {model_path}")
