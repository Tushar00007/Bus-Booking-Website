import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({ img, alt, heading, para }) {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "10px" }}>
      <CardActionArea sx={{ width: 350 }}>
        <CardMedia component="img" height="200" image={img} alt={alt} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {para}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
