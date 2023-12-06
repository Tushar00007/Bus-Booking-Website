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
import { fetchTrips } from "../redux/acction/tripsAction";
import ActionAreaCard from "../components/card/ActionAreaCard";
import Container from "@mui/material/Container";
import bus from "../images/bus.jpg";
import people from "../images/peoples.jpg";
import ticket from "../images/tickets.jpg";
import CustomerReviewCard from "../components/card/reviewCard";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./css/home.css";
const AutocompleteExample = () => {
  let navigate = useNavigate();
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
    if (!inputValue1 || !inputValue2 || !selectedDate)
      return toast.error("Please enter a value!");
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
  useEffect(() => {
    if (loading) {
      navigate("/trips");
    }
  }, [loading, navigate]);
  return (
    <div className="Home">
      {/* Bus Search */}
      <div className="busSearch"  style={{borderRadius:"13px"}}>
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
          style={{ padding: "15px 5px", marginLeft: ".3rem", fontFamily:"cursive", marginBottom:"100px", marginLeft:"5px"}}
          onClick={handelSearch}
          sx={{
            backgroundColor: "#e51c23", // Set your desired background color
            "&:hover": {
              backgroundColor: "#891015", // Set a different color for hover if needed
            },
          }}
          className="homeLoadingButton"
        >
          Search
        </LoadingButton>
      </div>
      {/*achievement*/}
      <Container>
        <h2 style={{ marginTop: 20, color: "#e51c23", fontWeight:"bold" ,fontFamily:"cursive" ,boxShadow:"20px,20px"}}>
          Joyful Journeys !
        </h2>
        <div className="achievement" >
          <ActionAreaCard 
            img={bus}
            alt={"Bus Image"}
            heading={"1000+"}
            para={"Bus Collection"}
          />
          <ActionAreaCard
            img={people}
            alt={"Happy Customer"}
            heading={"2+ Millon"}
            para={"Happy Customer"}
          />
          <ActionAreaCard
            img={ticket}
            alt={"Ticket"}
            heading={"3000+"}
            para={"Tickets book everyday"}
          />
        </div>
      </Container>
      {/* Customer review */}
      <div className="review" style={{fontFamily:"cursive", marginBottom:10}}>
        {/*<h2>Here's what a few of our customers </h2>*/}
        <h2 style={{fontWeight:"bold"}}>Customers Reviews </h2>

        <div className="customerReview"  style={{backgroundColor:"#323232"}} >
          <Container>
            <div className="childCustomerReview" >
              <CustomerReviewCard
                customerName="Mukesh Jagwal"
                avatarSrc="https://example.com/avatar.jpg"
                rating={4.5}
                message="Awesome travel experience with MakeMyTrip. Excellent staff."
              />
              <CustomerReviewCard
                customerName="Sandip Jaiswal"
                avatarSrc="https://example.com/avatar.jpg"
                rating={5}
                message="Amazing service. Always a best time with MakeMyTrip."
              />
              <CustomerReviewCard
                customerName="Amit Mishra"
                avatarSrc="https://example.com/avatar.jpg"
                rating={4}
                message="Bus was clean and the journey was smooth . Reached on time ."
              />
            </div>
          </Container>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
      <Footer />
    </div>
  );
};

export default AutocompleteExample;
