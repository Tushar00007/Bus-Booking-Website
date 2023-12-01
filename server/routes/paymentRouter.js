import express from "express";
import { handelPayment } from "../controller/paymentController.js";
const router = express.Router();

router.route("/create-checkout-session").post(handelPayment);
export default router;
