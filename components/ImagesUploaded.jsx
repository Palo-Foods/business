import React, { useState } from "react";
import { MdArrowBack, MdCloudUpload, MdDelete } from "react-icons/md";
import ImagesInMedia from "./ImagesInMedia";
import UploadImage from "./UploadImage";

function ImagesUploaded() {
  const [display, setDisplay] = useState(false);
  return (
    <div>
      <div className="my-3 vh-50">
        <div class="card vh-50">
          <div class="card-header p-0 d-flex justify-content-between w-100">
            <a
              type="button"
              className={`h6 text-decoration-none mb-0 w-100 text-center p-4 ${
                !display ? "text-primary bg-white border-0" : "text-dark"
              }`}
              onClick={() => setDisplay(false)}>
              Images
            </a>
            <a
              type="button"
              className={`h6 text-decoration-none mb-0 w-100 text-center p-4 ${
                display ? "text-primary bg-white border-0" : "text-dark"
              }`}
              onClick={() => setDisplay(true)}>
              Upload new image
            </a>
          </div>
          <div class="card-body" style={{ height: "30rem" }}>
            {display && <UploadImage />}
            {!display && <ImagesInMedia />}
          </div>
          <div class="card-footer text-muted d-md-flex justify-content-md-end">
            {!display && (
              <>
                <a class="btn btn-danger me-3 my-2">
                  <MdDelete size={18} className="mb-1" />
                  <span class="ms-2">Delete</span>
                </a>
                <a class="btn btn-success me-3 my-2">Select</a>
              </>
            )}

            {display && (
              <a class="btn btn-secondary my-2">
                <MdCloudUpload size={18} className="mb-1" />
                <span class="ms-2">Upload</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagesUploaded;
