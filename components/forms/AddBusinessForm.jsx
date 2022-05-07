import React from "react";
import Link from "next/link";
import Password from "../ui/Password";
import Phone from "../ui/Phone";
import Select from "../ui/Select";
import TextInput from "../ui/TextInput";
import { useStates } from "../../hooks/useStates";
import { useAuth } from "../../hooks/auth/useAuth";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { setBusinesses } from "../../slices/navSlice";
import { useFetch } from "../../hooks/crud/useFetchs";

function AddBusinessForm({ business, edit }) {
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
  } = useStates(business);

  //get sign up hook
  const { auth, loading, statusCode, message } = useAuth();

  const businessesData = []; //set to empty array. We don't want to use it in the custom hook

  const { fetchData } = useFetch(
    `${
      business?.name
        ? "https://api.palofoods.com/api/v1.1.1/users/manage/managers"
        : ""
    }`,
    businessesData,
    setBusinesses
  );

  const handleAddBusiness = async (e) => {
    e.preventDefault();

    const data = {
      fullName,
      name,
      phone,
      email,
      type,
      region,
      password: !business && password,
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

    const url = `/api/v1.0.0/businesses/${
      business?.name ? business?._id : "signup"
    }`;

    //provide url, email, password, custom args
    await auth.addUpdateDeleteUser(
      url,
      business?.name ? updateData : data,
      business?.name ? "PUT" : "POST"
    );

    //if there is an update
    business?.name && fetchData();
  };

  return (
    <form className="row" onSubmit={handleAddBusiness}>
      <div className="col-md-6 form-group">
        <label htmlFor="businessName" className="mb-2 h6">
          Enter business name
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
        <label htmlFor="email" className="mb-2 h6">
          Enter business email
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
          Enter business phone
        </label>
        <Phone setText={setPhone} text={phone} />
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
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="type" className="mb-2 h6">
          Select business type
        </label>
        <Select
          text={type}
          setInput={setInput}
          setText={setType}
          options={["Restaurant", "Groceries", "Liquor", "Pharmacy"]}
          classes=""
          id="type"
        />
      </div>
      {!business && (
        <div className="col-md-6 form-group mb-3">
          <label htmlFor="password" className="mb-2 h6">
            Enter password (keep it)
          </label>
          <Password
            text={password}
            setInput={setInput}
            setText={setPassword}
            classes=""
            type="password"
            id="password"
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
            onClick={undefined}
          />
        </div>
      )}

      <div className="text-end">
        {!business && (
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
            {loading && <Spinner />} <span className="ms-2">Submit</span>
          </button>
        )}
        {business && (
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
            <span className="ms-2">Update business</span>
          </button>
        )}
        {!edit && (
          <Link href="/businesses">
            <a className="btn btn-light ms-3">Go back</a>
          </Link>
        )}
      </div>
    </form>
  );
}

export default AddBusinessForm;
