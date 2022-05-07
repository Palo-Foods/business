import React, { useEffect } from "react";
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
  const { auth, user, loading, message } = useAuth();
  const { fullName, phone, setPhone, email, setEmail, setFullName, setInput } =
    useStates(user);

  const handleEditAccount = async (e) => {
    e.preventDefault();
    const data = { fullName, phone, email };
    await auth.addUpdateDeleteUser(url, data, "PUT");
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-md-6 mb-3">
          <h5 className="text-muted">Edit Account</h5>
          <div className="card my-2">
            <div className="card-body my-3">
              <form className="row" onSubmit={handleEditAccount}>
                <div className="form-group mb-4">
                  <label htmlFor="fullName" className="mb-2 h6">
                    Enter name
                  </label>
                  <TextInput
                    type="text"
                    text={fullName}
                    setInput={setInput}
                    setText={setFullName}
                    classes=""
                    id="fullName"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="mb-2 h6">
                    Enter email
                  </label>
                  <TextInput
                    type="email"
                    text={email}
                    setInput={setInput}
                    setText={setEmail}
                    classes=""
                    id="email"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="phone" className="mb-2 h6">
                    Enter phone
                  </label>
                  <Phone
                    setText={setPhone}
                    text={phone}
                    classes=""
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
                    className="btn btn-primary"
                    disabled={!fullName || !email || !phone}>
                    {loading && <Spinner />} Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h5 className="text-muted">Documents</h5>
          <div className="card my-2">
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

          <h5 className="text-muted mt-4">Payments</h5>
          <div className="card my-2">
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

      <div className="row"></div>
    </DashboardLayout>
  );
}

export default EditAccountPage;
