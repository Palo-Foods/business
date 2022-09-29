import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import DashboardLayout from "../layouts/DashboardLayout";
import LocationModal from "../modals/LocationModal";
import Autocomplete from "react-google-autocomplete";
import { useUser } from "../../hooks/useUser";

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
    location, setLocation
  } = useStates();
  const [address, setaddress] = useState("")

  const { loading, error, message, user, updateUser } = useUser("user");

  useEffect(() => {
    if (user?.id) {
      console.log(user)
      setName(user?.businessName)
      setFullName(user?.fullName)
      setEmail(user?.email)
      setPhone(user?.phone)
      setaddress(user?.location?.formatted_address)
    }
  }, [user])
  

  const handleAddBusiness = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      fullName,
      location,
      businessName: name,
      phone,
      email
    };

    await updateUser(data)
  };

  return (
  <DashboardLayout>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <form className="row" onSubmit={handleAddBusiness}>
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
        <div className="col-md-12 form-group mb-4">
        <label htmlFor="text" className="mb-2">
          Enter business location
          </label>
         
          <Autocomplete
            placeholder={"" || user?.location?.address}
            className="form-control mb-3 autocomplete"
              apiKey={ process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => {
              const loc = {
                town: place?.address_components[0].long_name,
                district: place?.address_components[1].long_name,
                region: place?.address_components[2].long_name,
                address: place?.formatted_address,
                geometry: {
                  lat: place?.geometry?.location?.lat(),
                  lng: place?.geometry?.location?.lng()
                }
                }
                //console.log(loc, place);
                setLocation(loc)
            }}
             options={{
              types: ["(regions)"],
              componentRestrictions: { country: "gh" },
            }}
             
          />
           <a data-bs-toggle="modal" data-bs-target="#locationModal" className="text-decoration-none">Search on map</a>
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
             loading
            }>
            {loading ? <Spinner /> : "Submit"}
          </button>     
      </div>
      </form>
      <LocationModal />
    </DashboardLayout>
  );
}

export default AccountForm;
