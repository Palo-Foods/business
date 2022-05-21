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
          className="bg-light d-flex justify-content-center align-items-center p-2"
          style={{
            width: "auto",
            height: "100%",
            borderRadius: 5,
            border: "1px dashed #d5d6d7",
          }}
          id={id}>
          {!image && (
            <MdOutlinePhoto size={30} className="text-muted" color="#d5d6d7" />
          )}
          {image && (
            <img
              src={image?.url}
              alt="item-image"
              className="img-fluid"
              style={{ objectFit: "contain" }}
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
