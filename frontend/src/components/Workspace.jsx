import OriginalImagePanel from "./OriginalImagePanel";
import ResultImagePanel from "./ResultImagePanel";
import ImageInfoPanel from "./ImageInfoPanel";

function Workspace({
  previewUrl,
  grayscalePreviewUrl,
  imageInfo,
  onSelectImage,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        alignItems: "flex-start",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: "1", minWidth: "320px" }}>
        <OriginalImagePanel
          previewUrl={previewUrl}
          onSelectImage={onSelectImage}
        />

        <ImageInfoPanel imageInfo={imageInfo} />
      </div>

      <div style={{ flex: "1", minWidth: "320px" }}>
        <ResultImagePanel
          grayscalePreviewUrl={grayscalePreviewUrl}
          onSelectImage={onSelectImage}
        />
      </div>
    </div>
  );
}

export default Workspace;