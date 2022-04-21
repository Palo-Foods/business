import React from "react";
import Link from "next/link";
import Password from "../../components/ui/Password";
import Phone from "../../components/ui/Phone";
import Select from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useSelector } from "react-redux";
import { selectManager } from "../../slices/navSlice";
import { useAuth } from "../../hooks/auth/useAuth";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";

function AddManagerPage() {
  const {
    fullName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    setFullName,
    region,
    setRegion,
    setInput,
  } = useStates();

  //get signup hook
  const { auth, loading, statusCode, message } = useAuth();

  const handleAddManager = async (e) => {
    e.preventDefault();

    const custom = { fullName, email, phone, region };
    const url = "/api/v1.0.0/managers/signup";

    //provide url, email, password, custom args
    await auth.createUserWithEmailAndPassword(url, email, password, custom);
  };

  //get business in store
  const manager = useSelector(selectManager);

  return (
    <DashboardLayout>
      <div className="px-0 d-flex justify-content-start">
        <Link href="/managers">
          <a className="me-3 text-decoration-none">
            <h4 className="mt-2">Managers</h4>
          </a>
        </Link>
        <h4 className="mt-2 text-muted">
          / {manager ? "Edit" : "Add"} Manager
        </h4>
      </div>

      <div className="card mt-2">
        <div className="card-body my-3">
          <form className="row" onSubmit={handleAddManager}>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="fullName" className="mb-2 h6">
                Enter name of owner
              </label>
              <TextInput
                type="text"
                text={fullName}
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
                text={email}
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
                text={phone}
                classes="form-control-lg"
              />
            </div>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="region" className="mb-2 h6">
                Select region
              </label>
              <Select
                text={region}
                setInput={setInput}
                setText={setRegion}
                options={[
                  "Eastern",
                  "Western",
                  "Central",
                  "Greater Accra"
                ]}
                classes="form-select-lg"
                id="region"
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label htmlFor="password" className="mb-2 h6">
                Enter password (keep it)
              </label>
              <Password
                type="password"
                text={password}
                setInput={setInput}
                setText={setPassword}
                classes="form-control-lg"
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
                disabled={
                  !fullName ||
                  !name ||
                  !email ||
                  !phone ||
                  !region ||
                  !password ||
                  loading
                }>
                {loading && <Spinner />} <span className="ms-2">Submit</span>
              </button>
              <Link href="/managers">
                <a className="btn btn-default me-3 btn-lg">Go back</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddManagerPage;
