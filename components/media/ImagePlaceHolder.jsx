import React from "react";
import { MdCloudUpload } from "react-icons/md";

function ImagePlaceHolder({ width, height }) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="text-center"
        /* style={{ width: width, height: height, border: "1px dashed grey" }} */>
        <MdCloudUpload size={30} className="text-muted" color="#d5d6d7" />
        <p>Upload file/image</p>
      </div>
    </div>
  );
}

export default ImagePlaceHolder;
