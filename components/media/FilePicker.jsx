import React from "react";
import Link from "next/link";
import { MdAttachFile, MdDocument, MdOutlinePhoto } from "react-icons/md";
import MediaModal from "../modals/MediaModal";

function FilePicker({ itemImage, setItemImage, type, typeOfUpload }) {
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-start align-items-top">
        <a
          data-bs-toggle="modal"
          data-bs-target="#mediaModal"
          type="button"
          className="me-3 bg-light d-flex justify-content-center align-items-center"
          style={{
            width: 150,
            height: 150,
            borderRadius: 5,
            border: "1px dashed #d5d6d7",
          }}>
          {type === "photo" && (
            <MdOutlinePhoto size={30} className="text-muted" color="#d5d6d7" />
          )}
          {type === "document" && (
            <MdDocument size={30} className="text-muted" color="#d5d6d7" />
          )}
        </a>

        {itemImage && (
          <Link href="/media/files">
            <a>
              <img
                src={itemImage}
                alt="item-image"
                className="img-fluid"
                style={{ height: "objectFit" }}
              />
            </a>
          </Link>
        )}
        <div>
          <a
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#mediaModal">
            <MdAttachFile />
            Choose file
          </a>
        </div>
      </div>
      <MediaModal
        setItemImage={setItemImage}
        itemImage={itemImage}
        typeOfUpload={typeOfUpload}
      />
    </div>
  );
}

export default FilePicker;
