import express from "express";
import { getDistrictName } from "../model/database.js";

const router = express.Router();

router.route("/:district").get(async (req, res) => {
  let userInput = req.params.district;
  try {
    let response = await getDistrictName(userInput);

    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
});
export default router;
