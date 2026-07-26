function OriginalImagePanel({ previewUrl, onSelectImage }) {
  return (
    <>
      <h3>Original Image</h3>

      <p
        style={{
          color: "#666",
          fontSize: "14px",
          marginTop: "-10px",
        }}
      >
        Click the image to enlarge
      </p>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Original Preview"
          onClick={() => onSelectImage(previewUrl)}
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "500px",
            objectFit: "contain",
            border: "1px solid #ccc",
            borderRadius: "8px",
            cursor: "zoom-in",
          }}
        />
      )}
    </>
  );
}

export default OriginalImagePanel;