import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
function Footer() {
  return (
    <footer className="footer">
      <div className="firstHalf">
        <h3>
          <DirectionsBusFilledIcon style={{ fontSize: 30 }} />
          ViaBook
        </h3>
        <p>When you have a chois .Chose reserve </p>

        <p>
          Reserve offer bus ticket booking through its website ,IOS,and android
          mobile apps for all major cities.
        </p>

        <p>ViaBook@ViaBook.com </p>
      </div>
      <div className="secondHalf">
        <h3>Follow Us</h3>
        <InstagramIcon />
        <TwitterIcon />
      </div>
    </footer>
  );
}

export default Footer;
