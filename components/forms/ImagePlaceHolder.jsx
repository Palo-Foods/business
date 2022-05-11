import React from 'react'
import {MdAttachFile, MdOutlineCloudUpload, MdOutlineExposurePlus1, MdAddToPhotos, MdOutlineAddToPhotos} from "react-icons/md"

function ImagePlaceHolder() {
  return (
    <div className="mt-4">
      <p className="mb-1">Add product image</p>
      <div className="d-flex justify-content-start align-items-top">
        <a
          className="me-3 bg-light d-flex justify-content-center align-items-center"
          style={{
            width: 150,
            height: 150,
            borderRadius: 5,
            border: "1px dashed #d5d6d7",
          }}>
          <MdOutlineAddToPhotos
            size={30}
            className="text-muted"
            color="#d5d6d7"
          />
        </a>

        {/*   <a
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#mediaModal"
                className="text-center mb-3"
                style={{
                  height: "215px",
                  width: "215px",
                  border: "1px dashed #ced4da",
                  borderStyle: "dashed",
                  borderRadius: 10,
                }}>
                {uploadedImage?.url ? (
                  <div>
                    <img
                      src={uploadedImage?.url}
                      alt="item-image"
                      className="img-fluid"
                      style={{ height: "objectFit" }}
                    />
                  </div>
                ) : (
                  <div>
                    {itemImage && (
                      <img
                        src={itemImage}
                        alt="item-image"
                        className="img-fluid"
                        style={{ height: "objectFit" }}
                      />
                    )}
                  </div>
                )}
              </a> */}
        <div>
          <button className="btn btn-light">
            <MdAttachFile />
            Choose file
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImagePlaceHolder