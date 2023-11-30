import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Button from "@mui/material/Button";
import Seat from "../components/seat/Seat";
import "./css/trips.css";
import { selectedBusAndSeat } from "../redux/acction/busAndSeatSelectionAction";
import { filledInputClasses } from "@mui/material";

export default function ControlledAccordions() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let trips = useSelector((state) => state.trips.posts);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);

  const [selectedSeat, setSelectedSeat] = useState("");
  const handelDeparture = (event) => {
    setSelectedDeparture(event.target.value);
  };
  const handelArrival = (event) => {
    setSelectedArrival(event.target.value);
  };
  const handelRating = (event) => {
    setSelectedRating(event.target.value);
  };
  const handelBus = (event) => {
    setSelectedBus(event.target.value);
  };
  // useEffect(() => {
  //   let timeFunction = (time) => {
  //     let newTime = new Date(time * 1000);

  //     return newTime.getHours();
  //   };

  //   let filterDepature = trips.filter((trip) => {
  //     if (selectedDeparture === "DMorning") {
  //       return timeFunction(trip.startTime) < 12;
  //     } else if (selectedDeparture === "DAfternon") {
  //       return (
  //         timeFunction(trip.startTime) >= 12 &&
  //         timeFunction(trip.startTime) <= 16
  //       );
  //     } else if (selectedDeparture === "DEvening") {
  //       return timeFunction(trip.startTime) > 16;
  //     }
  //   });

  //   let filterArrival = trips.filter((trip) => {
  //     if (selectedArrival === "AMorning") {
  //       return timeFunction(trip.EndTime) < 12;
  //     } else if (selectedArrival === "AAfternon") {
  //       return (
  //         timeFunction(trip.EndTime) >= 12 && timeFunction(trip.EndTime) < 16
  //       );
  //     } else if (selectedArrival === "AEvening") {
  //       return timeFunction(trip.EndTime) > 16;
  //     }
  //   });

  //   let filterRating = trips.filter((trip) => {
  //     if (selectedRating === "4StarOrMore") {
  //       return trip.rating >= 4;
  //     } else if (selectedRating === "3StartOrMore") {
  //       return trip.rating >= 3;
  //     } else if (selectedRating === "0-2Star") {
  //       return trip.rating <= 2;
  //     }
  //   });
  //   let filterBusName = trips.filter((trip) => {
  //     return trip.busName === selectedBus;
  //   });

  //   let allBusDataFilterd = [
  //     ...filterDepature,
  //     ...filterArrival,
  //     ...filterRating,
  //     ...filterBusName,
  //   ];

  // }, [trips, selectedBus, selectedRating, selectedDeparture, selectedArrival]);
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
    if (!selecetedSeatNO) return alert("Select seat first");
    dispatch(selectedBusAndSeat(trips[busDataIndex], selecetedSeatNO));
    navigate("/info");
  };
  console.log(trips);
  return (
    <>
      <div className="trips">
        <div className="filters">
          <h3>Filters</h3>
          <div className="filters_child">
            <h6>Departure Time</h6>
            <input
              type="radio"
              name="departure"
              id="Morning"
              value="DMorning"
              checked={selectedDeparture === "DMorning"}
              onChange={handelDeparture}
            />
            <label htmlFor="Morning">Morning</label>
            <br />
            <input
              type="radio"
              name="departure"
              id="Afternon"
              value="DAfternon"
              checked={selectedDeparture === "DAfternon"}
              onChange={handelDeparture}
            />
            <label htmlFor="Afternon">Afternon</label>
            <br />
            <input
              type="radio"
              name="departure"
              value="DEvening"
              checked={selectedDeparture === "DEvening"}
              id="Evening"
              onChange={handelDeparture}
            />
            <label htmlFor="Evening">Evening</label>
            <hr />
            <h6>Arrival Time</h6>
            <input
              type="radio"
              name="Arrival"
              id="morning"
              value="AMorning"
              checked={selectedArrival === "AMorning"}
              onChange={handelArrival}
            />
            <label htmlFor="morning">Morning</label>
            <br />
            <input
              type="radio"
              name="Arrival"
              id="afternon"
              value="AAfternon"
              checked={selectedArrival === "AAfternon"}
              onChange={handelArrival}
            />
            <label htmlFor="afternon">Afternon</label>
            <br />
            <input
              type="radio"
              name="Arrival"
              id="evening"
              value="AEvening"
              checked={selectedArrival === "AEvening"}
              onChange={handelArrival}
            />
            <label htmlFor="evening">Evening</label>
            <hr />
            <h6>Bus Rating</h6>
            <input
              type="radio"
              name="BusRating"
              id="4StarOrmore"
              value="4StarOrMore"
              checked={selectedRating === "4StarOrMore"}
              onChange={handelRating}
            />
            <label htmlFor="4StarOrmore">4 Star or more</label>
            <br />
            <input
              type="radio"
              name="BusRating"
              id="3StartOrMore"
              value="3StartOrMore"
              checked={selectedRating === "3StartOrMore"}
              onChange={handelRating}
            />
            <label htmlFor="3StartOrMore">3 Start or more</label>
            <br />
            <input
              type="radio"
              name="BusRating"
              id="0-2Star"
              value="0-2Star"
              checked={selectedRating === "0-2Star"}
              onChange={handelRating}
            />
            <label htmlFor="0-2Star">0-2 Star</label>
            <hr />
            <h6>Bus Operator</h6>
            {trips.map((trip) => {
              let convertedBusNameArray = trip.busName.split(" ");
              return (
                <>
                  <input
                    type="radio"
                    name="BusOperator"
                    id={trip._id}
                    value={trip.busName}
                    checked={selectedBus === trip.busName}
                    onChange={handelBus}
                  />
                  <label htmlFor={trip._id}>{`${convertedBusNameArray[0]} ${
                    convertedBusNameArray[1] ? convertedBusNameArray[1] : ""
                  }`}</label>
                  <br />
                </>
              );
            })}
          </div>
        </div>
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
                                  <li>{list}</li>
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
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL11")) {
                                    setSelectedSeat("UL11");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL11"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL11")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL12")) {
                                    setSelectedSeat("UL12");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL12"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL12")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL13")) {
                                    setSelectedSeat("UL13");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL13"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL13")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL14")) {
                                    setSelectedSeat("UL14");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL14"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL14")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL15")) {
                                    setSelectedSeat("UL15");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL15"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL15")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL16")) {
                                    setSelectedSeat("UL16");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL16"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL16")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL17")) {
                                    setSelectedSeat("UL17");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL17"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL17")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L2">
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL21")) {
                                    setSelectedSeat("UL21");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL21"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL21")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL22")) {
                                    setSelectedSeat("UL22");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL22"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL22")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL23")) {
                                    setSelectedSeat("UL23");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL23"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL23")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL24")) {
                                    setSelectedSeat("UL24");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL24"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL24")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL25")) {
                                    setSelectedSeat("UL25");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL25"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL25")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL26")) {
                                    setSelectedSeat("UL26");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL26"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL26")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL27")) {
                                    setSelectedSeat("UL27");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL27"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL27")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L3">
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL31")) {
                                    setSelectedSeat("UL31");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL31"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL31")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL32")) {
                                    setSelectedSeat("UL32");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL32"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL32")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL33")) {
                                    setSelectedSeat("UL33");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL33"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL33")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL34")) {
                                    setSelectedSeat("UL34");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL34"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL34")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("UL35")) {
                                    setSelectedSeat("UL35");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL35"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("UL35")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Lower deck of bus */}
                          <div className="lowerDeck">
                            <p>Lower Deck</p>
                            <div className="L1">
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL11")) {
                                    setSelectedSeat("LL11");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL11"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL11")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL12")) {
                                    setSelectedSeat("LL12");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL12"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL12")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL13")) {
                                    setSelectedSeat("LL13");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL13"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL13")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL14")) {
                                    setSelectedSeat("LL14");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL14"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL14")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL15")) {
                                    setSelectedSeat("LL15");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL15"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL15")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL16")) {
                                    setSelectedSeat("LL16");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL16"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL16")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL17")) {
                                    setSelectedSeat("LL17");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL17"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL17")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L2">
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL21")) {
                                    setSelectedSeat("LL21");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL21"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL21")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL22")) {
                                    setSelectedSeat("LL22");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL22"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL22")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL23")) {
                                    setSelectedSeat("LL23");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL23"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL23")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL24")) {
                                    setSelectedSeat("LL24");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL24"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL24")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL25")) {
                                    setSelectedSeat("LL25");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL25"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL25")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL26")) {
                                    setSelectedSeat("LL26");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL26"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL26")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL27")) {
                                    setSelectedSeat("LL27");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL27"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL27")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L3">
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL31")) {
                                    setSelectedSeat("LL31");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL31"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL31")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL32")) {
                                    setSelectedSeat("LL32");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL32"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL32")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL33")) {
                                    setSelectedSeat("LL33");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL33"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL33")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL34")) {
                                    setSelectedSeat("LL34");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL34"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL34")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div
                                onClick={(e) => {
                                  if (!trip.SeatBooked.includes("LL35")) {
                                    setSelectedSeat("LL35");
                                  }
                                }}
                              >
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL35"
                                      ? "selectedSeat"
                                      : ""
                                  } ${
                                    trip.SeatBooked.includes("LL35")
                                      ? "reservedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
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
      </div>
    </>
  );
}
