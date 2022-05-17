import React from "react";
import Link from "next/link";
//import { useStates } from "../../hooks/useStates";
//import { useAuth } from "../../hooks/auth/useAuth";

function OrderPage() {
/*   const { router } = useStates();

   //get signup hook
  const { auth, loading, statusCode, message, postPutDeleteData } = useAuth();

  const handleProcessing = async(action) => {
    const url = `/api/v1.0.0/orders/${router?.query?.id}`;

    //provide url, email, password, custom args
    await postPutDeleteData(
      url,
      action,
      action === "accept" ? "PUT" : "DELETE"
    );
  }; */
  return (
    <>
      <div className="d-flex justify-content-start">
        <Link href="/[route]/[page]" as="/dashboard/orders">
          <a className="me-3 text-decoration-none">
            <h5 className="mt-2">Orders</h5>
          </a>
        </Link>
        <h5 className="mt-2 text-muted">/ Order ID: #{/* {router?.query?.page} */}</h5>
      </div>
      <div>
        <div className="card mt-2 p-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-4">
                <h5 className="mb-3">Order details </h5>
                <h5 className="mb-4">
                  <span className="text-muted">Items: </span>
                </h5>
                <h6 className="mb-4">
                  <span className="text-muted"> Qty: </span>
                  <b>2</b>
                </h6>
                <h6 className="mb-4">
                  <span className="text-muted">Amount: </span> 40.00
                </h6>
                <h6 className="mb-4">
                  <span className="text-muted"> Time to deliver: </span>
                  <strong>now</strong>
                </h6>
              </div>
              <div className="col-md-6">
                <h5 className="mb-3">Location </h5>
                <h5 className="mb-4">
                  <span className="text-muted">Area: </span> Aboabo TZ
                </h5>
                <h6 className="mb-4">
                  <span className="text-muted"> Instructions:</span> Call me
                  when you get to Adotei junction
                </h6>
                <h6>
                  <span className="text-muted">Location on map:</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="card-footer bg-white text-end border-0">
            <button
             
              type="submit"
              className="btn btn-danger me-2 mb-3 mb-md-0">
              Decline
            </button>
            <button
              type="submit"
              className="btn btn-success me-2"
            >
              Process
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderPage;
