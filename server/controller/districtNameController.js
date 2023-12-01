import { getDistrictName } from "../model/database.js";
let handelGetCityName = async (req, res) => {
  let userInput = req.params.district;
  try {
    let response = await getDistrictName(userInput);

    res.json(response);
  } catch (error) {
    res.json(error.message);
  }
};

export { handelGetCityName };
