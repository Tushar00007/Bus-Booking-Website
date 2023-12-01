import express from "express";
import {
  handelGetTrips,
  handelPostTrip,
  handelSaveBooking,
} from "../controller/ticketsController.js";

const router = express.Router();

router.route("/").post(handelPostTrip).get(handelGetTrips);
router.route("/saveBooking").post(handelSaveBooking);
export default router;
