import React from "react";
import Link from "next/link";
import Password from "../../components/ui/Password";
import Phone from "../../components/ui/Phone";
import Select from "../../components/ui/Select";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { usePost } from "../../hooks/crud/usePost";

function AddRiderForm() {
  //get rider in store
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
  } = useStates();

  //get sign up hook
  const { postData, loading, statusCode, message } = usePost();

  const handleAddRider = async (e) => {
    e.preventDefault();

    const data = {
      fullName,
      name,
      phone,
      email,
      type,
      region,
      password,
    };

    const url = "/api/v1.1.1/users/ register/riders";

    //provide url, email, password, custom args
    await postData(url, data);
  };

  return (
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
          Enter of owner
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
      </div>
    </form>
  );
}

export default AddRiderForm;
