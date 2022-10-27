import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import DashboardLayout from "../layouts/DashboardLayout";
import { useUser } from "../../hooks/useUser";
import EnterLocation from "../forms/Enterlocation"
import Uploader from "../media/Uploader";
import Image from "next/image";
import { MdImage } from "react-icons/md";

function AccountForm() {
  const {
    name, setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    location, setLocation,
   image,
    setImage} = useStates();

  const { loading, error, message, user, updateUser } = useUser("user");

  useEffect(() => {
    console.log(user)
    if (user?.id) {
      setName(user?.businessName)
      setFullName(user?.fullName)
      setEmail(user?.email)
      setPhone(user?.phone)
      setLocation(user?.location)
      setImage(user?.banner)
    }
  }, [user])
  

  const handleAddBusiness = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      fullName,
      location,
      businessName: name,
      phone,
      email,
      banner: image
    };

    await updateUser(data)
  };

  return (
  <DashboardLayout>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <form className="row" onSubmit={handleAddBusiness}>
         <div className="mb-3">
           <Uploader setImage={setImage}>
                        <div className="position-relative">
                          <div className="position-relative">
                            <Image
                              src={image?.url}
                              width={200}
                              height={150}
                              alt={user?.businessName}
                              className="rounded"
                            />
                          </div>
                          <div
                            style={{
                              width: 200,
                              height: 150,
                              border: "1px dashed grey",
                              position: "absolute",
                              top: 0,
                              bottom: 0,
                            }}
                            className="d-flex justify-content-center align-items-center rounded">
                            <MdImage size={45} color={image?.url ? "white" : ""}  />
                          </div>
                        </div>
                      </Uploader>
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="fullName" className="mb-2">
            Enter full name
          </label>
          <TextInput type="text" value={fullName} setChange={setFullName} id="fullName" placeholder={""} />
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="name" className="mb-2">
            Enter business name
          </label>
          <TextInput type="text" value={name} setChange={setName} id="name" placeholder={""} />
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="email" className="mb-2">
            Enter business email
          </label>
          <TextInput type="email" value={email} setChange={setEmail} id="email" placeholder={""} />
        </div>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="phone" className="mb-2">
          Enter business phone
        </label>
        <TextInput type="tel" value={phone} setChange={setPhone} id="phone" placeholder={""} />
        </div>
        <div className="col-md-6 form-group mb-4">
          <EnterLocation location={location} setLocation={setLocation} />
        </div>
      {!user?.id && (
        <div className="col-md-6 form-group mb-3">
          <label htmlFor="password" className="mb-2">
            Enter password (keep it)
          </label>
          <TextInput type="password" value={password} setChange={setPassword} id="password" placeholder={""} />
        </div>
      )}
        <div className="text-end">
          {user?.id && <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>}
          <button
            type="submit"
            className="btn btn-primary ms-3"
            disabled={
              !fullName ||
              !name ||
              !email ||
              !phone ||
              !location?.address ||
             loading
            }>
            {loading ? <Spinner /> : "Submit"}
          </button>     
      </div>
      </form>
    </DashboardLayout>
  );
}

export default AccountForm;
