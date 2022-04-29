import React from "react";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { useStates } from "../../hooks/useStates";
import { MdClear, MdDelete, MdError, MdCheckCircle } from "react-icons/md";
import { useAuth } from "../../hooks/auth/useAuth";

function DeleteModal({ item, url, setItem, fetchData, router, type }) {
  const { auth, loading, statusCode, message } = useAuth();

  const deleteItem = async () => {
    const itemId = item?._id;
    const uri = `${url}/${itemId}`;
    const data = {};

    await auth.addUpdateDeleteUser(
      uri,
      data, //no data is sent cos we are deleting the item
      "DELETE"
    );
  };
  const clearAnything = () => {
    setItem(null);
    if(statusCode === 200) {
      fetchData()
    }
  };

  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content border-0">
          <div className="modal-header border-0 ms-auto p-0">
            <button
              type="button"
              className="btn btn-default mt-2"
              data-bs-dismiss="modal">
              <span
                className="bg-light rounded-circle p-2"
                onClick={clearAnything}>
                <MdClear size={20} />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-center d-flex align-items-center">
                <div>
                  <div className="">
                    {!statusCode && <MdDelete size={50} color="red" />}
                    {statusCode === 200 && (
                      <MdCheckCircle
                        size={150}
                        color="green"
                        className="mb-2"
                      />
                    )}
                    {message && (
                      <div className="">
                        <Alert
                          type={
                            statusCode === 200
                              ? "success"
                              : statusCode === 500
                              ? "danger"
                              : "info"
                          }
                          message={message}
                        />
                      </div>
                    )}
                  </div>
                  {!statusCode && (
                    <h5>
                      Do you want to delete
                      <span className="text-secondary"> {item?.name}</span>
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-center pb-3">
            <button
              type="button"
              className="btn btn-secondary px-4 mx-3"
              data-bs-dismiss="modal"
              onClick={() => {
                router.replace(type === "business" ? "/businesses" : "/riders");
                setItem(null);
                clearAnything;
              }}>
              {statusCode ? "Close" : "No"}
            </button>
            {!statusCode && (
              <button
                disabled={loading}
                type="button"
                className="btn btn-primary px-4 mx-3"
                onClick={deleteItem}>
                {loading && <Spinner />} Yes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
