import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useFetch } from "../../hooks/crud/useFetch";

function PaymentPage() {
  const { router } = useStates();
  const id = router?.query?.id;
  const url = `/api/v1.0.0/payments/${id}`;
  const { items, error, loading } = useFetch(url);
  console.log(router);

  const handleAddBusiness = (e) => {
    e.preventDefault();
  };
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-start">
        <Link href="/payments">
          <a className="me-3 text-decoration-none">
            <h4 className="mt-2">Payments</h4>
          </a>
        </Link>
        <h4 className="mt-2 text-muted">/ Payment ID: #{router?.query?.id}</h4>
      </div>

      <div className="card mt-2 py-3">
        <div className="card-body my-3">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h4 className="mb-3">Payment details </h4>
              <h5 className="mb-4">
                <span className="text-muted">Business:</span>
              </h5>
              <h6 className="mb-4">
                <span className="text-muted"></span> Account type: <b>Momo</b>
              </h6>
              <h6 className="mb-4">
                <span className="text-muted">Account number: </span>
              </h6>
              <h6 className="mb-4">
                <span className="text-muted"> Status:</span> payed, pending
              </h6>
            </div>
          </div>
        </div>
        <div className="card-footer bg-white border-0">
          <Link href="/orders">
            <a className="btn btn-info me-3 btn-lg mb-3 mb-sm-0">Go back</a>
          </Link>
          <button type="submit" className="btn btn-primary btn-lg me-2">
            Process
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PaymentPage;
