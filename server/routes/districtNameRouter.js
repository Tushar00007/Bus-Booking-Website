import express from "express";
import { handelGetCityName } from "../controller/districtNameController.js";

const router = express.Router();

router.route("/:district").get(handelGetCityName);
export default router;
