import React from "react";
import { useSignUp } from "../../hooks/auth/useSignup";
import { useStates } from "../../hooks/useStates";
import Alert from "../ui/Alert";
import Password from "../ui/Password";
import Spinner from "../ui/Spinner";
import TextInput from "../ui/TextInput";

export const SignUpForm = () => {
  const { signUp, loading, statusCode, message } = useSignUp();
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    setInput,
  } = useStates();

  //handle login
  const handleSignUp = async (e) => {
    e.preventDefault();

    const custom = { fullName };
    const url = "/api/v1.0.0/account/signup";

    //provide url, email, password, custom args
    await signUp(url, email, password, custom);
  };

  return (
    <>
      <form className="mt-4 mx-2" onSubmit={handleSignUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-normal">
            Enter full name
          </label>
          <TextInput
            type="text"
            text={fullName}
            setInput={setInput}
            setText={setFullName}
            classes="form-control-lg"
            id="fullName"
          />
        </div>
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
            disabled={!fullName || !email || !password || loading}>
            {loading && <Spinner />} <span className="ms-2">Sign up</span>
          </button>
        </div>
      </form>
    </>
  );
};

/* Login.propTypes = {
  props: PropTypes,
}; */

export default SignUpForm;
