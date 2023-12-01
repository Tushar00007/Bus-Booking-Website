import stripe from "stripe";
let stripeInstance = stripe(process.env.STRIPTOKEN);
let handelPayment = async (req, res) => {
  const DOMAIN = "http://localhost:3000";
  let data = req.body;

  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: data.businfo.busDetails.busFare * 100,
          product_data: {
            name: data.businfo.busDetails.busName,
            description: `Bus Ticket of ${data.businfo.busDetails.busName} from ${data.businfo.busDetails.from} to ${data.businfo.busDetails.to} Seat No ${data.businfo.SeatNo}`,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}/receipt`,
    cancel_url: `${DOMAIN}/cancel`,
  });

  res.json({ id: session.id });
};

export { handelPayment };
