import React from "react";
import TextInput from "../../components/ui/TextInput";
import Password from "../../components/ui/Password";
import { useAuth } from "../../hooks/auth/useAuth";
import { useStates } from "../../hooks/useStates";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { useUserInSession } from "../../hooks/useUserInSession";

export default function LoginForm() {
  const { auth, loading, statusCode, message } = useAuth();
  const { email, password, router, setInput, setEmail, setPassword } =
    useStates("");
  const { user } = useUserInSession();
  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };
    const url = "api/v1.1.1/users/login/managers";
    await auth.signInWithEmailAndPassword(url, data);
    console.log("user", user);
  };

  return (
    <form className="my-3 mx-2" onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-normal">
          Enter email address
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
      <div className="mb-4">
        <label htmlFor="password" className="form-label fw-normal">
          Enter a password
        </label>
        <Password
          type="password"
          text={password}
          setInput={setInput}
          setText={setPassword}
          classes=""
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
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!email || !password || loading}>
          {loading && <Spinner />} <span className="ms-2">Login</span>
        </button>
      </div>
    </form>
  );
}
