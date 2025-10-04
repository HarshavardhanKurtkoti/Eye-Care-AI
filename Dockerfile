# Use official Python slim image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install minimal system dependencies needed by OpenCV and TensorFlow wheels
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       libgl1 \
       libglib2.0-0 \
       libxfixes3 \
    && rm -rf /var/lib/apt/lists/*

# Copy only backend requirements first to take advantage of Docker layer caching
COPY backend/requirements.txt /app/requirements.txt

# Upgrade pip and install Python dependencies from requirements.txt
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r /app/requirements.txt

# Copy backend sources and models into image
COPY backend/ /app/

# Expose Flask default port used by app.py
EXPOSE 5000

# Environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask app
CMD ["python", "app.py"]
# Use official Python slim image
FROM python:3.10-slim

# Set working directory
# Set working directory
WORKDIR /app

# Install minimal system dependencies needed by OpenCV and TensorFlow wheels
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       libgl1 \
       libglib2.0-0 \
       libxfixes3 \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first to take advantage of Docker layer caching
COPY backend/requirements.txt /app/requirements.txt

# Upgrade pip and install Python dependencies from requirements.txt
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r /app/requirements.txt

# Copy backend sources and models (the backend folder's contents) into image
# This places app.py at /app/app.py and the notebook/ folder at /app/notebook
COPY backend/ /app/

# Expose Flask default port used by app.py
EXPOSE 5000

# Environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Run the Flask app
CMD ["python", "app.py"]
