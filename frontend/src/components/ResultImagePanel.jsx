function ResultImagePanel({
  grayscalePreviewUrl,
  onSelectImage,
}) {
  return (
    <>
      <h3>Processed Image</h3>
      <p
        style={{
          color: "#666",
          fontSize: "14px",
          marginTop: "-10px",
        }}
      >
        Click the image to enlarge
      </p>

      {grayscalePreviewUrl && (
        <img
          src={grayscalePreviewUrl}
          alt="Processed Image"
          onClick={() => onSelectImage(grayscalePreviewUrl)}
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

export default ResultImagePanel;