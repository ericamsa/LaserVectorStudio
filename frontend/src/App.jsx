import { useEffect, useRef, useState } from "react";
import Workspace from "./components/Workspace";
import ToolPanel from "./components/ToolPanel";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageInfo, setImageInfo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [grayscalePreviewUrl, setGrayscalePreviewUrl] = useState("");
  const [status, setStatus] = useState("Connecting to API...");
  const [fileName, setFileName] = useState("");
  const [thresholdValue, setThresholdValue] = useState(127);
  const [blurValue, setBlurValue] = useState(5);
  const fileInputRef = useRef(null);
  


  useEffect(() => {
    fetch("http://127.0.0.1:8000")
      .then((res) => res.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus("Backend not connected"));
  }, []);

  useEffect(() => {
  if (!selectedFile) {
    return;
  }

 
  const timer = setTimeout(() => {
    applyFilter(
      "http://127.0.0.1:8000/threshold",
      {
        threshold: thresholdValue,
      }
    );
  }, 300);

  return () => clearTimeout(timer);
}, [thresholdValue, selectedFile]);

useEffect(() => {
  if (!selectedFile) {
    return;
  }

  const timer = setTimeout(() => {
    applyFilter(
      "http://127.0.0.1:8000/gaussian-blur",
      {
        blur: blurValue,
      }
    );
  }, 300);

  return () => clearTimeout(timer);
}, [blurValue, selectedFile]);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function uploadFile() {
    if (!selectedFile) {
      setStatus("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setStatus("Uploading file...");

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setImageInfo(data);

      setGrayscalePreviewUrl(
        `http://127.0.0.1:8000/uploads/${data.grayscale_file}`
      );

      setStatus(`Uploaded: ${data.filename} (${data.size} bytes)`);
    } catch (error) {
      setStatus("Upload failed");
    }
  }

  async function handleDownload() {
  if (!grayscalePreviewUrl) {
    alert("No processed image available.");
    return;
  }

  
  const response = await fetch(grayscalePreviewUrl);
  const blob = await response.blob();

  const downloadUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "grayscale-result.jpg";

  link.click();

  URL.revokeObjectURL(downloadUrl);

}

function handleReset() {
  setSelectedFile(null);
  setPreviewUrl("");
  setGrayscalePreviewUrl("");
  setImageInfo(null);
  setFileName("");
  setThresholdValue(127);
  setBlurValue(5);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
  
}

async function applyFilter(endpoint, options = {}) {
  const formData = new FormData();
  formData.append("file", selectedFile);

  if (options.threshold !== undefined) {
    formData.append("threshold", options.threshold);
 }

  if (options.blur !== undefined) {
    formData.append("blur", options.blur);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);

  setGrayscalePreviewUrl(imageUrl);
}


async function handleInvert() {
  await applyFilter("http://127.0.0.1:8000/invert");
  }

async function handleThreshold() {
  await applyFilter(
    "http://127.0.0.1:8000/threshold",
    {
      threshold: thresholdValue,
    }
  );
}

    async function handleGaussianBlur() {
      await applyFilter(
        "http://127.0.0.1:8000/gaussian-blur",
       {
           blur: blurValue,
       }
      );
    }
        

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Laser Vector Studio</h1>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <hr />

      <h2>Upload File</h2>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
      />
      <br />
      <br />

      <button onClick={uploadFile}>Upload</button>

      {fileName && <p>Selected file: {fileName}</p>}

      <ToolPanel
        onDownload={handleDownload}
        onReset={handleReset}
        onInvert={handleInvert}
        onThreshold={handleThreshold}
        onGaussianBlur={handleGaussianBlur}
        thresholdValue={thresholdValue}
        onThresholdValueChange={setThresholdValue}
        blurValue={blurValue}
        onBlurValueChange={setBlurValue}
      />

      <Workspace
        previewUrl={previewUrl}
        grayscalePreviewUrl={grayscalePreviewUrl}
        imageInfo={imageInfo}
        onSelectImage={setSelectedImage}
      />

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                border: "none",
                background: "#ffffff",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="Selected"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;