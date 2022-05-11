import React from "react";
import Link from "next/link";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { MdCalendarToday, MdOutlineFilePresent } from "react-icons/md";
import { useSessionStorage } from "../../hooks/useSession";
import AccountForm from "../../components/forms/AccountForm";

function EditAccountPage() {
  const [user] = useSessionStorage("user");

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-md-6 mb-3">
          <h6 className="text-muted">Edit Account</h6>
          <div className="card my-2">
            <div className="card-body my-3">
              <AccountForm user={user} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h6 className="text-muted">Documents</h6>
          <div className="card my-2">
            <div className="card-header border-0 bg-white px-md-4 pt-4 pb-0 d-flex justify-content-between">
              <p className="h6 mb-0">Files</p>
              <Link href="/files/add-file">
                <a className="text-decoration-none h6">
                  <span className="fa fa-plus me-2"></span>
                  <span>Add file</span>
                </a>
              </Link>
            </div>
            <div className="card-body pt-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item ps-0 d-flex justify-content-between pe-0 py-3">
                  <span className="ps-2">Ghana card</span>
                  <span className="">
                    <MdOutlineFilePresent className="me-2" size={18} /> 22nd
                    March 2022
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <h6 className="text-muted mt-4">Payments</h6>
          <div className="card my-2">
            <div className="card-header border-0 bg-white px-md-4 pt-4 pb-0 d-flex justify-content-between">
              <p className="h6 mb-0">Payments</p>
            </div>
            <div className="card-body pt-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item ps-0 d-flex justify-content-between pe-0 py-3">
                  <span className="ps-2">Payment 1</span>
                  <span className="">
                    <MdCalendarToday className="me-2" size={18} /> 22nd March
                    2022
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row"></div>
    </DashboardLayout>
  );
}

export default EditAccountPage;
