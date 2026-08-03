function ToolPanel({
  onDownload,
  onReset,
  onInvert,
  onThreshold,
  onGaussianBlur,
}) {
  return (
    <div>
      <h2>🛠 Image Processing Tools</h2>

      <div>
        <h3>File</h3>

        <button
          onClick={onDownload}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          💾 Download Result
        </button>

        <button
          onClick={onReset}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          🗑 Reset
        </button>
      
      </div>
       <div>
        <h3>Filters</h3>

      <button
        onClick={onInvert}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
         🔄 Invert
      </button>

      <button
        onClick={onThreshold}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
         ⚫ Threshold
      </button>

      <button
        onClick={onGaussianBlur}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        🌫 Gaussian Blur
      </button>

       </div>
    </div>
    
  );
}

export default ToolPanel;