import React from "react";

import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
function Footer() {
  return (
    <footer className="footer" style={{backgroundColor:"#323232"}}>
      <div className="firstHalf">
        <h3>
          <DirectionsBusFilledIcon style={{ fontSize: 30 }} />
          MakeMyTrip
        </h3>
        <p> Nothing is Better than MakeMyTrip </p>

        <p>MakeMyTrip@MakeMyTrip.com </p>
      </div>
     
    </footer>
  );
}

export default Footer;
