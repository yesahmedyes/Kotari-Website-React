import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

import Box from "@material-ui/core/Box";

export default function StarRating({ size, value, totalReviews }) {
  return (
    <div>
      <Box component="fieldset">
        <Rating
          name="read-only"
          value={value}
          readOnly
          size={size}
          precision={0.5}
          icon={<StarIcon fontSize="inherit" style={{ color: "#FBC623" }} />}
          emptyIcon={<StarBorderIcon fontSize="inherit" style={{ color: "#FBC623" }} />}
        />
        {totalReviews != null ? (
          <p
            style={{
              display: "inline",
              position: "relative",
              bottom: "4.2px",
              left: "4.5px",
              color: "#888",
              fontSize: "12px",
              fontWeight: "400",
            }}
          >
            ({totalReviews})
          </p>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
}
