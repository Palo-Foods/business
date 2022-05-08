import React from "react";
import Link from "next/link";
import Password from "../../components/ui/Password";
import Phone from "../../components/ui/Phone";
import Select from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import { setManagers } from "../../slices/navSlice";
import { useAuth } from "../../hooks/auth/useAuth";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { useFetch } from "../../hooks/crud/useFetch";

function AddManagerForm({ manager, edit }) {
  //get manager in store
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
  } = useStates(manager);

  //get sign up hook
  const { auth, loading, statusCode, message } = useAuth();

  const managersData = [];

  const { fetchData } = useFetch(
    "/api/v1.1.1/users/get-all/managers",
    managersData,
    setManagers
  );

  const handleAddManager = async (e) => {
    e.preventDefault();

    const data = {
      fullName,
      name,
      phone,
      email,
      type,
      region,
      password: !manager && password,
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

    const url = `/api/v1.1.1/users/${
      manager ? "/manage/managers/" + manager?._id : "register/managers"
    }`;
    console.log(manager);
    console.log(manager ? "PUT" : "POST");
    //provide url, email, password, custom args
    await auth.addUpdateDeleteUser(
      `${manager ? url : ""}`,
      manager ? updateData : data,
      manager ? "PUT" : "POST"
    );

    //if there is an update
    if (statusCode === 200) await fetchData();
  };

  return (
    <form className="row" onSubmit={handleAddManager}>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="managerName" className="mb-2 h6">
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
          Enter manager email
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
          Enter manager phone
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
      {!manager && (
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

      <div className="text-end">
        {!manager && (
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
              !password ||
              loading
            }>
            {loading && (
              <span className="me-2">
                <Spinner />
              </span>
            )}
            Submit
          </button>
        )}
        {manager && (
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
            <span className="ms-2">Update manager</span>
          </button>
        )}
        {!edit && (
          <Link href="/managers">
            <a className="btn btn-light ms-3">Go back</a>
          </Link>
        )}
      </div>
    </form>
  );
}

export default AddmanagerForm;
