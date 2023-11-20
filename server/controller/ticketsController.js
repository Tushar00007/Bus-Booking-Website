import { getTripsData, postTrips } from "../model/database.js";

const handelPostTrip = async (req, res) => {
  try {
    let {
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
      res.status(201).send("Trip Added");
    } else {
      res.send("Fail");
    }
  } catch (error) {
    res.send(error.message);
  }
};

const handelGetTrips = async (req, res) => {
  try {
    const {
      from,
      to,
      date,
      arrival,
      departure,
      startRating,
      endRating,
      operators,
    } = req.query;

    const filter = {};
    if (from) filter.from = from;
    if (to) filter.to = to;
    if (date) filter.date = new Date(date);
    if (arrival) filter.arrival = arrival;
    if (departure) filter.departure = departure;
    if (startRating && endRating)
      filter.rating = {
        $gte: parseFloat(startRating),
        $lte: parseFloat(endRating),
      };
    if (operators) filter.operator = { $in: operators.split(",") };

    let tripData = await getTripsData(filter);

    res.send(tripData);
  } catch (error) {
    res.send(error.message);
  }
};

export { handelPostTrip, handelGetTrips };
