import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js/pure";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getPaymentIntent } from "../../functions/GET_PAYMENT_INTENT";
import { useCalculateTotalPrice } from "../../functions/hooks/useCalculateTotalPrice";
import { useUser } from "../../functions/hooks/useUser";

const CheckoutForm = () => {
  const { user } = useUser();
  const { totalPrice } = useCalculateTotalPrice();
  const stripe = useStripe();
  const elements = useElements();

  //fetch payment intent
  const fetchIntent = async () => {
    //fetch payment intent
    const data = JSON.stringify({
      amount: totalPrice.toFixed(0) * 100 || 200,
      currency: "usd",
      options: ["card"],
      email: user?.email || "example@example.com",
    });

    const url = "/api/v1.0.0/stripe/test";

    const { response, error } = await getPaymentIntent(url, data);
    return { clientSecret: response.clientSecret, error };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements || !stripe) {
      return;
    }

    try {
      //1. fetch intent
      console.log("fetching intent...");
      const { clientSecret, error } = await fetchIntent();
      console.log("confirming payment...");
      if (error) {
        return;
      }

      //2. confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.fullName || "Jenny Rosen",
            email: user?.email || "example@example.com",
            phone: user?.phone || "0545110328",
          },
        },
        receipt_email: user?.email || "ebobenrich@gmail.com",
      });
      if (result?.error) {
        console.log(result?.error);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="card-element" className="mb-4">
        Pay for {totalPrice} for your items
      </label>
      <CardElement id="card-element" style={{ base: { fontSize: 18 } }} />
      <div className="text-end me-2 mt-5">
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="btn btn-primary px-4 text-end">
          Pay
        </button>
      </div>
    </form>
  );
};

let stripePromise;
const getStripe = function () {
  if (!stripePromise) stripePromise = loadStripe(process.env.STRIPE_PUBLISHED);

  return stripePromise;
};

!stripePromise && "loading...";

const StripePay = () => {
  return (
    <Elements stripe={getStripe()}>
      <CheckoutForm />
    </Elements>
  );
};
export default StripePay;
