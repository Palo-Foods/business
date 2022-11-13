import React, { useState } from "react";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import { useUser } from "../../hooks/useUser";


export default function LoginForm() {
  const { user, loading, error, message, login } = useUser("user");
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

    await login(inputs);
  };

  return (
    <>
    {message && <p className="text-success">{message}</p>}
    {error && <p className="text-danger">{error}</p>}
    <form className="my-3" onSubmit={handleLogin}>
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
