import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// const uri = "mongodb://127.0.0.1:27017/";// local uri
const uri = process.env.DataBaseURI;
const client = new MongoClient(uri);
async function connectToDb() {
  await client.connect();
  console.log("connected to database");
}
let db = client.db("trips");
// This function is for posting trips data in database
async function postTrips(
  date,
  from,
  to,
  busOwnerID,
  startTime,
  EndTime,
  category,
  SeatBooked,
  totalSeats,
  bus_no,
  animeties_list,
  busFare,
  busName,
  rating
) {
  try {
    let collection = db.collection("trips");
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let unixDate = currentDate.getTime();
    // let date = date ? date : Math.floor(unixDate / 1000);
    let newUniId = `${startTime}${EndTime}${from.split(",")[0]}${
      to.split(",")[0]
    }${busName.split(" ")[0]}`;
    let sendBookingData = collection.insertOne({
      date,
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      category,
      SeatBooked,
      totalSeats,
      bus_no,
      animeties_list,
      busFare,
      busName,
      rating,
      newUniId,
    });

    return sendBookingData;
  } catch (error) {
    return error.message;
  }
}
async function getTripsData(filters) {
  try {
    let collection = db.collection("trips");

    return collection.find(filters).limit(50).toArray();
  } catch (error) {
    return error.message;
  }
}
async function getBusOwnerData() {
  try {
    let collection = db.collection("bus_owner");
    return collection.find().toArray();
  } catch (error) {
    return error.message;
  }
}
async function saveBooking(body) {
  //  userId, tripId, seatNumber, bookingDate, paymentMethod,amountPaid,;

  try {
    let {
      _id,
      date,
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      bus_no,
      busFare,
      busName,
      newUniId,
    } = body.businfo.busDetails;

    let seatNo = body.businfo.SeatNo;
    let { name, gender, age, email, mobile } = body.passengerData;

    let tripBus = db.collection("trips");
    let check = await tripBus.findOne({ newUniId });
    await tripBus.updateOne(
      { newUniId },
      {
        $set: {
          SeatBooked: [...check.SeatBooked, seatNo],
          totalSeats: check.totalSeats - 1,
        },
      }
    );
    // Insert the booking details into the "bookings" collection
    const result = await db.collection("bookings").insertOne({
      tripId: _id,
      date,
      from,
      to,
      busOwnerID,
      startTime,
      EndTime,
      bus_no,
      busFare,
      busName,
      seatNo,
      name,
      gender,
      age,
      email,
      mobile,
    });

    return result;
  } catch (error) {
    return error.message;
  }
}

async function getDistrictName(userInput) {
  userInput = userInput.toLowerCase();
  try {
    const collection = db.collection("state_district");

    const districtsData = await collection.find().toArray();

    const matchingDistricts = districtsData.flatMap((state) =>
      state.districts
        .filter((district) => district.toLowerCase().startsWith(userInput))
        .map((matchingDistrict) => ({
          district: matchingDistrict,
          state: state.state,
        }))
    );

    return matchingDistricts;
  } catch (error) {
    return error.message;
  }
}

export {
  connectToDb,
  postTrips,
  getTripsData,
  saveBooking,
  getBusOwnerData,
  getDistrictName,
};
