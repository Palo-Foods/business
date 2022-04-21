import React from "react";
import StripePay from "../ui/StripePay";

const PaymentModal = ({ paymentMethod }) => {
  return (
    <div
      className="modal fade"
      id="paymentModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true">
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header py-1">
            <h5>Make payment</h5>
            <button
              type="button"
              className="btn btn-default"
              data-bs-dismiss="modal">
              <span className="material-icons bg-light rounded-circle p-2">
                close
              </span>
            </button>
          </div>
          <div className="modal-body my-3">
            {paymentMethod && <StripePay />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
