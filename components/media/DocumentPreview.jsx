import React from "react";
import { MdDocument } from "react-icons/md";

const DocumentPreview = ({ size }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-light text-center d-flex justify-content-center align-items-center">
        <MdDocument size={size} />
      </div>
    </div>
  );
};

export default DocumentPreview;
