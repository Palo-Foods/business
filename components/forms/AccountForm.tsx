import React, { useState } from "react";
import Spinner from "../ui/Spinner";
import DashboardLayout from "../layouts/DashboardLayout";
import EnterLocation from "../forms/Enterlocation"
import Uploader from "../media/Uploader";
import Image from "next/image";
import { MdImage } from "react-icons/md";
import { useCrud } from '../../hooks/useCrud';

function AccountForm({user}) {
 const {loading, error, message, handleCrud} = useCrud()

  const [image, setImage] = useState({ url: user?.banner?.url, public_id: user?.banner?.public_id })
  
  const [inputs, setinputs] = useState({
    fullName: user?.fullName, businessName: user?.businessName, email: user?.email,
    phone: user?.phone, password: ""
  })
  
  const [location, setLocation] = useState(user?.location)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const url = "/api/v1.1.1/account" + user.id

    await handleCrud("POST", url, {...inputs, image});
  }

  return (
  <DashboardLayout>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <form className="row" onSubmit={handleSubmit}>
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
           <input name="fullName" type="text" value={inputs.fullName} onChange={handleChange} className="form-control" placeholder="Name" />
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="name" className="mb-2">
            Enter business name
          </label>
           <input name="businessName" type="text" value={inputs.businessName} onChange={handleChange} className="form-control" placeholder="Business name" />
        </div>
        <div className="col-md-6 form-group mb-4">
          <label htmlFor="email" className="mb-2">
            Enter business email
          </label>
           <input name="email" type="text" value={inputs.email} onChange={handleChange} className="form-control" placeholder="Business email" />
        </div>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="phone" className="mb-2">
          Enter business phone
        </label>
         <input name="phone" type="tel" value={inputs.phone} onChange={handleChange} className="form-control" placeholder="Phone" />
        </div>
        <div className="col-md-6 form-group mb-4">
          <EnterLocation location={location} setLocation={setLocation} />
        </div>
      {!user?.id && (
        <div className="col-md-6 form-group mb-3">
          <label htmlFor="password" className="mb-2">
            Enter password (keep it)
          </label>
           <input name="name" type="text" value={inputs?.password} onChange={handleChange} className="form-control" placeholder="Password" />
        </div>
      )}
        <div className="text-end">
          {user?.id && <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>}
          <button
            type="submit"
            className="btn btn-primary ms-3"
            disabled={
              !inputs?.fullName ||
              !inputs?.businessName ||
              !inputs?.email ||
              !inputs?.phone ||
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
