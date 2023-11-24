import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={districts}
      // onChange={(e) => {
      //   console.log(e.target.innerText);
      // }}
      sx={{ width: 300 }}
      renderInput={(params) => {
        return <TextField {...params} label="From" />;
      }}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const districts = [
  { label: "Mumbai", state: "Maharashtra" },
  { label: "Nashik", state: "Maharashtra" },
  { label: "Pune", state: "Maharashtra" },
  { label: "Banglore", state: "Maharashtra" },
  { label: "Jhasi", state: "Maharashtra" },
  { label: "Goa" },
  { label: "Jaipur", state: "Maharashtra" },
];
