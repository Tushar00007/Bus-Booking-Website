import getRandomUnixTimestampInSameDay from "../helper/randomTime.js";
import {
  getBusOwnerData,
  getTripsData,
  postTrips,
  saveBooking,
} from "../model/database.js";

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
      res.status(201).json({ status: "ok" });
    } else {
      res.json({ status: "fail" });
    }
  } catch (error) {
    res.json(error.message);
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
        let SeatBooked = [];
        await postTrips(
          date,
          from,
          to,
          busOnwerData[i]._id,
          randomTimer,
          randomTimer + 3600,
          busOnwerData[i].category,
          SeatBooked,
          busOnwerData[i].totalSeats,
          "MH01AA1000",
          busOnwerData[i].animeties,
          890,
          busOnwerData[i].name,
          busOnwerData[i].rating
        );
      }
      let tripDataAgain = await getTripsData(filter);

      return res.json(tripDataAgain);
    }

    res.json(tripData);
  } catch (error) {
    res.json(error.message);
  }
};
let handelSaveBooking = async (req, res) => {
  let response = await saveBooking(req.body);

  if (response.acknowledged) {
    res.status(201).json({
      status: "Booked",
      data: { ticketId: response.insertedID, otherData: req.body },
    });
  } else {
    res.json({ status: "Booking fail" });
  }
};
export { handelPostTrip, handelGetTrips, handelSaveBooking };
