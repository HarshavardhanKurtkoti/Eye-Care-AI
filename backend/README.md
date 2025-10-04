# Backend — Vision-AI

This README covers running and deploying the Flask + TensorFlow backend.

Prerequisites
- Python 3.10
- pip
- (Optional) Docker for container builds

Quick start (local, virtualenv recommended)
```bash
cd backend
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```
The API will be available at `http://127.0.0.1:5000` and exposes the `/predict` endpoint.

API
- POST `/predict`
  - Body: `multipart/form-data` with an `image` file
  - Response example:
  ```json
  { "diagnosis": "Glaucoma", "confidence": 0.98 }
  ```

Docker (recommended for deploy)
- The repository root contains a `Dockerfile` that copies the `backend/` folder into the image. From the repo root you can build:
```powershell
docker build -t eye-disease-backend:latest .
```
Run the container:
```powershell
docker run --rm -p 5000:5000 --name eye-disease-backend eye-disease-backend:latest
```

Notes
- The backend loads model files from `backend/` and `backend/notebook/` (see `app.py`). Ensure `eye_disease_model.h5` or other model artifacts are present at build time or mounted at runtime.
- TensorFlow wheels are large — expect long build times and a large Docker image.
- If model files are too large for GitHub, upload them directly to your cloud host or download them on first-run from object storage.

Environment variables
- `PORT` — optional, default 5000

Render deploy tips
1. Push to GitHub (or another Git provider).
2. Create a Web Service on Render and point it at the repo.
3. Ensure Render builds from the repo root (root `Dockerfile` will be used).
4. If the model file is too large for your Git provider, upload or fetch it from storage during boot.

Troubleshooting
- CORS issues: confirm `flask-cors` is installed and the frontend uses the correct backend URL.
- Model load errors: check paths in `app.py` and confirm the model files exist in the image/container.
- Pip/TensorFlow wheel errors: use the base `python:3.10-slim` image or the official TensorFlow images if your platform requires it.

Reference
See repository `README.md` in project root for full project details.