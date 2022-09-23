import React from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import { usePost } from "../../hooks/usePost";
import { usePut } from "../../hooks/usePut";
import { useEffect } from "react";

function AddriderForm({ rider, getItems }) {
  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword

  } = useStates();

  const { addItem, loading, error, message } = usePost("/api/v1.1.1/riders")
  const { updateItem, isLoading, isError, isMessage } = usePut("/api/v1.1.1/riders/" + rider?._id)

 useEffect(() => {
    if (rider && rider?._id) {
      setName(rider?.name)
      setEmail(rider?.email)
      setPhone(rider?.phone)
    }
  }, [rider])

  const handleAddrider = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      email,
      password
    };

    const updateData = {
      name,
      email,
      phone
    };

    !rider?._id ? addItem(data) : updateItem(updateData)
    getItems()
  };

  let msg = message || isMessage
  let err = error || isError

  return (
  <>
    {msg && <p className="text-success">{msg}</p>}
    {err && <p className="text-danger">{err}</p>}
    <form className="row" onSubmit={handleAddrider}>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="name" className="mb-2 fw-normal">
          Enter business name
        </label>
        <TextInput type="text" value={name} setChange={setName} id="email" placeholder={""} />
      </div>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="email" className="mb-2 fw-normal">
          Enter rider email
        </label>
         <TextInput type="email" value={email} setChange={setEmail} id="email" placeholder={""} />
      </div>
      <div className="col-md-6 form-group mb-4">
        <label htmlFor="phone" className="mb-2 fw-normal">
          Enter rider phone
        </label>
         <TextInput type="tel" value={phone} setChange={setPhone} id="phone" placeholder={""} />
      </div>
      {!rider?._id && (
        <div className="col-md-6 form-group mb-3">
          <label htmlFor="password" className="mb-2 fw-normal">
            Enter password (keep it)
          </label>
         <TextInput type="password" value={password} setChange={setPassword} id="password" placeholder={""} />
        </div>
      )}

        <div className="text-end">
          {rider?._id && <button type="button" className="btn btn-default me-4" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              !name ||
              !email ||
              !phone ||
              (!rider?._id && !password) ||
              (rider?._id ? isLoading : loading)
            }>
            {loading ? <Spinner /> : "Submit"}
          </button>    
      </div>
    </form>
    </>
  );
}

export default AddriderForm;
