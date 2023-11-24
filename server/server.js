import express from "express";
import dotenv from "dotenv";
import bookTicketsRouter from "./routes/ticketsRouter.js";
import districtNameRouter from "./routes/districtNameRouter.js";
import { connectToDb } from "./model/database.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 8035;
dotenv.config();

//Connecting to database
connectToDb();
// middlewares
app.use(express.json());
app.use(cors());
//Routes
app.use("/api/bk_tic", bookTicketsRouter); // Route for booking ticket from api
app.use("/api/district_name", districtNameRouter); //Route for getting district name from api

app.listen(PORT, () => {
  console.log("server has started on PORT Number", PORT);
});
