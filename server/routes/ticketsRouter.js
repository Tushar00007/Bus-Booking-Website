import express from "express";

import {
  handelGetTrips,
  handelPostTrip,
} from "../controller/ticketsController.js";

const router = express.Router();

router.route("/").post(handelPostTrip).get(handelGetTrips);
export default router;
