import React, { useState } from "react";
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

export default function ControlledAccordions() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let trips = useSelector((state) => state.trips.posts);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
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

  const radioStyle = {
    width: "20px",
    height: "20px",
    marginRight: "5px",
    appearance: "none", // Reset default styles
    borderRadius: "0", // Ensure square corners
  };
  return (
    <>
      <div className="trips">
        <div className="filters">
          <div>
            <label>
              <input
                type="radio"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
                style={radioStyle}
              />
              Option 1
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
                style={radioStyle}
              />
              Option 2
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={handleOptionChange}
                style={radioStyle}
              />
              Option 3
            </label>
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
                              <div onClick={(e) => setSelectedSeat("UL11")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL11"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL12")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL12"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL13")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL13"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL14")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL14"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL15")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL15"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL16")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL16"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL17")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL17"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L2">
                              <div onClick={(e) => setSelectedSeat("UL21")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL21"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL22")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL22"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL23")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL23"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL24")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL24"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL25")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL25"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL26")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL26"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL27")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL27"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L3">
                              <div onClick={(e) => setSelectedSeat("UL31")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL31"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL32")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL32"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL33")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL33"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL34")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL34"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("UL35")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "UL35"
                                      ? "selectedSeat"
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
                              <div onClick={(e) => setSelectedSeat("LL11")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL11"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL12")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL12"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL13")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL13"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL14")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL14"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL15")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL15"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL16")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL16"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL17")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL17"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L2">
                              <div onClick={(e) => setSelectedSeat("LL21")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL21"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL22")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL22"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL23")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL23"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL24")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL24"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL25")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL25"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL26")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL26"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL27")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL27"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                            </div>
                            <div className="L3">
                              <div onClick={(e) => setSelectedSeat("LL31")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL31"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL32")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL32"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL33")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL33"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL34")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL34"
                                      ? "selectedSeat"
                                      : ""
                                  }`}
                                />
                              </div>
                              <div onClick={(e) => setSelectedSeat("LL35")}>
                                <Seat
                                  seatStlye={`${
                                    selectedSeat === "LL35"
                                      ? "selectedSeat"
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
