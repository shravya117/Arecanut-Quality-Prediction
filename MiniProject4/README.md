# Arecanut Quality Classifier

## Approach

- Organized the dataset into train, validation, and test splits across Good Quality, Kari Gotu, and Ulli classes to balance evaluation.
- Applied image preprocessing by converting uploads to RGB, resizing to 128x128, and normalizing pixels in the range [0, 1].
- Trained a convolutional neural network with TensorFlow/Keras to learn class-specific visual cues; persisted the weights as `arecanut_cnn_model.h5` for inference.
- Exposed a Flask API that loads the trained model once on startup and returns class probabilities for each prediction request.
- Built a React single-page interface that lets users upload images, forwards the payload to the Flask backend, and displays the predicted quality scores.

## Technical Stack

- **Modeling**: TensorFlow/Keras, Pillow, NumPy.
- **Backend**: Flask REST API with CORS enabled for browser clients.
- **Frontend**: React (create-react-app), interacting with the API through HTTP POST requests.
- **Environment**: Python 3.10 virtual environment for backend; Node.js with npm for frontend assets.

## Project Layout

- `backend/`: Flask server, model loader, and prediction endpoint (`/upload`).
- `frontend/arecanut/`: React client for uploading arecanut images and rendering results.
- `dataset/`: Training, validation, and testing images grouped by class labels.
- `arecanut_cnn_model.h5`: Serialized CNN weights used during inference.

## Running Locally

1. **Backend**
   - Navigate to `MiniProject4/backend`.
   - Activate the Python virtual environment or create one (`python -m venv .venv`).
   - Install dependencies: `pip install flask flask-cors pillow tensorflow numpy`.
   - Start the server: `python app.py` (runs on `http://127.0.0.1:5000`).
2. **Frontend**
   - Navigate to `MiniProject4/frontend/arecanut`.
   - Install packages: `npm install`.
   - Start the React dev server: `npm start` (serves `http://localhost:3000`).

## API Reference

- `POST /upload`
  - Accepts multipart form data (`file`) or JSON payload with a base64 image (`image`).
  - Returns JSON containing `success` and class probability scores for each category.

## Future Enhancements

- Add automated model evaluation metrics and confusion matrices to monitor performance shifts.
- Integrate model versioning and warm-up endpoints for faster cold starts.
- Harden the deployment with production-grade WSGI hosting and HTTPS termination.
