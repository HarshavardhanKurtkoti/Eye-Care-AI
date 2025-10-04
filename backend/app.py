from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
import cv2
import tensorflow_hub as hub  # <-- Added for KerasLayer

# Load class names (should match the order used in training). Will prefer notebook/class_names.json if present.
DEFAULT_CLASS_NAMES = [
    'Central Serous Chorioretinopathy-Color Fundus',
    'Diabetic Retinopathy',
    'Disc Edema',
    'Glaucoma',
    'Healthy',
    'Macular Scar',
    'Myopia',
    'Pterygium',
    'Retinal Detachment',
    'Retinitis Pigmentosa'
]

BASE_DIR = os.path.dirname(__file__)

# Preferred model pipeline: preprocessor_model.h5 + model(.h5/.keras)
PREPROCESSOR_PATH = os.path.join(BASE_DIR, 'notebook', 'preprocessor_model.h5')
MODEL_CANDIDATES = [
    os.path.join(BASE_DIR, 'notebook', 'model_cnn_fyp.keras'),
    os.path.join(BASE_DIR, 'notebook', 'model.h5'),
]

# Fallback single-file end-to-end model (older export)
FALLBACK_END2END = [
    os.path.join(BASE_DIR, 'notebook', 'eye_disease_model.h5'),
    os.path.join(BASE_DIR, 'eye_disease_model.h5'),
]

IMAGE_SIZE = (224, 224)

# Load class names from JSON if present
CLASS_NAMES_PATH = os.path.join(BASE_DIR, 'notebook', 'class_names.json')
if os.path.exists(CLASS_NAMES_PATH):
    try:
        with open(CLASS_NAMES_PATH, 'r', encoding='utf-8') as f:
            CLASS_NAMES = json.load(f)
            if not isinstance(CLASS_NAMES, list) or not CLASS_NAMES:
                CLASS_NAMES = DEFAULT_CLASS_NAMES
    except Exception:
        CLASS_NAMES = DEFAULT_CLASS_NAMES
else:
    CLASS_NAMES = DEFAULT_CLASS_NAMES

# Attempt to load preprocessor if present
preprocessor_model = None
if os.path.exists(PREPROCESSOR_PATH):
    preprocessor_model = keras.models.load_model(PREPROCESSOR_PATH, compile=False)

# Choose classifier model
model_path = None
for p in MODEL_CANDIDATES:
    if os.path.exists(p):
        model_path = p
        break

combined_fallback = False
if model_path is None:
    for p in FALLBACK_END2END:
        if os.path.exists(p):
            model_path = p
            combined_fallback = True
            break

if model_path is None:
    raise FileNotFoundError('No model found. Expected one of: notebook/model_cnn_fyp.keras, notebook/model.h5, notebook/eye_disease_model.h5')

# Load the chosen classifier model
model = keras.models.load_model(
    model_path,
    custom_objects={'KerasLayer': hub.KerasLayer},
    compile=False,
)

def preprocess_image(file_stream):
    # Read image from file stream
    file_bytes = np.frombuffer(file_stream.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError('Invalid image')
    # Convert to RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # If preprocessor model is available, use it (matches notebook's exported preprocessor)
    if preprocessor_model is not None:
        batched = np.expand_dims(img, axis=0)  # uint8 RGB with batch dim
        return preprocessor_model.predict(batched)

    # Fallback: resize and apply EfficientNet preprocessing to approximate training pipeline
    resized = cv2.resize(img, IMAGE_SIZE, interpolation=cv2.INTER_AREA)
    x = np.expand_dims(resized, axis=0).astype(np.float32)
    # Try EfficientNet preprocess; if unavailable, return raw resized float32
    try:
        x = tf.keras.applications.efficientnet.preprocess_input(x)
    except Exception:
        pass
    return x

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    file = request.files['image']
    try:
        img = preprocess_image(file)
        preds = model.predict(img)
        pred_idx = np.argmax(preds, axis=1)[0]
        diagnosis = CLASS_NAMES[pred_idx]
        confidence = float(np.max(preds))
        return jsonify({'diagnosis': diagnosis, 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
    return 'Eye Disease Diagnosis API is running.'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
