"""
Quick smoke test for the saved models without starting Flask.

It will try the preferred pipeline:
  preprocessor_model.h5 + model.h5
and fallback to eye_disease_model.h5 if needed.

Usage (PowerShell):
  # From backend folder
  # Option A: let it auto-find a sample image under notebook datasets
  python test_infer.py

  # Option B: provide an explicit image path
  python test_infer.py --image "notebook/Original Dataset/Original Dataset/Healthy/xxx.jpg"
"""

from __future__ import annotations

import os
import argparse
import glob
import numpy as np
import cv2


CLASS_NAMES = [
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


def find_any_image() -> str | None:
    search_roots = [
        os.path.join('notebook', 'Original Dataset'),
        os.path.join('notebook', 'Augmented Dataset'),
        os.path.join('notebook', 'Original Dataset', 'Original Dataset'),
        os.path.join('notebook', 'Augmented Dataset', 'Augmented Dataset'),
    ]
    exts = ('*.jpg', '*.jpeg', '*.png', '*.bmp')
    for root in search_roots:
        if not os.path.isdir(root):
            continue
        for ext in exts:
            files = glob.glob(os.path.join(root, '**', ext), recursive=True)
            if files:
                return files[0]
    return None


def load_image(path: str) -> np.ndarray:
    data = cv2.imread(path)
    if data is None:
        raise ValueError(f"Failed to read image: {path}")
    data = cv2.cvtColor(data, cv2.COLOR_BGR2RGB)
    return data


def try_preprocessor_then_model(img_rgb: np.ndarray) -> tuple[str, float]:
    import tensorflow as tf  # noqa
    from tensorflow import keras
    import tensorflow_hub as hub

    pre_path = os.path.join('notebook', 'preprocessor_model.h5')
    model_path = os.path.join('notebook', 'model.h5')

    if not (os.path.exists(pre_path) and os.path.exists(model_path)):
        raise FileNotFoundError("preprocessor_model.h5 and/or model.h5 not found in notebook/")

    pre = keras.models.load_model(pre_path, compile=False)
    clf = keras.models.load_model(model_path, custom_objects={'KerasLayer': hub.KerasLayer}, compile=False)

    x = np.expand_dims(img_rgb, axis=0)  # uint8 RGB -> batch
    x = pre.predict(x)
    preds = clf.predict(x)
    idx = int(np.argmax(preds, axis=1)[0])
    conf = float(np.max(preds))
    return CLASS_NAMES[idx], conf


def try_end_to_end(img_rgb: np.ndarray) -> tuple[str, float]:
    # Fallback for older single-file model
    import tensorflow as tf  # noqa
    from tensorflow import keras
    import tensorflow_hub as hub

    path = 'eye_disease_model.h5'
    if not os.path.exists(path):
        path = os.path.join('notebook', 'eye_disease_model.h5')
    if not os.path.exists(path):
        raise FileNotFoundError("eye_disease_model.h5 not found in backend/ or backend/notebook/")

    clf = keras.models.load_model(path, custom_objects={'KerasLayer': hub.KerasLayer}, compile=False)

    # Heuristic preprocessing: resize to 224,224 if needed
    img = cv2.resize(img_rgb, (224, 224), interpolation=cv2.INTER_AREA)
    x = np.expand_dims(img, axis=0).astype(np.float32)
    # If model expected TFHub EfficientNet preprocessing, raw uint8 may underperform;
    # but we'll still attempt inference to verify the model loads.
    preds = clf.predict(x)
    idx = int(np.argmax(preds, axis=1)[0])
    conf = float(np.max(preds))
    return CLASS_NAMES[idx], conf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--image', type=str, help='Path to an example image')
    args = ap.parse_args()

    img_path = args.image or find_any_image()
    if not img_path:
        raise SystemExit("No sample image found. Provide --image <path> to test.")
    print(f"Using image: {img_path}")

    img = load_image(img_path)
    try:
        label, conf = try_preprocessor_then_model(img)
        print(f"[preprocessor+model] Prediction: {label}  confidence={conf:.4f}")
        return
    except Exception as e:
        print(f"preprocessor+model failed: {e}")

    try:
        label, conf = try_end_to_end(img)
        print(f"[eye_disease_model.h5] Prediction: {label}  confidence={conf:.4f}")
    except Exception as e:
        print(f"eye_disease_model.h5 failed: {e}")


if __name__ == '__main__':
    main()
