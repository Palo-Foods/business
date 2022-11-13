import React, { useState } from "react";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import { useUser } from "../../hooks/useUser";
import { useCrud } from "../../hooks/useCrud";


export default function LoginForm() {
  const {loading, error, message, handleCrud} = useCrud()
  const { user } = useUser("user");
  const { router } = useStates();

   const [inputs, setinputs] = useState({email: "", password: ""})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setinputs(values => ({...values, [name]: value}))
  }

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "/api/v1.1.1/account/login"

    await handleCrud("POST", url, inputs);
  };

  user?.email && router.push("/dashboard");

  return (
    <>
    {message && <p className="text-success">{message}</p>}
    {error && <p className="text-danger">{error}</p>}
    <form className="my-3 mx-2" onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-normal">
          Enter email address
        </label>
       <input name="email" type="email" value={inputs.email} onChange={handleChange} className="form-control" placeholder="Name" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label fw-normal">
          Enter a password
        </label>
        <input name="password" type="password" value={inputs.password} onChange={handleChange} className="form-control" placeholder="Name" />
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!inputs?.email || !inputs?.password || loading}>
            {loading ? <Spinner /> : "Login"}
        </button>
      </div>
      </form>
      </>
  );
}
