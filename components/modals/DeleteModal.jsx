import React from "react";
import Image from "next/image";
import Error from "../../public/images/icons/trash.svg";
import Success from "../../public/images/icons/check-circle.svg";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { postPutDelete } from "../../functions/crud/POST-PUT-DELETE";
import Alert from "../ui/Alert";
import { useStates } from "../../hooks/useStates";
import { MdClear } from "react-icons/md";

function DeleteModal({ item, url }) {
  const [show, setShow] = useState(false);
  const { loading, setLoading, error, setError } = useStates();

  const deleteItem = async () => {
    setError(false);
    setLoading(true);
    const itemId = item?._id;
    const uri = `${url}${itemId}`;
    try {
      const { response, error } = await postPutDelete(uri);
      setLoading(false);
      if (response) {
        if (response.msg === "success") {
          setShow(true);
        } else {
          setError(error);
        }
      } else {
        setError(error);
      }
    } catch (error) {
      setError(error.message);
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
              <span className="bg-light rounded-circle p-2">
                <MdClear size={20} />
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-center d-flex align-items-center">
                <div>
                  <div className="my-4">
                    {!show && (
                      <Image
                        src={Error}
                        width={50}
                        height={50}
                        alt="Delete"
                        className=""
                      />
                    )}
                    {show && (
                      <Image
                        src={Success}
                        width={50}
                        height={50}
                        alt="Success"
                        className=""
                      />
                    )}
                  </div>
                  {!show && (
                    <h5>
                      Do you want to delete
                      <span className="text-secondary"> {item?.name}</span>
                    </h5>
                  )}
                  {show && <h5>{item?.name} data has been deleted</h5>}
                  {error && <Alert type="danger" message={error} />}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-secondary px-4 mx-3"
              data-bs-dismiss="modal">
              {show ? "Close" : "No"}
            </button>
            {!show && (
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
