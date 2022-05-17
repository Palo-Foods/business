import React from "react";
import { MdOutlinePhoto } from "react-icons/md";
import MediaModal from "../modals/MediaModal"

function FilePicker({ image, setImage, width, height }) {
 
  return (
    <>
      <div className="d-flex justify-content-start align-items-top">
        <a
          data-bs-toggle="modal"
          data-bs-target="#mediaModal"
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

        {image && (
          <a>
            <img
              src={image}
              alt="item-image"
              className="img-fluid"
              style={{ height: "objectFit" }}
            />
          </a>
        )}
      </div>
      <MediaModal setImage={setImage} image={image} />
    </>
  );
}

export default FilePicker;
