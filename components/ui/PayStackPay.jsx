import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useCalculateTotalPrice } from "../../functions/hooks/useCalculateTotalPrice";
import { useUser } from "../../functions/hooks/useUser";

const PayStackPay = () => {
  const { user } = useUser();
  const { totalPrice } = useCalculateTotalPrice();
  const publicKey = process.env.PAYSTACK_PUBLISHED;

  const componentProps = {
    email: user?.email || "ebobenrich@gmail.com",
    amount: totalPrice.toFixed(0) * 100 || 10 * 100,
    currency: "GHS",
    metadata: {
      name: user?.fullName || "Richard bentil",
      phone: user?.phone || "+233545110328",
    },
    publicKey,
    text: "Complete order",
    onSuccess: (reference) => handlePayStackSuccessAction(reference),
    onClose: handlePayStackCloseAction,
  };

  const handlePayStackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePayStackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  return <PaystackButton {...componentProps} className="btn btn-primary" />;
};
export default PayStackPay;
