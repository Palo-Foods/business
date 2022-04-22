import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/layouts/Layout";
import TextInput from "../components/ui/TextInput";
import Password from "../components/ui/Password";
import { useAuth } from "../hooks/auth/useAuth";
import { useStates } from "../hooks/useStates";
import Spinner from "../components/ui/Spinner";
import Alert from "../components/ui/Alert";

function LoginPage() {
  const { auth, loading, statusCode, message, user } = useAuth();
  const { email, setEmail, password, setPassword, setInput, router } = useStates("");

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };
    const url = "/api/v1.0.0/login";
    await auth.signInWithEmailAndPassword(url, data);
  };

  user?.email && router.push("/dashboard");

  return (
    <Layout title="Login">
      <div className="d-flex justify-content-center align-items-center vh-100 my-4">
        <div className="col-sm-5 col-lg-5 col-xl-3">
          <h4 className="text-center">Welcome, back!</h4>
          <h5 className="text-center fw-normal my-3 text-muted">Admin login</h5>
          <div className="card mt-4">
            <div className="card-body">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
