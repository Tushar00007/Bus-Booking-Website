import express from "express";
import dotenv from "dotenv";

import bookTicketsRouter from "./routes/ticketsRouter.js";
import districtNameRouter from "./routes/districtNameRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import { connectToDb } from "./model/database.js";
import cors from "cors";
dotenv.config();

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
app.use("/api/payment", paymentRouter);

app.listen(PORT, () => {
  console.log("server has started on PORT Number", PORT);
});
