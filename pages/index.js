import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../hooks/auth/useAuth";
import LoginForm from "../components/forms/Login";

function LoginPage() {
  const { user } = useAuth();

  user?.data?.email && router.push("/dashboard");

  return (
    <Layout title="Login">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-sm-7 col-md-5 col-lg-4 col-xl-3">
          <h5 className="text-center">Welcome, back!</h5>
          <h6 className="text-center fw-normal my-2 text-muted">Manager login</h6>
          <div className="card mt-4">
            <div className="card-body">
            <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
