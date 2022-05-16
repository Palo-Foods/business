import React from "react";
import Spinner from "../ui/Spinner";
import { MdClear, MdDelete, MdCheckCircle } from "react-icons/md";
import { useStates } from "../../hooks/useStates";
import { useDelete } from "../../hooks/crud/useDelete";

function DeleteModal({ item, url, setItem }) {
  console.log(item);

  const { deleteUserData, statusCode, message } = useDelete();

  const { setLoading, loading, setError, router } = useStates();

  const deleteItem = async () => {
    const uri = `${url}/${item?._id}`;
    const data = {};
    setLoading(true);
    await deleteUserData(
      uri,
      data //no data is sent cos we are deleting the item
    );
    setLoading(false);
    console.log("done");
    statusCode === 200 && router.reload();
  };
  statusCode === 200 && router.reload();

  const clearAnything = () => {
    setLoading("");
    setError("");
    setItem(null);
    message = "";
    statusCode = "";
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
                {statusCode === 200 && (
                  <div>
                    <MdCheckCircle size={150} color="#64dd64" className="" />
                  </div>
                )}
                {message && (
                  <p className={`${statusCode === 200 && "text-success"}`}>
                    {message && statusCode === 200 && message}
                  </p>
                )}

                {statusCode !== 200 && (
                  <>
                    <div className="mb-2">
                      <MdDelete size={50} color="red" />
                    </div>
                    <h6>Do you want to delete</h6>
                    <p className="text-secondary h6"> {item?.name}</p>
                    {statusCode && statusCode !== 200 && (
                      <p className="text-danger">There was an error</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-center pb-3 pt-0">
            {statusCode && (
              <button
                type="button"
                className="btn btn-light px-4 mx-3"
                data-bs-dismiss="modal"
                onClick={clearAnything}>
                Close
              </button>
            )}
            {statusCode !== 200 && (
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
