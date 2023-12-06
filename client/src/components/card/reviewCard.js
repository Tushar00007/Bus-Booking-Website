import React from "react";
import { Card, CardContent, Avatar, Typography, Rating } from "@mui/material";

const CustomerReviewCard = ({ customerName, avatarSrc, rating, message }) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "10px"}}>
      <CardContent sx={{ width: 350 }}>
        <Avatar
          alt={customerName}
          src={avatarSrc}
          sx={{ margin: "auto", padding: "2rem" }}
          style={{fontFamily:"cursive"}}
        />
        <Typography variant="h6" component="div" style={{ marginTop: 10 ,fontFamily:"cursive"}}>
          {customerName}
        </Typography>
        <Rating value={rating} readOnly precision={0.5} />
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ marginTop: 10, fontFamily:"italic" }}
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomerReviewCard;
