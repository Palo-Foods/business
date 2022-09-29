import React, { useRef, useState } from "react";
import MediaList from "./MediaList";

function UploadModal({ selectedImage, setSelectedImage }) {
  const uploadForm = useRef();

  const clearForm = () => {
    setSelectedImage("");
    resetForm();
  };

  const resetForm = () => {
    uploadForm?.current?.reset();
  };

  return (
    <>
      <div className="modal" tabIndex="-1" id="mediaModal">
        <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header border-0 px-3 px-lg-5">
              <h5 className="modal-title">Choose an image</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body px-3 px-lg-5">
              <div className="input-group mb-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search image"
                />
              </div>
              <p>Images</p>
              <MediaList
                setSelectedImage={setSelectedImage}
              />
            </div>
            <div className="modal-footer d-flex justify-content-between px-md-5 w-100">
              <div className="pb-2 d-flex justify-content-start">
                <button
                  className="btn btn-primary me-3 rounded-pill px-3 px-md-4"
                  type="button"
                  disabled={!selectedImage?.name}
                  data-bs-dismiss="modal"
                  onClick={resetForm}>
                  Ok
                </button>
                <button
                  className="btn btn-light px-3 d-none d-md-block"
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={clearForm}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadModal;
