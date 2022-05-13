import React from "react";
import { MdDocument } from "react-icons/md";

const DocumentPlaceHolder = ({ text, size }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bg-light text-center d-flex justify-content-center align-items-center">
        <MdDocument size={size} className="text-muted" />
        <p>{text}</p>
      </div>
    </div>
  );
};

export default DocumentPlaceHolder
