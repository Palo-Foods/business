import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useStates } from "../../hooks/useStates";
import Alert from "../ui/Alert";
import Password from "../ui/Password";
import Spinner from "../ui/Spinner";
import TextInput from "../ui/TextInput";

export const LoginForm = () => {
  const { login, loading, statusCode, message, user } = useAuth();
  const { email, setEmail, password, setPassword, setInput } = useStates();

  const router = useRouter();

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };
    const url = "/api/v1.0.0/login";
    await login(url, data);
  };

  user?.email && router.push("/dashboard");

  return (
    <>
      <form className="mt-4 mx-2" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-normal">
            Enter email address
          </label>
          <TextInput
            type="email"
            text={email}
            setInput={setInput}
            setText={setEmail}
            classes="form-control-lg"
            id="email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label fw-normal">
            Enter a password
          </label>
          <Password
            type="password"
            text={password}
            setInput={setInput}
            setText={setPassword}
            classes="form-control-lg"
          />
        </div>
        {message && (
          <Alert
            type={
              statusCode === 200
                ? "success"
                : statusCode === 500
                ? "danger"
                : "info"
            }
            message={message}
          />
        )}
        <div className="d-grid mb-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!email || !password || loading}>
            {loading && <Spinner />} <span className="ms-2">Login</span>
          </button>
        </div>
      </form>
    </>
  );
};

/* Login.propTypes = {
  props: PropTypes,
}; */

export default LoginForm;
