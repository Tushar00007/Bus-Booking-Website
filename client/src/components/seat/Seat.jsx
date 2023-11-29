import React from "react";
import "./css/seat.css";
function Seat({ seatStlye, seatData }) {
  return (
    <div className={`outer ${seatStlye}`}>
      <div className="inner"></div>
    </div>
  );
}

export default Seat;
