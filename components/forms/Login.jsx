import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { useStates } from "../../hooks/useStates";
import Alert from "../ui/Alert";
import Password from "../ui/Password";
import Spinner from "../ui/Spinner";
import TextInput from "../ui/TextInput";

export const LoginForm = () => {
  const { loading, statusCode, message, loginUser, user, error } = useAuth();
  const { email, setEmail, password, setPassword, setInput } = useStates("");

  const router = useRouter();

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };
    const url = "/api/v1.0.0/login";
    await loginUser(url, data);
  };

  useEffect(() => {
    user?.fullName &&
      router.push(user?.role === "shop" ? "/admin/dashboard" : "/");
  }, [user]);

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
        <div className="mb-5">
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
        {error && <Alert type="danger" message={error} />}
        {message && (
          <Alert
            type={
              statusCode === 500
                ? "danger"
                : statusCode === 200
                ? "primary"
                : "info"
            }
            message={message}
          />
        )}
        <div className="d-grid mb-4">
          <button
            type="submit"
            className="btn btn-primary shadow"
            disabled={!email || !password || loading}>
            {loading && <Spinner />} <span className="ms-2">Login</span>
          </button>
        </div>
        <div>
          <p className="text-center">
            Don&apos;t have an account?
            <Link href="/signup">
              <a className="ms-2 fw-bold text-decoration-none">Create one</a>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

/* Login.propTypes = {
  props: PropTypes,
}; */

export default LoginForm;
