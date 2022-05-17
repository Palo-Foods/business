import React from "react";
import { MdPictureAsPdf } from "react-icons/md";

const DocumentPreview = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <MdPictureAsPdf size={120} />
      </div>
    </div>
  );
};

export default DocumentPreview;
