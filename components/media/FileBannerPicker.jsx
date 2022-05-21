import React from "react";
import { MdOutlinePhoto } from "react-icons/md";
import MediaModal from "../modals/MediaModal";

function FileBannerPicker({ image, setImage, width, height }) {
  return (
    <>
      <div className="d-flex justify-content-start align-items-top">
        <a
          data-bs-toggle="modal"
          data-bs-target="#mediaModal"
          type="button"
          className="bg-light d-flex justify-content-center align-items-center p-2"
          style={{
            width: width,
            height: height,
            borderRadius: 5,
            border: "1px dashed #d5d6d7",
          }}>
          {!image && (
            <MdOutlinePhoto size={30} className="text-muted" color="#d5d6d7" />
          )}
          {image && (
            <a>
              <img
                src={image?.url}
                alt="item-image"
                className="img-fluid"
                style={{ height: "objectFit" }}
              />
            </a>
          )}
        </a>
      </div>
      <MediaModal setImage={setImage} image={image} />
    </>
  );
}

export default FileBannerPicker;
