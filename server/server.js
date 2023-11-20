import express from "express";
import dotenv from "dotenv";
import bookTicketsRouter from "./routes/ticketsRouter.js";
import { connectToDb } from "./model/database.js";
const app = express();
const PORT = process.env.PORT || 8035;
dotenv.config();

//Connecting to database
connectToDb();
// middlewares
app.use(express.json());
//Routes
app.use("/api/bk_tic", bookTicketsRouter);
app.listen(PORT, () => {
  console.log("server has started on PORT Number", PORT);
});
