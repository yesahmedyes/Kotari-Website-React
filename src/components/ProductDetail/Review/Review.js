import React from "react";
import StarRating from "../StarRating";
const Review = ({ reviewText, date, starVal }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "2%",
      }}
    >
      <div style={{ position: "relative", right: "2.5px" }}>
        <StarRating value={starVal} size="small" />
      </div>
      <p style={{ color: "#999", fontSize: "10px", margin: "2px 0", fontWeight: "400" }}>{date}</p>
      <p
        style={{
          margin: "0px",
          fontSize: "15px",
          marginTop: "3.5px",
          color: "#333",
          fontWeight: "300",
        }}
      >
        {reviewText}
      </p>
    </div>
  );
};
export default Review;
