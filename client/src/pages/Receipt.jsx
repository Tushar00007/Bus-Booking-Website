import React, { useEffect, useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Footer from "../components/footer/Footer";
import { Oval } from "react-loader-spinner";
import "./css/info.css";
import "./css/receipt.css";
function Receipt() {
  const [expanded, setExpanded] = useState(false);

  const [confirmBookingData, setConfirmBookingData] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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

  useEffect(() => {
    const storedData = localStorage.getItem("yourReduxData");
    const initialReduxState = storedData ? JSON.parse(storedData) : "";

    if (!initialReduxState) return;

    async function BlokingSeat() {
      try {
        const body = initialReduxState;
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await fetch(
          "https://busbooking-ryds.onrender.com/api/bk_tic/saveBooking",

          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
        localStorage.removeItem("yourReduxData");

        let data = await response.json();
        setConfirmBookingData(data);
      } catch (error) {
        console.log(error, "Error while fething data");
      }
    }

    BlokingSeat();
  }, []);
  if (confirmBookingData === null) {
    return (
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
        <h1>Blocking your seat !!</h1>
      </div>
    );
  }
  console.log(confirmBookingData);
  return (
    <>
      <div className="receipt">
        <div className="receiptContainer">
          <CheckCircleOutlineIcon style={{ color: "#0dc60d", fontSize: 80 }} />
          <h1>Booking has been successful</h1>
          <p>
            Ticket ID:{" "}
            {`${
              confirmBookingData &&
              confirmBookingData?.data.otherData.businfo.SeatNo
            }${
              confirmBookingData &&
              confirmBookingData?.data.otherData.businfo.busDetails.newUniId
            }`}
          </p>
          <p>
            Seat No:{" "}
            {confirmBookingData &&
              confirmBookingData?.data.otherData.businfo.SeatNo}
          </p>
          <p>
            Passenger{" "}
            {confirmBookingData &&
              confirmBookingData?.data.otherData.passengerData.name}{" "}
          </p>
          <p>
            Contact Details:{" "}
            {confirmBookingData &&
              confirmBookingData?.data.otherData.passengerData.mobile}
          </p>
          <div className="receiptBusBookingDetails">
            <Accordion
              expanded={expanded === `panel${1}`}
              onChange={handleChange(`panel${1}`)}
              style={{ border: "1px solid gray", margin: 10 }}
            >
              <AccordionSummary
                aria-controls={`panel${1}bh-content`}
                id={`panel${1}bh-header`}
              >
                {/* Outter */}
                {/* Heading */}
                <div className="tripdata">
                  <div className="info">
                    <h5>
                      {confirmBookingData?.data.otherData.businfo.busDetails
                        .busName
                        ? confirmBookingData?.data.otherData.businfo.busDetails
                            .busName
                        : "Loading.."}
                      <span className="rating">
                        <StarBorderIcon
                          style={{ marginBottom: "2px", fontSize: 20 }}
                        />
                        {confirmBookingData?.data.otherData.businfo.busDetails
                          .rating
                          ? confirmBookingData?.data.otherData.businfo
                              .busDetails.rating
                          : 4.3}
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
                      {confirmBookingData?.data.otherData.businfo.busDetails
                        .category
                        ? confirmBookingData?.data.otherData.businfo.busDetails
                            .category
                        : "A/C Sleeper (2+1)"}{" "}
                      |{" "}
                      {confirmBookingData?.data.otherData.businfo.busDetails
                        .totalSeats
                        ? confirmBookingData?.data.otherData.businfo.busDetails
                            .totalSeats - 1
                        : "38"}
                    </p>
                    {/* Timing */}
                    <h5>
                      {convertUnixTime(
                        confirmBookingData?.data.otherData.businfo.busDetails
                          .startTime
                          ? confirmBookingData?.data.otherData.businfo
                              .busDetails.startTime
                          : 1701160751
                      )}{" "}
                      ----
                      {calTravelTime(
                        confirmBookingData?.data.otherData.businfo.busDetails
                          .startTime
                          ? confirmBookingData?.data.otherData.businfo
                              .busDetails.startTime
                          : 1701160751,
                        confirmBookingData?.data.otherData.businfo.busDetails
                          .EndTime
                          ? confirmBookingData?.data.otherData.businfo
                              .busDetails.EndTime
                          : 1701165751
                      )}
                      ----
                      {convertUnixTime(
                        confirmBookingData?.data.otherData.businfo.busDetails
                          .EndTime
                          ? confirmBookingData?.data.otherData.businfo
                              .busDetails.EndTime
                          : 1701165751
                      )}
                    </h5>
                    <div className="cityInfo">
                      <div className="fromCity">
                        <h6>
                          {confirmBookingData?.data.otherData.businfo.busDetails
                            .from
                            ? confirmBookingData?.data.otherData.businfo.busDetails.from.split(
                                ","
                              )[0]
                            : "City"}
                        </h6>
                        <p>
                          {confirmBookingData?.data.otherData.businfo.busDetails
                            .from
                            ? confirmBookingData?.data.otherData.businfo
                                .busDetails.from
                            : "City,State"}
                        </p>
                      </div>
                      <div className="toCity">
                        <h6>
                          {confirmBookingData?.data.otherData.businfo.busDetails
                            .to
                            ? confirmBookingData?.data.otherData.businfo.busDetails.to.split(
                                ","
                              )[0]
                            : "City"}
                        </h6>
                        <p>
                          {confirmBookingData?.data.otherData.businfo.busDetails
                            .to
                            ? confirmBookingData?.data.otherData.businfo
                                .busDetails.to
                            : "City,State"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionSummary>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Receipt;
