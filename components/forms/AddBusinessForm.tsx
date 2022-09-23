import React, { useEffect } from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import { usePost } from "../../hooks/usePost";
import { usePut } from "../../hooks/usePut";

function AddBusinessForm({ business, getItems }) {
  const {
    name, setName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword
  } = useStates();

  const { addItem, loading, error, message } = usePost("/api/v1.1.1/businesses")
  const { updateItem, isLoading, isError, isMessage } = usePut("/api/v1.1.1/businesses/" + business?._id)

  useEffect(() => {
    if (business?._id) {
      setName(business?.name)
      setEmail(business?.email)
      setPhone(business?.phone)
    }
  }, [business])
  

  const handleAddBusiness = async (e: { preventDefault: () => void; }) => {
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

    !business?._id ? addItem(data) : updateItem(updateData)
    getItems()
  };

  let msg = message || isMessage
  let err = error || isError

  return (
  <>
      {msg && <p className="text-success">{msg}</p>}
      {err && <p className="text-danger">{err}</p>}
      <form className="row" onSubmit={handleAddBusiness}>
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
      {!business?._id && (
        <div className="col-md-6 form-group mb-3">
          <label htmlFor="password" className="mb-2">
            Enter password (keep it)
          </label>
          <TextInput type="password" value={password} setChange={setPassword} id="password" placeholder={""} />
        </div>
      )}
        <div className="text-end">
          {business?._id && <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>}
          <button
            type="submit"
            className="btn btn-primary ms-3"
            disabled={
              !name ||
              !email ||
              !phone ||
             (!business?._id && !password) ||
             (business?._id ? isLoading : loading)
            }>
            {loading ? <Spinner /> : "Submit"}
          </button>     
      </div>
    </form>
    </>
  );
}

export default AddBusinessForm;
