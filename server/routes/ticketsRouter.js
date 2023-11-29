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
  let ididi = response.insertedID;

  if (response.acknowledged) {
    res.status(201).json({
      status: "Booked",
      data: { ticketId: response.insertedID, otherData: req.body },
    });
  } else {
    res.json({ status: "Booking fail" });
  }
});
export default router;
