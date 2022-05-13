import React from "react";

const ImagePreview = ({ src, width, height, className }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="bg-light text-center d-flex justify-content-center align-items-center p-2 rounded"
        style={{ width: width, height: height, border: "1px dashed grey" }}>
        <img
          src={src}
          width={width}
          height={height}
          alt=""
          className={className}
        />
      </div>
    </div>
  );
};

export default ImagePreview;