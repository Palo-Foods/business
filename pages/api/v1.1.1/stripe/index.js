import { createPaymentIntent } from "./createPaymentIntent";

export default async (req, res) => {
  //get req body data
  const { amount, currency, options, email } = JSON.parse(JSON.parse(req.body));
  try {
    //fetch client secret from stripe
    const { clientSecret } = await createPaymentIntent(
      amount,
      currency,
      options,
      email
    );

    res.status(201).json({
      status: 201,
      statusText: "OK",
      data: {
        clientSecret,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 200,
      statusText: "Internal server error",
      error: error.message,
    });
  }
};
