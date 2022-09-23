import React from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import { useUser } from "../../hooks/useUser";

export default function SignUpForm() {
  const { loading, message, error, register, user } = useUser("user");
  const { name, setName, email, password, setEmail, setPassword, router } = useStates();
  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { name, email, password };
    await register(data)
  };

  return (
    <>
      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">{error}</p>}
      <form className="my-3 mx-2" onSubmit={handleLogin}>
         <div className="mb-3">
        <label htmlFor="name" className="form-label fw-normal">
          Enter Full Name
        </label>
        <TextInput type="text" value={name} setChange={setName} id={""} placeholder={""} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-normal">
          Enter email address
        </label>
        <TextInput type="email" value={email} setChange={setEmail} id={""} placeholder={""} />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label fw-normal">
          Enter a password
        </label>
        <TextInput type="password" value={password} setChange={setPassword} id={""} placeholder={""} />
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!name || !email || !password || loading}>
            {loading ? <Spinner /> : "Login"}
        </button>
      </div>
      </form>
      </>
  );
}
