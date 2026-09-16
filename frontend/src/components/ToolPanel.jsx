function ToolPanel({
  onDownload,
  onReset,
  onInvert,
  onThreshold,
  onGaussianBlur,
  thresholdValue,
  onThresholdValueChange,
  blurValue,
  onBlurValueChange,
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

    <div style={{ marginTop: "10px" }}>
      <label>
        Threshold: {thresholdValue}
     </label>

   <input
     type="range"
     min="0"
     max="255"
     value={thresholdValue}
     onChange={(e) =>
       onThresholdValueChange(Number(e.target.value))
     }
     style={{ width: "100%" }}
   />
  </div>

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

<div style={{ marginTop: "10px" }}>
  <label>
    Gaussian Blur: {blurValue}
  </label>

  <input
    type="range"
    min="1"
    max="31"
    step="2"
    value={blurValue}
    onChange={(e) =>
      onBlurValueChange(Number(e.target.value))
    }
    style={{ width: "100%" }}
  />
</div>

</div>

</div>
    
  );
}

export default ToolPanel;