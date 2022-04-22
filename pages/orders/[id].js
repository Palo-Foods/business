import React from "react";
import Link from "next/link";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";

function OrderPage() {
  console.log(router);

  const { setInput, router } = useStates();

  const handleAddBusiness = (e) => {
    e.preventDefault();
  };
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-start">
        <Link href="/orders">
          <a className="me-3 text-decoration-none">
            <h4 className="mt-2">Orders</h4>
          </a>
        </Link>
        <h4 className="mt-2 text-muted">/ Order ID: #{router?.query?.id}</h4>
      </div>

      <div className="card mt-2 py-3">
        <div className="card-body my-3">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h4 className="mb-3">Order details </h4>
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
              <h4 className="mb-3">Location </h4>
              <h5 className="mb-4">
                <span className="text-muted">Area: </span> Aboabo TZ
              </h5>
              <h6 className="mb-4">
                <span className="text-muted"> Instructions:</span> Call me when
                you get to Adotei junction
              </h6>
              <h6>
                <span className="text-muted">Location on map:</span>
              </h6>
            </div>
          </div>
        </div>
        <div className="card-footer bg-white border-0">
          <Link href="/orders">
            <a className="btn btn-info me-3 btn-lg mb-3 mb-md-0">Go back</a>
          </Link>
          <button
            type="submit"
            className="btn btn-danger btn-lg me-2 mb-3 mb-md-0">
            Decline
          </button>
          <button type="submit" className="btn btn-primary btn-lg me-2">
            Process
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrderPage;
