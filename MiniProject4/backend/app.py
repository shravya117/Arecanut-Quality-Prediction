from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_image
import base64
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' in request.files:
        file = request.files['file']
        try:
            img = Image.open(file.stream)
            prediction = predict_image(img)
            return jsonify({'success': True, 'prediction': prediction})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})
    elif request.is_json and 'image' in request.json:
        try:
            image_data = request.json['image']
            img_data = base64.b64decode(image_data.split(',')[1])
            img = Image.open(io.BytesIO(img_data))
            prediction = predict_image(img)
            return jsonify({'success': True, 'prediction': prediction})
        except Exception as e:
            return jsonify({'success': False, 'error': str(e)})
    return jsonify({'success': False, 'error': 'Invalid request'})

if __name__ == '__main__':
    app.run(debug=True)
