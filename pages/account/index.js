import React from "react";
import Link from "next/link";
import Phone from "../../components/ui/Phone";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { MdCalendarToday, MdOutlineFilePresent } from "react-icons/md";
import { useAuth } from "../../hooks/auth/useAuth";
import Alert from "../../components/ui/Alert";
import Spinner from "../../components/ui/Spinner";

function EditAccountPage() {
  const { user, auth, loading, message } = useAuth();
  const { fullName, phone, setPhone, email, setEmail, setFullName, setInput } =
    useStates(user);

  const url = `/api/v1.0.0/account/${user?.id}`;

  const handleEditAccount = async (e) => {
    e.preventDefault();
    const data = { fullName, phone, email };
    await auth.addUpdateDeleteUser(url, data, "PUT");
  };

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-start px-0">
        <h5 className="mt-2 text-muted">Edit Account</h5>
      </div>

      <div className="card my-2">
        <div className="card-body my-3">
          <form className="row" onSubmit={handleEditAccount}>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="fullName" className="mb-2 h6">
                Enter name
              </label>
              <TextInput
                type="text"
                text={fullName || user?.fullName}
                setInput={setInput}
                setText={setFullName}
                classes="form-control-lg"
                id="fullName"
              />
            </div>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="email" className="mb-2 h6">
                Enter email
              </label>
              <TextInput
                type="email"
                text={email || user?.email}
                setInput={setInput}
                setText={setEmail}
                classes="form-control-lg"
                id="email"
              />
            </div>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="phone" className="mb-2 h6">
                Enter phone
              </label>
              <Phone
                setText={setPhone}
                text={phone || user?.phone}
                classes="form-control-lg"
                id="phone"
              />
            </div>
            {message && (
              <div className="px-3">
                <Alert
                  type={
                    statusCode === 201
                      ? "success"
                      : statusCode === 500
                      ? "danger"
                      : "info"
                  }
                  message={message}
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={!fullName || !email || !phone}>
                {loading && <Spinner />} Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6 my-3">
          <h5 className="text-muted">Documents</h5>
          <div className="card mt-2">
            <div className="card-header border-0 bg-white px-md-4 pt-4 pb-0 d-flex justify-content-between">
              <p className="h5 mb-0">Files</p>
              <Link href="/files/add-file">
                <a className="text-decoration-none h5">
                  <span className="fa fa-plus me-2"></span>
                  <span>Add file</span>
                </a>
              </Link>
            </div>
            <div className="card-body">
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
        </div>
        <div className="col-12 col-lg-6 my-3">
          <h5 className="text-muted">Payments</h5>
          <div className="card mt-2">
            <div className="card-header border-0 bg-white px-md-4 pt-4 pb-0 d-flex justify-content-between">
              <p className="h5 mb-0">Payments</p>
            </div>
            <div className="card-body">
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
    </DashboardLayout>
  );
}

export default EditAccountPage;
