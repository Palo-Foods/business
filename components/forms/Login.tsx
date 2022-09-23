import React from "react";
import TextInput from "./TextInput";
import { useStates } from "../../hooks/useStates";
import Spinner from "../ui/Spinner";
import { useUser } from "../../hooks/useUser";

export default function LoginForm() {
  const { loading, message, error, login, user } = useUser("user");
  const { email, password, setEmail, setPassword, router } = useStates();
  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };
    await login(data)
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
          disabled={!email || !password || loading}>
            {loading ? <Spinner /> : "Login"}
        </button>
      </div>
      </form>
      </>
  );
}
