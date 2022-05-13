import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MdDelete } from "react-icons/md";
import { useStates } from "../../hooks/useStates";
import DeleteModal from "../../components/modals/DeleteModal";
import ImagesInMedia from "../../components/media/FilesInMedia";

function AddFilePage() {
  const { itemImage, setItemImage } = useStates();
  const [display, setDisplay] = useState(false);

  return (
    <>
      <h5>Media</h5>
      <div className="my-3 vh-50">
        <div className="card vh-50">
          <div className="card-header p-0 d-flex justify-content-between w-100">
            <a type="button" className="h6 text-decoration-none mb-0 p-4">
              Files
            </a>
          </div>
          <div className="card-body p-3" style={{ height: "30rem" }}>
            <ImagesInMedia />
          </div>
          <div className="card-footer text-muted d-flex justify-content-end">
            <a
              type="button"
              disabled={!itemImage}
              className="btn btn-danger me-3 my-2"
              onClick={() => setItem(itemImage)}>
              <MdDelete size={18} className="mb-1" />
              <span className="ms-2">Delete</span>
            </a>
          </div>
        </div>
      </div>
      <DeleteModal
        type="media"
        item={itemImage}
        setItem={setItemImage}
        url="/api/v1.1.1/media"
        //fetchData={fetchData}
      />
    </>
  );
}

export default AddFilePage;
