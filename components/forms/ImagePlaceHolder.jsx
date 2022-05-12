import React from "react";
import Link from "next/link";
import { MdAttachFile, MdOutlineAddToPhotos } from "react-icons/md";
import { useStates } from "../../hooks/useStates";

function ImagePlaceHolder({ itemImage }) {
  const { uploadedImage, setUploadedImage, router } = useStates();

  const handleRoute = () => {
    //1. if item is set, route to
    router.replace("/products/add-product", `/media/files`, {
      shallow: true,
    });
  };
  return (
    <div className="mt-4">
      <p className="mb-1">Add product image</p>
      <div className="d-flex justify-content-start align-items-top">
        <a
          type="button"
          className="me-3 bg-light d-flex justify-content-center align-items-center"
          style={{
            width: 150,
            height: 150,
            borderRadius: 5,
            border: "1px dashed #d5d6d7",
          }}
          onClick={handleRoute}>
          <MdOutlineAddToPhotos
            size={30}
            className="text-muted"
            color="#d5d6d7"
          />
        </a>

        {(uploadedImage || itemImage) && (
          <Link href="/media/files">
            <a>
              <img
                src={uploadedImage?.url}
                alt="item-image"
                className="img-fluid"
                style={{ height: "objectFit" }}
              />
            </a>
          </Link>
        )}
        <div>
          <Link href="/media/files">
            <a className="btn btn-light">
              <MdAttachFile />
              Choose file
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ImagePlaceHolder;
