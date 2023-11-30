import express from "express";
import dotenv from "dotenv";
import stripe from "stripe";
import bookTicketsRouter from "./routes/ticketsRouter.js";
import districtNameRouter from "./routes/districtNameRouter.js";
import { connectToDb } from "./model/database.js";
import cors from "cors";
dotenv.config();

let stripeInstance = stripe(process.env.STRIPTOKEN);
const app = express();
const PORT = process.env.PORT || 8035;

//Connecting to database
connectToDb();
// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//Routes
app.use("/api/bk_tic", bookTicketsRouter); // Route for booking ticket from api
app.use("/api/district_name", districtNameRouter); //Route for getting district name from api

// Tem difing payment here
app.post("/create-checkout-session", async (req, res) => {
  const YOUR_DOMAIN = "http://localhost:3000";
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
    success_url: `${YOUR_DOMAIN}/receipt`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });

  res.json({ id: session.id });
});

app.listen(PORT, () => {
  console.log("server has started on PORT Number", PORT);
});
