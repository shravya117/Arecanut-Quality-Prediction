import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const [prediction, setPrediction] = useState("None");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFileInputDisabled, setIsFileInputDisabled] = useState(false);
  const [isCaptureDisabled, setIsCaptureDisabled] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [imageData, setImageData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For previewing the selected or captured image

  const handleFileInputChange = () => {
    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      setImageData(file);
      setPreviewImage(URL.createObjectURL(file)); // Display image preview
      setIsCaptureDisabled(true);
    }
  };

  const handleCaptureBtnClick = async () => {
    setIsFileInputDisabled(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.style.display = "block";
      videoRef.current.srcObject = stream;

      videoRef.current.addEventListener("click", () => {
        const canvas = canvasRef.current;
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const base64Image = canvas.toDataURL("image/jpeg");
        setImageData(base64Image);
        setPreviewImage(base64Image); // Display captured image as preview
        videoRef.current.style.display = "none";
        stream.getTracks().forEach((track) => track.stop());
      });
    } catch (error) {
      alert("Error accessing the camera: " + error.message);
    }
  };

  const handleUpload = () => {
    if (!imageData) {
      alert("Please select or capture an image first.");
      return;
    }

    setPrediction("Processing...");
    setIsProcessing(true);

    const formData = new FormData();
    if (typeof imageData === "string") {
      fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      })
        .then((response) => response.json())
        .then(handleResponse)
        .catch(handleError);
    } else {
      formData.append("file", imageData);

      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then(handleResponse)
        .catch(handleError);
    }
  };

  const handleResponse = (data) => {
    if (data.success) {
      const resultText = Object.entries(data.prediction)
        .filter(([key, value]) => !isNaN(value)) // Filter out NaN values
        .map(([key, value]) => `${key}: ${(value / 100).toFixed(2)}%`) // Divide by 100 and format
        .join(", ");
      setPrediction(resultText);
    } else {
      setPrediction(`Error: ${data.error}`);
    }
    setIsProcessing(false);
    setIsFileInputDisabled(false);
    setIsCaptureDisabled(false);
  };

  const handleError = (error) => {
    setPrediction("Error processing the image.");
    setIsProcessing(false);
    setIsFileInputDisabled(false);
    setIsCaptureDisabled(false);
    console.error("Error:", error);
  };

  return (
    <div className="container">
      <h1>Arecanut Quality Predictor</h1>
      <p>Choose an option to predict the quality:</p>

      <div className="option-container">
        <label htmlFor="fileInput">Upload an Image:</label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          disabled={isProcessing || isCaptureDisabled}
        />
      </div>

      <div className="option-container">
        <button
          onClick={handleCaptureBtnClick}
          disabled={isProcessing || isFileInputDisabled}
        >
          Click a Photo
        </button>
      </div>

      <div className="option-container">
        <button onClick={handleUpload} disabled={isProcessing || !imageData}>
          Upload Image
        </button>
      </div>

      {/* Display preview image */}
      {previewImage && (
        <div className="image-preview">
          <h3>Preview:</h3>
          <img src={previewImage} alt="Selected or Captured" />
        </div>
      )}

      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <p>Prediction: {prediction}</p>
    </div>
  );
};

export default App;
