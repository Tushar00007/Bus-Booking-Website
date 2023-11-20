import express from "express";
import { saveBooking } from "../model/database.js";
import {
  handelGetTrips,
  handelPostTrip,
} from "../controller/ticketsController.js";

const router = express.Router();

router.route("/").post(handelPostTrip).get(handelGetTrips);
router.route("/saveBooking").post(async (req, res) => {
  let response = await saveBooking(req.body);
  if (response.acknowledged) {
    res.send("Booking Done");
  } else {
    res.send("Booking faild");
  }
});
export default router;
