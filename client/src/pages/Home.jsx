import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { fetchCity1 } from "../redux/acction/cityNameAction1";
import { fetchCity2 } from "../redux/acction/cityNameAction2";
import LoadingButton from "@mui/lab/LoadingButton";
import "./css/home.css";
import { fetchTrips } from "../redux/acction/tripsAction";
import ActionAreaCard from "../components/card/ActionAreaCard";
import Container from "@mui/material/Container";
import bus from "../images/bus.jpg";
import people from "../images/people.jpg";
import ticket from "../images/ticket.jpg";
import CustomerReviewCard from "../components/card/reviewCard";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
const AutocompleteExample = () => {
  let dispatch = useDispatch();
  let from = useSelector((state) => state.from.posts);
  let to = useSelector((state) => state.to.posts);
  let loading = useSelector((state) => state.trips.loading);

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    let newDate = new Date(date);
    const unixTimestamp = newDate.getTime();

    // Convert to seconds by dividing by 1000
    const unixTimestampInSeconds = Math.floor(unixTimestamp / 1000);

    setSelectedDate(unixTimestampInSeconds);
  };

  let handelSearch = async (e) => {
    // console.log(inputValue1, inputValue2, selectedDate, "home inputs");
    dispatch(fetchTrips(inputValue1, inputValue2, selectedDate));
  };
  useEffect(() => {
    if (!inputValue1) return;
    let deboucing = setTimeout(() => {
      dispatch(fetchCity1(inputValue1));
    }, 500);
    return () => clearTimeout(deboucing);
  }, [dispatch, inputValue1]);

  useEffect(() => {
    if (!inputValue2) return;
    let deboucing = setTimeout(() => {
      dispatch(fetchCity2(inputValue2));
    }, 500);
    return () => clearTimeout(deboucing);
  }, [dispatch, inputValue2]);
  return (
    <div className="Home">
      {/* Bus Search */}
      <div className="busSearch">
        <form className="busSearchForm">
          <div className="from">
            <Autocomplete
              id="disable-close-on-select"
              options={from}
              getOptionLabel={(option) => `${option.district}, ${option.state}`}
              style={{ width: 250 }}
              inputValue={inputValue1}
              onInputChange={(event, newInputValue) =>
                setInputValue1(newInputValue)
              }
              renderInput={(params) => (
                <TextField {...params} label="From" variant="standard" />
              )}
            />
          </div>
          <div className="to">
            <Autocomplete
              id="combo-box-demo2"
              options={to}
              getOptionLabel={(option) => `${option.district}, ${option.state}`}
              style={{ width: 250 }}
              inputValue={inputValue2}
              onInputChange={(event, newInputValue) =>
                setInputValue2(newInputValue)
              }
              renderInput={(params) => (
                <TextField {...params} label="To" variant="standard" />
              )}
            />
          </div>
          <div className="datePicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker variant="standard" onChange={handleDateChange} />
            </LocalizationProvider>
          </div>
        </form>
        <LoadingButton
          variant="contained"
          loading={loading}
          style={{ padding: "20px 8px", marginLeft: ".3rem" }}
          onClick={handelSearch}
          sx={{
            backgroundColor: "#3f51b5", // Set your desired background color
            "&:hover": {
              backgroundColor: "#2c3e50", // Set a different color for hover if needed
            },
          }}
        >
          Search
        </LoadingButton>
      </div>
      {/*achievement*/}
      <Container>
        <h2 style={{ marginTop: 2, color: "#3f51b5" }}>
          Your Road to Joyful Journeys!
        </h2>
        <div className="achievement">
          <ActionAreaCard
            img={bus}
            alt={"Bus Image"}
            heading={"1000+"}
            para={"Bus Collection"}
          />
          <ActionAreaCard
            img={people}
            alt={"Happy Customer"}
            heading={"1+ Millon"}
            para={"Happy Customera"}
          />
          <ActionAreaCard
            img={ticket}
            alt={"Ticket"}
            heading={"2000+"}
            para={"Tickets book everyday"}
          />
        </div>
      </Container>
      {/* Customer review */}
      <div className="review">
        <h2>Here's what a few of our customers </h2>
        <h2>have to say about us </h2>

        <div className="customerReview">
          <Container>
            <div className="childCustomerReview">
              <CustomerReviewCard
                customerName="Shubham Agawane"
                avatarSrc="https://example.com/avatar.jpg"
                rating={4.5}
                message="Great product! I highly recommend it."
              />
              <CustomerReviewCard
                customerName="Santosh Leela"
                avatarSrc="https://example.com/avatar.jpg"
                rating={5}
                message="Great product! I highly recommend it."
              />
              <CustomerReviewCard
                customerName="Piyush"
                avatarSrc="https://example.com/avatar.jpg"
                rating={4}
                message="Great product! I highly recommend it."
              />
            </div>
          </Container>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="firstHalf">
          <h3>
            <DirectionsBusFilledIcon style={{ fontSize: 30 }} />
            ViaBook
          </h3>
          <p>When you have a chois .Chose reserve </p>

          <p>
            Reserve offer bus ticket booking through its website ,IOS,and
            android mobile apps for all major cities.
          </p>

          <p>ViaBook@ViaBook.com </p>
        </div>
        <div className="secondHalf">
          <h3>Follow Us</h3>
          <InstagramIcon />
          <TwitterIcon />
        </div>
      </footer>
    </div>
  );
};

export default AutocompleteExample;
