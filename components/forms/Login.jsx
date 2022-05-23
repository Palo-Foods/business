import React from "react";
import TextInput from "../../components/ui/TextInput";
import Password from "../../components/ui/Password";
import { useLogin } from "../../hooks/auth/useLogin";
import { useStates } from "../../hooks/useStates";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";

export default function LoginForm() {
  const url = "api/v1.1.1/users/login";
  const { login, loading, statusCode, message } = useLogin(url);
  const { email, password, setInput, setEmail, setPassword } = useStates("");

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    await login(data);
  };

  return (
    <form className="my-3 mx-2" onSubmit={handleLogin}>
      <div className="mb-3">
        <TextInput
          type="email"
          text={email}
          setInput={setInput}
          setText={setEmail}
          classes=""
          id="email"
          placeholder="Email address"
        />
      </div>
      <div className="mb-4">
        <Password
          type="password"
          text={password}
          setInput={setInput}
          setText={setPassword}
          classes=""
          placeholder="Password"
        />
      </div>
      {statusCode && (
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
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary rounded-pill"
          disabled={!email || !password || loading}>
          {loading && <Spinner className="ms-2" />}
          {!loading && <span>Login</span>}
        </button>
      </div>
    </form>
  );
}
