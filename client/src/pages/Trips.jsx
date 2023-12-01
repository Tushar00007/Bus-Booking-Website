import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import Seat from "../components/seat/Seat";
import { selectedBusAndSeat } from "../redux/acction/busAndSeatSelectionAction";
import { Oval } from "react-loader-spinner";
import { Toaster, toast } from "react-hot-toast";
import "./css/trips.css";

export default function ControlledAccordions() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let trips = useSelector((state) => state.trips.posts);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [selectedSeat, setSelectedSeat] = useState("");

  let convertUnixTime = (time) => {
    let monthShortForm = {
      1: "JAN",
      2: "FEB",
      3: "MAR",
      4: "APR",
      5: "MAY",
      6: "Jun",
      7: "JUL",
      8: "AUG",
      9: "SEP",
      10: "OCt",
      11: "NOV",
      12: "DEC",
    };
    let newTime = new Date(time * 1000);

    return `${newTime.getHours()}:${newTime.getMinutes()},${newTime.getDate()} ${
      monthShortForm[newTime.getMonth() + 1]
    }`;
  };
  let calTravelTime = (startTime, endTime) => {
    const timestamp1InMilliseconds = startTime * 1000;
    const timestamp2InMilliseconds = endTime * 1000;
    const differenceInMilliseconds =
      timestamp2InMilliseconds - timestamp1InMilliseconds;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    // const differenceInMinutes = differenceInSeconds / 60;

    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}hrs${formattedMinutes}mins`;
  };
  let handelProceedBooking = (busDataIndex, selecetedSeatNO) => {
    if (!selecetedSeatNO) return toast.error("Please select at least one seat");
    dispatch(selectedBusAndSeat(trips[busDataIndex], selecetedSeatNO));
    navigate("/info");
  };

  const UL1 = ["UL11", "UL12", "UL13", "UL14", "UL15", "UL16", "UL17"];
  const UL2 = ["UL21", "UL22", "UL23", "UL24", "UL25", "UL26", "UL27"];
  const UL3 = ["UL31", "UL32", "UL33", "UL34", "UL35"];
  const LL1 = ["LL11", "LL12", "LL13", "LL14", "LL15", "LL16", "LL17"];
  const LL2 = ["LL21", "LL22", "LL23", "LL24", "LL25", "LL26", "LL27"];
  const LL3 = ["LL31", "LL32", "LL33", "LL34", "LL35"];

  if (trips.length === 0) {
    return (
      <>
        <div className="Loader">
          <Oval
            height={150}
            width={150}
            color="#0dc60d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          <h1>Searching !!</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="trips">
        {/* All Trips */}
        <div className="allTrips">
          {trips &&
            trips.map((trip, index) => {
              return (
                <>
                  <Accordion
                    expanded={expanded === `panel${trip._id}`}
                    onChange={handleChange(`panel${trip._id}`)}
                    style={{ border: "1px solid gray", margin: 10 }}
                    key={trip._id}
                  >
                    <AccordionSummary
                      aria-controls={`panel${trip._id}bh-content`}
                      id={`panel${trip._id}bh-header`}
                      onClick={(e) => {
                        setSelectedSeat("");
                      }}
                    >
                      {/* Outter */}
                      {/* Heading */}
                      <div className="tripdata">
                        <div className="info">
                          <h5>
                            {trip.busName}
                            <span className="rating">
                              <StarBorderIcon
                                style={{ marginBottom: "2px", fontSize: 20 }}
                              />
                              {trip.rating}
                            </span>
                            <span
                              style={{
                                fontWeight: "normal",
                                fontSize: 13,
                                marginLeft: 4,
                              }}
                            >
                              Ratings
                            </span>
                          </h5>
                          {/* bus type */}
                          <p>
                            {trip.category
                              ? trip.category
                              : "A/C Sleeper (2+1) "}
                            | {trip.totalSeats} seats left
                          </p>
                          {/* Timing */}
                          <h4>
                            {convertUnixTime(trip.startTime)} ----
                            {calTravelTime(trip.startTime, trip.EndTime)}----
                            {convertUnixTime(trip.EndTime)}
                          </h4>
                          {/* animeties  */}
                          <ul className="animeties">
                            {trip.animeties_list.map((list) => {
                              return (
                                <>
                                  <li key={list}>{list}</li>
                                </>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="priceAndSeats">
                          <h6>Trip Cost</h6>
                          <p>Starting From</p>
                          <h5>₹{trip.busFare}</h5>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "#fb9156" }}
                          >
                            {expanded === `panel${trip._id}`
                              ? "Hide Seats"
                              : "View Seats"}
                          </Button>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{ borderTop: "1px solid #3f51b5" }}
                    >
                      {/* Inner layer */}
                      <h3>Select Seats</h3>
                      <div className="selectSeat">
                        <div className="busSeats">
                          {/* upper deck of bus */}
                          <div className="upperDeck">
                            <p>Upper Deck</p>
                            <div className="L1">
                              {UL1.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L2">
                              {UL2.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L3">
                              {UL3.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                          {/* Lower deck of bus */}
                          <div className="lowerDeck">
                            <p>Lower Deck</p>
                            <div className="L1">
                              {LL1.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L2">
                              {LL2.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                            <div className="L3">
                              {LL3.map((seatName) => {
                                return (
                                  <>
                                    <div
                                      key={seatName}
                                      onClick={(e) => {
                                        if (
                                          !trip.SeatBooked.includes(seatName)
                                        ) {
                                          setSelectedSeat(seatName);
                                        }
                                      }}
                                    >
                                      <Seat
                                        seatStlye={`${
                                          selectedSeat === seatName
                                            ? "selectedSeat"
                                            : ""
                                        } ${
                                          trip.SeatBooked.includes(seatName)
                                            ? "reservedSeat"
                                            : ""
                                        }`}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="summary">
                          <h5>Boarding & Dropping</h5>
                          <div className="from">
                            <div>
                              <h6>{trip.from.split(",")[0]} </h6>
                              <p>{trip.from}</p>
                            </div>
                            <h6>
                              {convertUnixTime(trip.startTime).split(",")[0]}
                            </h6>
                          </div>
                          <div className="to">
                            <div>
                              <h6>{trip.to.split(",")[0]}</h6>
                              <p>{trip.to}</p>
                            </div>
                            <h6>
                              {convertUnixTime(trip.EndTime).split(",")[0]}
                            </h6>
                          </div>
                          <hr />
                          <div className="seatNo">
                            <h6>Seat No.</h6>
                            <h6>
                              {selectedSeat ? selectedSeat : "No Seat Selected"}
                            </h6>
                          </div>
                          <hr />
                          <div className="fareDetails">
                            <h6>Fare Details</h6>
                            <div>
                              <p>Amount</p>
                              <h6>{trip.busFare}</h6>
                            </div>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#fb9156",
                                margin: "auto",
                                width: "100%",
                              }}
                              onClick={(e) =>
                                handelProceedBooking(index, selectedSeat)
                              }
                            >
                              Proceed To Book
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}
        </div>
        <div>
          <Toaster />
        </div>
      </div>
    </>
  );
}
