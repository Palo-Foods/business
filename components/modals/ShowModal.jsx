import React, { useState } from "react";
import { MdClear, MdArrowBack } from "react-icons/md";

const ShowModal = ({ type, setItem, router, content, edit, setEdit }) => {

  const handleClearItem = () => {
    router.replace(type);
    setItem(null);
  };
  
  //check if router reloads after
  return (
    <div
      className="modal fade"
      id="showModal"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true">
      <div
        className="modal-dialog modal-lg modal-fullscreen-md-down modal-dialog-centered modal-dialog-scrollable"
        role="document">
        <div className="modal-content">
          <div className="modal-header py-2 d-flex align-items-center px-0">
            {edit && (
              <button type="button" className="btn btn-default">
                <span
                  className="bg-light rounded-circle p-2"
                  onClick={() => setEdit(false)}>
                  <MdArrowBack size={18} />
                </span>
              </button>
            )}
            <h5 className="ps-3">Product</h5>
            <a
              type="button"
              data-bs-dismiss="modal"
              className="me-2 text-decoration-none text-black">
              <span
                className="bg-light rounded-circle p-2"
                onClick={handleClearItem}>
                <MdClear size={18} />
              </span>
            </a>
          </div>
          <div className="modal-body my-3">{content}</div>
          {!edit && (
            <div className="modal-footer border-0">
              <a
                type="button"
                className="px-4 mx-2 text-decoration-none btn btn-danger me-auto"
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal">
                Delete
              </a>
              <a
                type="button"
                className="px-4 mx-2 text-decoration-none btn btn-primary"
                onClick={() => setEdit(true)}>
                Edit
              </a>
              <a
                type="button"
                className="px-4 mx-2 text-decoration-none btn btn-light"
                data-bs-dismiss="modal"
                onClick={handleClearItem}>
                Close
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
