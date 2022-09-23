import React, { useState } from "react";
import Spinner from "../ui/Spinner";
import { MdClear, MdDelete, MdCheckCircle } from "react-icons/md";
import { usePut } from "../../hooks/usePut";
import { useGet } from "../../hooks/useGet";
import LoadingStatus from "../LoadingStatus";
import RiderRow from "../orders/RiderRow";

function AssignRiderToOrderModal({ orderId, url }) {
  const [rider, setRider] = useState({})
  const { updateItem, isMessage, setIsMessage, isError, setIsError, isLoading, setIsLoading } = usePut(url)
  const {data, status, getItems} = useGet("/api/v1.1.1/riders")

  const clearAnything = () => {
    setIsLoading(false);
    setIsError("");
    setIsMessage("");
    };
    
    
  async function handleAssignRider() {
    rider && await updateItem({rider})
  }

  return (
    <div
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="assignRiderToOrderModal"
      tab-index="-1"
      aria-labelledby="AssignRiderToOrderModalLabel"
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
                {isError && <p>There was an error assigning rider to order {orderId}</p>}
                {isMessage && (
                  <div>
                    <MdCheckCircle size={150} color="#64dd64" className="" />
                  </div>
                )}

                {!isMessage && (
                  <>
                    <p className="text-secondary h6">Assign order {orderId} to rider</p>
                    {data && (
                       <div className="table-responsive">
                        <table className="table">
                        <thead>
                            <tr className="text-start ps-0">
                            <th>#</th>
                            <th className="">Name</th>
                            <th className="">Status</th>
                            <th></th>
                          </tr>
                        </thead>
                          <tbody>
                           <RiderRow riders={data} setRider={setRider} />
                        </tbody>
                        </table>
                      </div>
                    )}
                    <LoadingStatus status={status} getItems={getItems} />
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
                disabled={isLoading  && !rider}
                type="button"
                className="btn btn-primary px-4 mx-3"
                onClick={handleAssignRider}>
              {isLoading ? <Spinner /> : "Yes"}
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignRiderToOrderModal;
