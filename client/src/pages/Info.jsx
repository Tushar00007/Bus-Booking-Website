import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import "./css/info.css";
import Footer from "../components/footer/Footer";
import { loadStripe } from "@stripe/stripe-js";
function Info() {
  let dispatch = useDispatch();
  let busAndSeat = useSelector((state) => state.busAndSeat.info);
  console.log(busAndSeat);
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
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
    mobile: "",
  });
  const gender = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let { name, gender, email, age, mobile } = formData;
    if (!name) return alert("Enter Name");
    if (!gender) return alert("Enter Gender");
    if (!email) return alert("Enter Email");
    if (!age) return alert("Enter Age");
    if (!mobile) return alert("Enter Moble");
    localStorage.setItem(
      "yourReduxData",
      JSON.stringify({
        businfo: busAndSeat,
        passengerData: formData,
      })
    );

    const stripe = await loadStripe(
      "pk_test_51NmyexSBxwSrzID7Glui9NRenoHGI6T2W0DVe0DkLkwlHxONGcLiH2wxqxFDorA4ZGtDH1XlaK6PWL8ke5QeJpqd00fZwC2m3i"
    );
    const body = {
      businfo: busAndSeat,
      passengerData: formData,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8035/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const sessionData = await response.json(); // Wait for the response to be parsed
    const session = sessionData.id; // Extract the session ID
    const result = stripe.redirectToCheckout({
      sessionId: session,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <div className="infoPage">
        <div className="tripDetails">
          {/* Bus info */}
          <Accordion style={{ border: "1px solid gray", margin: 10 }}>
            <AccordionSummary id={`panel${1}bh-header`}>
              {/* Outter */}
              {/* Heading */}
              <div className="tripdata">
                <div className="info">
                  <h5>
                    {busAndSeat.busDetails.busName}
                    <span className="rating">
                      <StarBorderIcon
                        style={{ marginBottom: "2px", fontSize: 20 }}
                      />
                      {busAndSeat.busDetails.rating}
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
                    {busAndSeat.busDetails.category
                      ? busAndSeat.busDetails.category
                      : "A/C Sleeper (2+1)"}
                    | {busAndSeat.busDetails.totalSeats}seats left
                  </p>
                  {/* Timing */}
                  <h4>
                    {convertUnixTime(busAndSeat.busDetails.startTime)} ----
                    {calTravelTime(
                      busAndSeat.busDetails.startTime,
                      busAndSeat.busDetails.EndTime
                    )}
                    ----
                    {convertUnixTime(busAndSeat.busDetails.EndTime)}
                  </h4>
                  <div className="cityInfo">
                    <div className="fromCity">
                      <h6> {busAndSeat.busDetails.from.split(",")[0]}</h6>
                      <p>{busAndSeat.busDetails.from}</p>
                    </div>
                    <div className="toCity">
                      <h6>{busAndSeat.busDetails.to.split(",")[0]}</h6>
                      <p>{busAndSeat.busDetails.to}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionSummary>
          </Accordion>
          {/* Passenger will enter travling details  */}
          <div className="passengerDetails">
            <h3>Enter Traveller Details</h3>

            <form onSubmit={handleSubmit} className="passengerDetailsForm">
              <h6>Seat No {busAndSeat.SeatNo}</h6>

              <div className="passengerDetailsFormInputs">
                <Grid container>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChangeInput}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                      style={{ marginLeft: 10 }}
                    >
                      <div>
                        <TextField
                          id="outlined-select-currency"
                          select
                          label="Gender"
                          name="gender"
                          onChange={handleChangeInput}
                          value={formData.gender}
                        >
                          {gender.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      type="Number"
                      id="outlined-basic"
                      label="Age"
                      variant="outlined"
                      name="age"
                      value={formData.age}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={3} style={{ marginTop: 10 }}>
                    <TextField
                      type="Email"
                      id="outlined-basic"
                      label="Email Id"
                      variant="outlined"
                      name="email"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={3} style={{ marginTop: 10 }}>
                    <TextField
                      type="Number"
                      id="outlined-basic"
                      label="Mobile No"
                      variant="outlined"
                      name="mobile"
                      onChange={handleChangeInput}
                    />
                  </Grid>
                </Grid>
              </div>
            </form>
          </div>
        </div>
        <div className="fareDetailsInfo">
          <div className="fareSummary">
            <h3>Fare Details</h3>
            <div className="baseFare">
              <p>Base Fare</p>
              <h6>{busAndSeat.busDetails.busFare - 100}</h6>
            </div>
            <div className="tax">
              <p>Tax</p>
              <h6>150</h6>
            </div>
            <div className="offer">
              <p>Offer applied</p>
              <h6>50</h6>
            </div>
            <hr />
            <div className="totalPrice">
              <p>Total Price</p>
              <h6>{busAndSeat.busDetails.busFare}</h6>
            </div>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#fb9156",
                margin: "auto",
                width: "100%",
              }}
              onClick={handleSubmit}
            >
              Proceed To Book
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Info;
