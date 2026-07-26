function ImageInfoPanel({ imageInfo }) {
  if (!imageInfo) {
    return null;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Image Information</h3>

      <p>
        <strong>Filename:</strong> {imageInfo.filename}
      </p>

      <p>
        <strong>Format:</strong> {imageInfo.format}
      </p>

      <p>
        <strong>Width:</strong> {imageInfo.width} px
      </p>

      <p>
        <strong>Height:</strong> {imageInfo.height} px
      </p>

      <p>
        <strong>Color Mode:</strong> {imageInfo.mode}
      </p>

      <p>
        <strong>Size:</strong> {imageInfo.size} bytes
      </p>
    </div>
  );
}

export default ImageInfoPanel;