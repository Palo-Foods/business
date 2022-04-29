import React from "react";
import Link from "next/link";
import Password from "../../components/ui/Password";
import Phone from "../../components/ui/Phone";
import Select from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { selectRider, setUpdated } from "../../slices/navSlice";
import { useAuth } from "../../hooks/auth/useAuth";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";

function AddRiderPage() {
  //get rider in store
  const rider = useSelector(selectRider);
  const {
    fullName,
    setName,
    name,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    setFullName,
    type,
    setType,
    setInput,
    region,
    setRegion,
  } = useStates(rider);

  //get signup hook
  const { auth, loading, statusCode, message } = useAuth();

  const dispatch = useDispatch();

  const handleAddRider = async (e) => {
    e.preventDefault();

    const data = {
      fullName,
      name,
      phone,
      email,
      type,
      region,
      password: !rider && password,
    };

    const updateData = {
      fullName,
      name,
      email,
      phone,
      type,
      region,
    };
    console.log(updateData);

    const url = `/api/v1.0.0/riders/${rider ? rider?._id : "signup"}`;

    //provide url, email, password, custom args
    await auth.addUpdateDeleteUser(
      url,
      rider ? updateData : data,
      rider ? "PUT" : "POST"
    );
  };

  //if updated data of rider, push to all rider
  message.includes("updated") && dispatch(setUpdated(true));

  return (
    <DashboardLayout>
      <div className="px-0 d-flex justify-content-start">
        <Link href="/riders">
          <a className="me-3 text-decoration-none">
            <h5 className="mt-2">Riders</h5>
          </a>
        </Link>
        <h5 className="mt-2 text-muted">/ {rider ? "Edit" : "Add"} rider</h5>
      </div>

      <div className="card mt-2">
        <div className="card-body my-3">
          <form className="row" onSubmit={handleAddRider}>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="riderName" className="mb-2 h6">
                Enter company name
              </label>
              <TextInput
                type="text"
                text={name}
                setInput={setInput}
                setText={setName}
                classes=""
                id="name"
              />
            </div>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="fullName" className="mb-2 h6">
                Enter name of owner
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
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="type" className="mb-2 h6">
                Select business type
              </label>
              <Select
                text={type}
                setInput={setInput}
                setText={setType}
                options={["Individual", "Courier Company"]}
                classes=""
                id="type"
              />
            </div>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="email" className="mb-2 h6">
                Enter rider email
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
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="phone" className="mb-2 h6">
                Enter rider phone
              </label>
              <Phone setText={setPhone} text={phone} classes="" />
            </div>
            <div className="col-md-6 form-group mb-4">
              <label htmlFor="region" className="mb-2 h6">
                Select region
              </label>
              <Select
                text={region}
                setInput={setInput}
                setText={setRegion}
                options={["Eastern", "Western", "Central", "Greater Accra"]}
                classes=""
                id="region"
              />
            </div>
            {!rider && (
              <div className="col-md-6 form-group mb-3">
                <label htmlFor="password" className="mb-2 h6">
                  Enter password (keep it)
                </label>
                <Password
                  type="password"
                  text={password}
                  setInput={setInput}
                  setText={setPassword}
                  classes=""
                />
              </div>
            )}
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
              {!rider && (
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={
                    !fullName ||
                    !name ||
                    !email ||
                    !phone ||
                    !type ||
                    !region ||
                    !password ||
                    loading
                  }>
                  {loading && <Spinner />} <span className="ms-2">Submit</span>
                </button>
              )}
              {rider && (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    !fullName ||
                    !name ||
                    !email ||
                    !phone ||
                    !type ||
                    !region ||
                    loading
                  }>
                  {loading && <Spinner />}{" "}
                  <span className="ms-2">Update rider</span>
                </button>
              )}
              <Link href="/riders">
                <a className="btn btn-default ms-3">Go back</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddRiderPage;
