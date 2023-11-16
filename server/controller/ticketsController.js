import { getTripsData, postTrips } from "../model/database.js";

const handelPostTrip = async (req, res) => {
  try {
    let {
      data,
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      category,
      SeatBooked,
      bus_no,
      animeties_list,
      busFare,
      busName,
    } = req.body;
    let postTripsResponse = await postTrips(
      data,
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      category,
      SeatBooked,
      bus_no,
      animeties_list,
      busFare,
      busName
    );
    if (postTripsResponse.acknowledged) {
      res.send("Trip Added");
    } else {
      res.send("Fail");
    }
  } catch (error) {
    res.send(error.message);
  }
};

const handelGetTrips = async (req, res) => {
  try {
    let tripData = await getTripsData();

    res.send(tripData);
  } catch (error) {
    res.send(error.message);
  }
};

export { handelPostTrip, handelGetTrips };
