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

// This function is for posting trips data in database
async function postTrips(
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
) {
  try {
    let db = client.db("trips");
    let collection = db.collection("trips");
    let sendBookingData = collection.insertOne({
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
    });
    return sendBookingData;
  } catch (error) {
    return error.message;
  }
}
async function getTripsData() {
  try {
    let db = client.db("trips");
    let collection = db.collection("trips");
    return collection.find({}).limit(50).toArray();
  } catch (error) {
    return error.message;
  }
}

export { connectToDb, postTrips, getTripsData };
