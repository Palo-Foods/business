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
import Select from "../ui/Select";
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
    name,
    setName,
    setInput,
    router,
    id,
    location,
    setLocation,
    openingHour,
    setOpeningHour,
    day,
    setDay,
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
      name,
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
      <form className="mt-3" onSubmit={handleEditAccount}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="fullName" className="mb-1">
                Business owner
              </label>
              <TextInput
                type="text"
                text={fullName}
                setInput={setInput}
                setText={setFullName}
                classes="mb-2"
                id="fullName"
                placeholder="Full Name"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="name" className="mb-1">
                Business name
              </label>
              <TextInput
                type="text"
                text={name}
                setInput={setInput}
                setText={setName}
                classes="mb-2"
                id="name"
                placeholder="Business Name"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <TextInput
                type="email"
                text={email}
                setInput={setInput}
                setText={setEmail}
                classes="mb-2"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone" className="mb-1">
                Phone
              </label>
              <Phone
                setText={setPhone}
                text={phone}
                classes="mb-2"
                id="phone"
                placeholder="545110328"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="location" className="mb-1">
                Location
              </label>
              <LocationSearchInput
                setLocation={setLocation}
                location={location}
                classes="mb-2"
                id="location"
              />
            </div>
            <div className="mb-2">
              <p className="mb-1">Banner</p>
              <FilePicker
                image={banner}
                setImage={setBanner}
                type="photo"
                width={250}
                height={120}
                id="banner"
              />
            </div>
          </div>
          <div className="col-md-5 mx-auto mb-4">
            <div class="card mt-4">
              <div class="card-body">
                <h6 className="mt-0 mb-3">Select hours</h6>

                <div className="d-flex justify-content-start align-items-center mb-3">
                  <div>
                    <div className="form-group">
                      <Select
                        text={day}
                        setInput={setInput}
                        setText={setDay}
                        options={[
                          "Mon",
                          "Tue",
                          "Wed",
                          "Thur",
                          "Fri",
                          "Sat",
                          "Sun",
                        ]}
                        classes=""
                        id="day"
                      />
                    </div>
                  </div>
                  <div className="form-group ms-1 w-50">
                    <input
                      type="time"
                      className="form-control"
                      id="openingHour"
                      aria-describedby="helpId"
                      placeholder="0 hour"
                    />
                  </div>
                  <div className="form-group ms-1 w-50">
                    <input
                      type="time"
                      className="form-control"
                      id="closingHour"
                      aria-describedby="helpId"
                      placeholder="0 hour"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

        <div className="col-md-6 d-flex justify-content-between my-3">
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
            {loading && <Spinner />} Save
          </button>
        </div>
      </form>
      {/*   <LocationModal location={location} setLocation={setLocation} /> */}
    </>
  );
}

export default AccountForm;
