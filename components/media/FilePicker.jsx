import React from "react";
import { MdOutlinePhoto } from "react-icons/md";
import MediaModal from "../modals/MediaModal";

function FilePicker({ image, setImage, width, height, id }) {
  return (
    <>
      <div className="d-flex justify-content-start align-items-top">
        <a
          data-bs-toggle="modal"
          data-bs-target="#mediaModal"
          type="button"
          id={id}>
          {!image && (
            <div
              className="bg-light d-flex justify-content-center align-items-center p-2"
              style={{
                width,
                height,
                borderRadius: 5,
                border: "1px dashed #d5d6d7",
              }}>
              <MdOutlinePhoto
                size={30}
                className="text-muted"
                color="#d5d6d7"
              />
            </div>
          )}
          {image && (
            <img
              src={image?.url}
              alt="item-image"
              className="img-fluid"
              style={{
                width: "auto",
                height: "100%",
                borderRadius: 5,
                border: "1px dashed #d5d6d7",
                objectFit: "contain",
              }}
              id={id}
            />
          )}
        </a>
      </div>
      <MediaModal id={id} setImage={setImage} image={image} />
    </>
  );
}

export default FilePicker;
