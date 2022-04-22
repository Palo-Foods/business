import React from "react";
import SignUpForm from "../../components/forms/SignUp";
import Header from "../../components/Header";
import Layout from "../../components/layouts/Layout";

function LoginPage() {
  return (
    <Layout title="Sign up">
      <div className="d-flex justify-content-center align-items-center vh-100 my-4">
        <div className="col-sm-5 col-lg-5 col-xl-3">
          <h4 className="text-center">Sign up</h4>
          <div className="card shadow  border-0 mt-4">
            <div className="card-body">
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
