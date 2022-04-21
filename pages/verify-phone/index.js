import React from "react";
import VerifyPhoneForm from "../../components/forms/VerifyPhoneNumber";

function VerifyPhone() {
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-sm-5 col-lg-4 col-xl-3">
          <h5 className="text-center">Verify your phone number</h5>
          <h6 className="text-center fw-normal my-3 text-muted">
            Enter the six(6) digit code sent to your phone
          </h6>
          <div className="card shadow  border-0 mt-4">
            <div className="card-body px-4">
              <VerifyPhoneForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPhone;
