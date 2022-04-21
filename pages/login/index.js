import React from "react";
import LoginForm from "../../components/forms/Login";
import Header from "../../components/Header";
import Layout from "../../components/layouts/Layout";

function LoginPage() {
  return (
    <Layout title="Checkout">
      <Header />
      <div className="d-flex justify-content-center align-items-center vh-100 my-4">
        <div className="col-sm-5 col-lg-5 col-xl-3">
          <h4 className="text-center">Welcome, back!</h4>
          <h5 className="text-center fw-normal my-3 text-muted">
            Want to get some items for yourself? login
          </h5>
          <div className="card shadow  border-0 mt-4">
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
