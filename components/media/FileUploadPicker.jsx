import React from "react";
import { MdOutlinePhoto } from "react-icons/md";

function FileUploadPicker({ image, setImage, width, height }) {
  return (
    <div className="">
      <div className="d-flex justify-content-start align-items-top">
        <a
          data-bs-toggle="modal"
          data-bs-target="#uploadMediaModal"
          type="button"
          className="me-3 bg-light d-flex justify-content-center align-items-center"
          style={{
            width: width,
            height: height,
            borderRadius: 5,
            border: "1px dashed #d5d6d7",
          }}>
          <MdOutlinePhoto size={30} className="text-muted" color="#d5d6d7" />
        </a>
      </div>
    </div>
  );
}

export default FileUploadPicker;
