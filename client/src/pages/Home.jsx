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

const AutocompleteExample = () => {
  let dispatch = useDispatch();
  let from = useSelector((state) => state.from.posts);
  let to = useSelector((state) => state.to.posts);
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
    try {
      let response = await fetch(
        `http://localhost:8035/api/bk_tic?from=${inputValue1}&to=${inputValue2}&date=${selectedDate}`
      );
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
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
          loading={false}
          style={{ padding: "20px 6px", marginLeft: ".3rem" }}
          onClick={handelSearch}
        >
          Search
        </LoadingButton>
      </div>
    </div>
  );
};

export default AutocompleteExample;
