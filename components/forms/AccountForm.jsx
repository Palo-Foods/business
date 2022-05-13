import React from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import Alert from "../../components/ui/Alert";
import Spinner from "../../components/ui/Spinner";

import Phone from "../../components/ui/Phone";
import TextInput from "../../components/ui/TextInput";
import { useStates } from "../../hooks/useStates";

function AccountForm() {
  const { auth, loading, message, user } = useAuth();

  const { fullName, phone, setPhone, email, setEmail, setFullName, setInput, router } =
    useStates(user);

  const handleEditAccount = async (e) => {
    e.preventDefault();

    const data = { fullName, phone, email };

    const url = `/api/v1.1.1/users/account/managers/${user?.id}`;

    //provide url, email, password, custom args
    await auth.addUpdateDeleteUser(url, data, "PUT");
  };

  console.log(user);

  return (
    <form className="row" onSubmit={handleEditAccount}>
      <div className="form-group mb-4">
        <label htmlFor="fullName" className="mb-2">
          Enter name
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
      <div className="form-group mb-4">
        <label htmlFor="email" className="mb-2">
          Enter email
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
      <div className="form-group mb-4">
        <label htmlFor="phone" className="mb-2">
          Enter phone
        </label>
        <Phone setText={setPhone} text={phone} classes="" id="phone" />
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

      <div className="d-flex justify-content-between mt-3">
        <a className="btn btn-outline-primary w-100 me-2" onClick={() => router.back()}>Cancel</a>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!fullName || !email || !phone}>
          {loading && <Spinner />} Update
        </button>
      </div>
    </form>
  );
}

export default AccountForm;
