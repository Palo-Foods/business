import React from "react";
import Spinner from "../ui/Spinner";
import { MdClear, MdCheckCircle, MdFoodBank } from "react-icons/md";
import { useCrud } from "../../hooks/useCrud";

function ApproveOrderModal({ orderId, url }) {
  const { loading, error, message, handleCrud} = useCrud(url)
    
  async function handleApprove() {
    await handleCrud("PUT", "/api/v1.1.1/orders", {status: "Approve"})
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
                <MdClear size={20} className=""/>
              </span>
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-center">
                {error && <p>There was an error approving order {orderId}</p>}
                {message && (
                  <div>
                    <MdCheckCircle size={150} color="#64dd64" className="" />
                  </div>
                )}

                {!message && (
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
              data-bs-dismiss="modal">
              {message ? "Close" : "No"}
             </button>
              <button
                disabled={loading}
                type="button"
                className="btn btn-primary px-4 mx-3"
                onClick={handleApprove}>
                {loading ? <Spinner /> : "Yes"}
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveOrderModal;
