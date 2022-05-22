import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Alert from "../../components/ui/Alert";
import Spinner from "../../components/ui/Spinner";
import Phone from "../../components/ui/Phone";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";
import FilePicker from "../media/FilePicker";
import { usePut } from "../../hooks/crud/usePut";
import { useSessionStorage } from "../../hooks/useSession";
const LocationSearchInput = dynamic(() => import("../forms/AutoCompleteForm"));

//const LocationModal = dynamic(() => import("../modals/LocationModal"));

function AccountForm() {
  const { putData, loading, message, statusCode } = usePut();
  const { item, setSession } = useSessionStorage("location");
  const {
    fullName,
    phone,
    setPhone,
    email,
    setEmail,
    logo,
    setLogo,
    banner,
    setBanner,
    setFullName,
    setInput,
    router,
    id,
    location,
    setLocation,
  } = useStates();

  //check if location exist in session
  useEffect(() => {
    if (item?.address) {
      console.log("address", item?.address);
      setLocation(item);
    }
  }, [item]);

  const handleEditAccount = async (e) => {
    e.preventDefault();

    const data = {
      fullName,
      phone,
      email,
      logo,
      banner,
      location,
    };

    const url = `/api/v1.1.1/users/account/businesses/${id}`;

    //provide url, email, password, custom args
    await putData(url, data, "PUT");
    setSession(location);
  };

  return (
    <>
      <form className="row" onSubmit={handleEditAccount}>
        <div className="mb-4">
          <p className="mb-1">Banner</p>
          <FilePicker
            image={banner}
            setImage={setBanner}
            type="photo"
            width={300}
            height={120}
            id="banner"
          />
        </div>
        <div className="form-group mb-4 mt-2">
          <TextInput
            type="text"
            text={fullName}
            setInput={setInput}
            setText={setFullName}
            classes="py-2 mb-2"
            id="fullName"
            placeholder="Full Name"
          />
        </div>
        <div className="form-group mb-4">
          <TextInput
            type="email"
            text={email}
            setInput={setInput}
            setText={setEmail}
            classes="py-2 mb-2"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group mb-4 mt-1">
          <Phone
            setText={setPhone}
            text={phone}
            classes="py-2 mb-2"
            id="phone"
            placeholder="545110328"
          />
        </div>
        <div className="form-group my-3">
          <LocationSearchInput
            setLocation={setLocation}
            location={location}
            classes="py-2 mb-2"
          />
        </div>
        {/*  <p>
          or
          <a
            type="button"
            className="my-2 ms-2 text-decoration-none"
            data-bs-target="#locationModal"
            data-bs-toggle="modal">
            Select on map
          </a>
        </p> */}
        {statusCode && (
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

        <div className="d-flex justify-content-between my-3">
          <a
            type="button"
            className="btn btn-outline-primary w-100 me-2"
            onClick={() => router.back()}>
            Cancel
          </a>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!fullName || !email || !phone}>
            {loading && <Spinner />} Update
          </button>
        </div>
      </form>
      {/*   <LocationModal location={location} setLocation={setLocation} /> */}
    </>
  );
}

export default AccountForm;
