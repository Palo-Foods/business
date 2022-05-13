import React from "react";

function ImagePlaceHolder({ text, width, height }) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="bg-light text-center d-flex justify-content-center align-items-center"
        style={{ width: width, height: height, border: "1px dashed grey" }}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ImagePlaceHolder;
