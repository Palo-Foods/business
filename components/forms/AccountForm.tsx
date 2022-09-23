import React, { useEffect } from "react";
import Spinner from "../ui/Spinner";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import { useUser } from "../../hooks/useUser";

function AccountForm() {
  const { user, loading, message, updateUser, error } = useUser("user");

  const { name, phone, setPhone, email, setEmail, setName } =
    useStates();
  
  //set data
  useEffect(() => {
    if (user?.id) {
      setName(user?.fullName);
      setEmail(user?.email)
      setPhone(user?.phone)
    }
  }, [user])
  

  const handleEditAccount = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const data = { fullName: name || user?.fullName, phone, email };

    //provide url, email, password, custom args
    await updateUser(data);
  };

  return (
  <>
    {message && <p className="text-success">{message}</p>}
    {error &&  <p className="text-danger">{error}</p>}
    <form className="row" onSubmit={handleEditAccount}>
      <div className="form-group mb-4">
        <label htmlFor="fullName" className="mb-2">
          Enter name
        </label>
         <TextInput type="text" value={name} setChange={setName} id="fullName" placeholder={""} />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="email" className="mb-2">
          Enter email
        </label>
        <TextInput type="email" value={email} setChange={setEmail} id="email" placeholder={""} />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="phone" className="mb-2">
          Enter phone
        </label>
        <TextInput type="tel" value={phone} setChange={setPhone} id="phone" placeholder={""} />
      </div>
      <div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!name || !email || !phone || loading}>
          {loading && <Spinner />} Update
        </button>
      </div>
    </form>
  </>);
}

export default AccountForm;
