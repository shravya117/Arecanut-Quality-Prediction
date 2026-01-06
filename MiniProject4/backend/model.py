

import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

model = load_model('./arecanut_cnn_model.h5')
categories = {0: 'Good Quality', 1: ' Kari Gotu', 2: 'Ulli'}
def predict_image(image):
    try:
        image = image.convert("RGB").resize((128, 128))
        img_array = img_to_array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        predictions = model.predict(img_array)[0]
        print("Raw Predictions:", predictions)  # Debug output
        print("Sum of Predictions:", np.sum(predictions))  # Check if softmax sums to 1
        return {categories[i]: round(float(predictions[i]) * 100, 2) for i in range(len(categories))}
    except Exception as e:
        print("Error in prediction:", str(e))
        raise e

