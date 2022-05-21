import React from "react";
import Layout from "../components/layouts/Layout";
import LoginForm from "../components/forms/Login";

function LoginPage() {
  return (
    <Layout title="Login">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-sm-7 col-md-5 col-lg-4 col-xl-3">
          <h3 className="text-center">
            <span className="text-primary fw-bold">Palo</span> Business
          </h3>
          <div className="mt-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
