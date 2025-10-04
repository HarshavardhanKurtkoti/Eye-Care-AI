# Backend — Vision-AI

This README covers running and deploying the Flask + TensorFlow backend.

Prerequisites
- Python 3.10
- pip
- (Optional) Docker for container builds
- Git LFS is used for model files; contributors should run `git lfs install` before cloning.

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

Notes:
- The image will include whatever is in `backend/` at build time (including model files). If models are large, consider mounting them at runtime or hosting them externally.
- TensorFlow and OpenCV add significant size to the image — expect a large image and longer build times.

Deploying to Render with Docker
- Render supports Git LFS and Docker builds. Set up a Web Service on Render pointing to the repo root and select the Docker environment. Ensure `PORT` environment variable is honored (the Docker entrypoint uses `$PORT`).
- If build fails due to memory, choose a larger instance or use a TensorFlow base image.

---

Environment variables
- `PORT` — optional, default 5000

---

Troubleshooting
- CORS issues: confirm `flask-cors` is installed and the frontend uses the correct backend URL.
- Model load errors: check paths in `app.py` and confirm the model files exist in the image/container.
- Pip/TensorFlow wheel errors: use the base `python:3.10-slim` image or the official TensorFlow images if your platform requires it.

Reference
See repository `README.md` in project root for full project details.