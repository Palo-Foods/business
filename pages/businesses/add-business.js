import React from "react";
import Link from "next/link";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { selectBusiness } from "../../slices/navSlice";
import AddBusinessForm from "../../components/forms/AddBusinessForm";

function AddBusinessPage() {
  //get business in store
  const business = useSelector(selectBusiness);

  return (
    <DashboardLayout>
      <div className="px-0 d-flex justify-content-start">
        <Link href="/businesses">
          <a className="me-3 text-decoration-none">
            <h6 className="mt-2">Businesses</h6>
          </a>
        </Link>
        <h6 className="mt-2 text-muted">
          / {business ? "Edit" : "Add"} Business
        </h6>
      </div>

      <div className="card mt-2">
        <div className="card-body my-3">
          <AddBusinessForm />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddBusinessPage;
