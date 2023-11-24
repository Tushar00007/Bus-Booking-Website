import getRandomUnixTimestampInSameDay from "../helper/randomTime.js";
import { getBusOwnerData, getTripsData, postTrips } from "../model/database.js";

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
    //+ is converting date from string to number
    if (date) filter.date = date;
    if (arrival) filter.arrival = arrival;
    if (departure) filter.departure = departure;
    if (startRating && endRating)
      filter.rating = {
        $gte: parseFloat(startRating),
        $lte: parseFloat(endRating),
      };
    if (operators) filter.operator = { $in: operators.split(",") };

    let tripData = await getTripsData(filter);

    if (tripData.length === 0 && filter.from && filter.to) {
      let busOnwerData = await getBusOwnerData();
      for (let i = 0; i < busOnwerData.length; i++) {
        let randomTimer = getRandomUnixTimestampInSameDay();
        await postTrips(
          date,
          from,
          to,
          busOnwerData[i]._id,
          randomTimer,
          randomTimer + 3600,
          busOnwerData[i].category,
          [],
          "MH01AA1000",
          busOnwerData[i].animeties,
          890,
          busOnwerData[i].name
        );
      }
      let tripDataAgain = await getTripsData(filter);

      return res.send(tripDataAgain);
    }

    res.send(tripData);
  } catch (error) {
    res.send(error.message);
  }
};

export { handelPostTrip, handelGetTrips };
