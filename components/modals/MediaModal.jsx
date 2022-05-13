import React, { useState } from "react";
import FilesInMedia from "../media/FilesInMedia";
import { MdClear } from "react-icons/md";
import Uploader from "../media/Uploader";

const MediaModal = ({ itemImage, setItemImage, typeOfUpload }) => {
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
            <div className="d-flex justify-content-start">
              <a
                type="button"
                className={`mb-0 h6 text-decoration-none ${
                  !show ? "active" : "text-black"
                }`}
                onClick={() => setShow(false)}>
                Media
              </a>

              <a
                type="button"
                className={`mb-0 h6 ms-4 text-decoration-none ${
                  show ? "active" : "text-black"
                }`}
                onClick={() => setShow(true)}>
                Upload media
              </a>
            </div>
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
            {!show ? (
              <FilesInMedia />
            ) : (
              <form onSubmit={handleSubmit}>
                <Uploader typeOfUpload={typeOfUpload} />
              </form>
            )}
          </div>
          <div className="modal-footer text-muted d-md-flex justify-content-md-end">
            {!show ? (
              <a
                type="submit"
                className="btn btn-success me-3"
                disabled={!itemImage}>
                Select
              </a>
            ) : (
              <a
                type="submit"
                className="btn btn-info me-3"
                disabled={!itemImage}>
                Upload
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
