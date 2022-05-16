import React, { useState } from "react";
import FilesInMedia from "../media/FilesInMedia";
import { MdClear } from "react-icons/md";

const MediaModal = ({ image, setImage }) => {
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="modal fade"
      id="mediaModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
      style={{ paddingRight: 0 }}>
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-fullScreen modal-lg"
        role="document">
        <div className="modal-content">
          <div className="modal-header py-2 d-flex align-items-center pe-0">
            <h6 className="mb-0 text-decoration-none">Media</h6>
            <button
              type="button"
              className="btn btn-default"
              data-bs-dismiss="modal">
              <span className="bg-light rounded-circle p-2">
                <MdClear size={20} className="" />
              </span>
            </button>
          </div>

          <div className="modal-body">
            <FilesInMedia />
          </div>
          <div className="modal-footer text-muted d-md-flex justify-content-md-end">
            <a type="submit" className="btn btn-success me-3" disabled={!image}>
              Select
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
