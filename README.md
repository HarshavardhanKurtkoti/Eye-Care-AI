# Vision-AI: Eye Disease Diagnosis Platform

## Overview
Vision-AI is a full-stack AI-powered platform for diagnosing eye diseases from fundus images. It includes a Flask backend that serves a Keras/TensorFlow model (EfficientNetV2 via TensorFlow Hub) and a React + Vite frontend for user interaction. The backend is containerized with Docker for easy deployment; the frontend is suited for Vercel. The backend can be deployed to Render or any cloud provider that supports Docker.

---

## Features
- AI Diagnosis: upload fundus images and receive predictions for multiple eye diseases.
- Deep Learning Model: EfficientNetV2-based Keras model trained on a diverse dataset.
- Modern UI: React + Tailwind CSS frontend for a smooth user experience.
- REST API: Flask backend exposes a `/predict` endpoint for image inference.
- Dockerized Backend: easy to build and deploy anywhere.
- Cloud Ready: backend deployable on Render; frontend deployable on Vercel.
- CORS Enabled: backend allows secure cross-origin requests from the frontend.

---

## Repository structure
```
Vision-AI/
├── backend/
│   ├── app.py                  # Flask API server
│   ├── requirements.txt        # Python dependencies
│   ├── eye_disease_model.h5    # Trained Keras model (may be large)
│   └── notebook/               # Model training notebooks & data
├── frontend/
│   ├── src/                    # React source code (components, pages)
│   └── package.json            # Frontend dependencies
├── Dockerfile                  # Docker build for backend (root-level, builds backend/)
└── README.md                   # (this file)
```

---

## Backend (Flask + Keras)

### Key files
- `backend/app.py` — Flask app with `/predict` endpoint, model loading and preprocessing.
- `backend/requirements.txt` — Python dependencies (TensorFlow, OpenCV, Flask, etc.).
- `backend/eye_disease_model.h5` — trained model file (ensure present at build/deploy time).

### API
- POST `/predict`
  - Body: `multipart/form-data` with an `image` field
  - Response: JSON `{ "diagnosis": "Glaucoma", "confidence": 0.98 }`

### Image preprocessing
- Images are converted to RGB, resized to 224×224 and preprocessed to match the model training (EfficientNet preprocessing or exported preprocessor model if included).

### Run locally
```bash
cd backend
pip install -r requirements.txt
python app.py
```
The API will be available at `http://127.0.0.1:5000`.

---

## Docker (backend-only)
The repository includes a root-level `Dockerfile` that builds the backend by copying `backend/` into the image. This keeps the container focused on the Flask service.

Build locally (from repo root):
```powershell
docker build -t eye-disease-backend:latest .
```

Run locally:
```powershell
docker run --rm -p 5000:5000 --name eye-disease-backend eye-disease-backend:latest
```

Notes:
- The image will include whatever is in `backend/` at build time (including model files). If models are large, consider mounting them at runtime or hosting them externally.
- TensorFlow and OpenCV add significant size to the image — expect a large image and longer build times.

---

## Frontend (React + Vite + Tailwind)

### Run locally
```bash
cd frontend
npm install
npm run dev
```
The dev server will typically be on `http://localhost:5173`.

### Configure API URL
Set backend URL via environment variable in `frontend/.env`:
```env
VITE_REACT_APP_API_URL=https://your-backend.onrender.com
```
If not set, the frontend defaults to `http://127.0.0.1:5000` for local development.

---

## Deployment

### Backend on Render (recommended)
1. Push the repository to GitHub (including model files if not too large).
2. Create a new Web Service on Render and point it at your repo.
   - If Render builds from repo root, it will use the root `Dockerfile` to build the backend service.
   - Start command not required (Dockerfile CMD is used). If you prefer, set `PORT=5000` in environment variables.
3. If your model file is too large to push to GitHub, upload it to the Render instance after the initial deploy (via the Shell or SFTP) or fetch it from external storage on boot.

### Frontend on Vercel
1. Push `frontend/` to GitHub.
2. Create a new Vercel project and select the `frontend` directory.
3. Add `VITE_REACT_APP_API_URL` env var (the Render URL) in Vercel settings.

---

## Environment variables
- Backend: `PORT` (default 5000)
- Frontend: `VITE_REACT_APP_API_URL`

---

## Troubleshooting
- Docker build errors: retry or switch apt mirror if package fetches fail.
- Model not found: ensure `eye_disease_model.h5` is present inside `backend/` or mounted at runtime.
- CORS errors: backend uses `flask-cors`; confirm CORS settings and that frontend sends requests to the correct backend URL.
- TensorFlow warnings about CUDA: normal on CPU-only machines — ignore unless you need GPU.

---

## Credits
- Model architecture: EfficientNetV2 via TensorFlow Hub
- Frontend: React, Vite, Tailwind CSS
- Backend: Flask, TensorFlow, OpenCV

---

## License
This project is provided for educational and research purposes. Check dataset/model licenses before commercial use.

---

## Model architecture (summary)

- Input: (224, 224, 3) RGB fundus images
- Feature extractor: EfficientNetV2 (KerasLayer from TensorFlow Hub)
- Dense blocks: Dense(512) → BN → Dropout → Dense(256) → BN → Dropout → Dense(128) → BN → Dropout → Output Dense(num_classes)
- Regularization: BatchNormalization and Dropout after dense layers

Visual: `backend/notebook/eye_disease_model.png` (if present)
