import React from "react";
import { MdClose } from "react-icons/md";

const Alert = ({ message, type, onClick }) => {
  return (
    <div
      className={`alert mb-3 alert-${type} alert-dismissible fade show my-1 py-0 ps-0`}
      role="alert">
      <button
        type="button"
        className="btn btn-default btn-sm p-1"
        data-bs-dismiss="alert"
        aria-label="Close">
        <MdClose className="ms-0" />
      </button>
      <small>{message}</small>
    </div>
  );
};

export default Alert;
