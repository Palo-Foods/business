import React from "react";
import Spinner from "../ui/Spinner";
import { MdClear, MdDelete, MdCheckCircle } from "react-icons/md";
import { useEffect } from "react";
import {useDelete} from "../../hooks/useDelete"

function DeleteModal({ name, url, getItems, router }) {
  const { deleteItem, message, setMessage, error, setError, loading, setLoading } = useDelete(url)
  
  //go back after deletion
  useEffect(() => {
    if (message) {
      getItems()
      router?.back()
    }
  }, [message])

  const clearAnything = () => {
    setLoading(false);
    setError("");
    setMessage("");
  };

  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="deleteModal"
      tab-index="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content border-0">
          <div className="modal-header border-0 ms-auto p-0">
            <button
              type="button"
              className="btn btn-default my-2 "
              data-bs-dismiss="modal">
              <span className="bg-light rounded-circle p-2">
                <MdClear size={20} className="" onClick={clearAnything} />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-center">
                {error && <p>There was an error deleting {name}</p>}
                {message && (
                  <div>
                    <MdCheckCircle size={150} color="#64dd64" className="" />
                  </div>
                )}

                {!message && (
                  <>
                    <div className="mb-2">
                      <MdDelete size={50} color="red" />
                    </div>
                    <h6>Do you want to delete</h6>
                    <p className="text-secondary h6"> {name}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-center pb-3 pt-0">
            <button
              type="button"
              className="btn btn-light px-4 mx-3"
              data-bs-dismiss="modal"
              onClick={clearAnything}>
              {message ? "Close" : "No"}
             </button>
       
              <button
                disabled={loading}
                type="button"
                className="btn btn-primary px-4 mx-3"
                onClick={deleteItem}>
              {loading ? <Spinner /> : "Yes"}
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
