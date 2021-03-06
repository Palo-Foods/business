import React from "react";
import Link from "next/link";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AddRiderForm from "../../components/forms/AddRiderForm";

function AddRiderPage() {
  return (
    <DashboardLayout>
      <div className="px-0 d-flex justify-content-start">
        <Link href="/riders">
          <a className="me-3 text-decoration-none">
            <h6 className="mt-2">Riders</h6>
          </a>
        </Link>
        <h6 className="mt-2 text-muted">/ Add rider</h6>
      </div>

      <div className="card mt-2">
        <div className="card-body my-3">
          <AddRiderForm />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddRiderPage;
