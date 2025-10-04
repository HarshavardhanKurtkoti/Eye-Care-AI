#!/usr/bin/env bash
set -euo pipefail

# Default port if not set
PORT=${PORT:-5000}
WORKERS=${WEB_CONCURRENCY:-2}

echo "Starting entrypoint: PID $$"
echo "PORT=${PORT}, WORKERS=${WORKERS}"
echo "Environment vars:"
env

# If models are missing, print a warning (the app itself will raise an error on missing models)
if [ ! -f "/app/notebook/eye_disease_model.h5" ] && [ ! -f "/app/eye_disease_model.h5" ] && [ ! -f "/app/notebook/model.h5" ] && [ ! -f "/app/notebook/model_cnn_fyp.keras" ]; then
  echo "Warning: no model file found in /app or /app/notebook. The service will fail unless models are mounted or present."
fi

echo "Launching gunicorn on 0.0.0.0:${PORT} (workers=${WORKERS})"
# Start Gunicorn with debug logging and longer timeout to help platform detect the listening port
exec gunicorn -w "$WORKERS" -b 0.0.0.0:"$PORT" --log-level debug --timeout 120 app:app
