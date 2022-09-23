import React from "react";
import Spinner from "../ui/Spinner";
import { MdClear, MdCheckCircle, MdFoodBank } from "react-icons/md";
import { usePut } from "../../hooks/usePut";

function ApproveOrderModal({ orderId, url }) {
  const { updateItem, isMessage, setIsMessage, isError, setIsError, isLoading, setIsLoading} = usePut(url)

  const clearAnything = () => {
    setIsLoading(false);
    setIsError("");
    setIsMessage("");
    };
    
    
  async function handleApprove() {
    await updateItem({status: "Approve"})
  }

  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="ApproveOrderModal"
      tab-index="-1"
      aria-labelledby="ApproveOrderModalLabel"
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
                {isError && <p>There was an error approving order {orderId}</p>}
                {isMessage && (
                  <div>
                    <MdCheckCircle size={150} color="#64dd64" className="" />
                  </div>
                )}

                {!isMessage && (
                  <>
                    <div className="mb-2">
                      <MdFoodBank size={50} color="red" />
                    </div>
                    <h6>Do you want to approve order</h6>
                    <p className="text-secondary h6"> {orderId}</p>
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
              {isMessage ? "Close" : "No"}
             </button>
              <button
                disabled={isLoading}
                type="button"
                className="btn btn-primary px-4 mx-3"
                onClick={handleApprove}>
                {isLoading ? <Spinner /> : "Yes"}
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveOrderModal;
