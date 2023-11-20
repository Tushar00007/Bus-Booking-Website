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
) {
  try {
    let collection = db.collection("trips");
    let date = new Date();
    let sendBookingData = collection.insertOne({
      date,
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
async function saveBooking({ ...arg }) {
  //  userId, tripId, seatNumber, bookingDate, paymentMethod,amountPaid,;
  let { userId, tripId, seatNumber, bookingDate, paymentMethod, amountPaid } =
    arg;

  try {
    // Insert the booking details into the "bookings" collection
    const result = await db.collection("bookings").insertOne({
      userId,
      tripId,
      seatNumber,
      bookingDate,
      paymentMethod,
      amountPaid,
    });
    return result;
  } catch (error) {
    return error.message;
  }
}

export { connectToDb, postTrips, getTripsData, saveBooking };
