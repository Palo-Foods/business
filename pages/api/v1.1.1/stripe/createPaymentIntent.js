const stripe = require("stripe")(process.env.STRIPE_SECRET);

export const createPaymentIntent = async (amount, currency, options) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount, //amount of money to pay 20
    currency: currency, //currency to use "usd" for payment
    payment_method_types: options //["card"]
  });

  return { clientSecret: paymentIntent.client_secret };
};
