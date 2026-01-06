# Arecanut-Quality-Prediction

A machine learning application that predicts the quality of arecanut (betel nut) using Convolutional Neural Networks. The system classifies arecanuts into three categories: **Good Quality**, **Kari Gotu** (partially spoiled), and **Ulli** (poor quality).

## Project Overview

This project implements an end-to-end deep learning solution with:
- A trained CNN model for image classification
- A Flask REST API backend for predictions
- A React web interface for user interactions
- A well-organized dataset split for training, validation, and testing

## Dataset Structure

The project uses a labeled image dataset organized into three directories:

### Training Dataset (`dataset/train/`)
- **Good Quality**: Images of high-quality arecanuts
- **Kari Gotu**: Images of arecanuts with partial spoilage
- **Ulli**: Images of poor-quality or severely damaged arecanuts

**Note**: To run the project, ensure that training images are placed in the respective class folders within `dataset/train/`.

### Validation Dataset (`dataset/validation/`)
- Same three class folders as training
- Used to evaluate model performance during training
- Helps prevent overfitting and tune hyperparameters

**Note**: Add validation images to the corresponding class folders within `dataset/validation/`.

### Test Dataset (`dataset/test/`)
- Contains test images for final model evaluation
- Images should be organized by class labels

## Technical Stack

- **Modeling**: TensorFlow/Keras, Pillow, NumPy, OpenCV
- **Backend**: Flask REST API with CORS support
- **Frontend**: React with create-react-app
- **Environment**: Python 3.8+ for backend; Node.js 14+ with npm for frontend


## How to Run the Project

### Prerequisites

- Python 3.8 or higher
- Node.js 14+ and npm
- Git (for version control)

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd MiniProject4/backend
   python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
python app.py

#frontend
cd MiniProject4/frontend/arecanut
npm install
npm start
