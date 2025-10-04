#!/usr/bin/env bash
set -euo pipefail

# Default port if not set
PORT=${PORT:-5000}
WORKERS=${WEB_CONCURRENCY:-2}

# If models are missing, print a warning (the app itself will raise an error on missing models)
if [ ! -f "/app/notebook/eye_disease_model.h5" ] && [ ! -f "/app/eye_disease_model.h5" ] && [ ! -f "/app/notebook/model.h5" ] && [ ! -f "/app/notebook/model_cnn_fyp.keras" ]; then
  echo "Warning: no model file found in /app or /app/notebook. The service will fail unless models are mounted or present."
fi

# Start Gunicorn binding to the requested port
exec gunicorn -w "$WORKERS" -b 0.0.0.0:"$PORT" app:app
