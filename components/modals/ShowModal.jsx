import React, { useState } from "react";
import { MdClear, MdArrowBack } from "react-icons/md";

const ShowModal = ({ type, setItem, router, content, edit, setEdit }) => {
  //check if router reloads after
  return (
    <div
      className="modal fade"
      id="showModal"
      tabIndex="-1"
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
                  <MdArrowBack size={20} />
                </span>
              </button>
            )}
            <h5 className="ps-3">{edit ? "Edit account" : "Account"}</h5>
            <button
              type="button"
              className="btn btn-default"
              data-bs-dismiss="modal">
              <span
                className="bg-light rounded-circle p-2"
                onClick={() => {
                  router.replace(type);
                  setItem(null);
                }}>
                <MdClear size={20} />
              </span>
            </button>
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
                onClick={() => {
                  router.replace(
                    type === "businesses" ? "/businesses" : "/riders"
                  );
                  setItem(null);
                }}>
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
