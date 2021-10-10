import { withStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React, { Component } from "react";
import { styles } from "./styles";

export class DetailsThumb extends Component {
  render() {
    const { classes, images, tab, myRef } = this.props;
    return (
      <div className={classes.bottomImageContainer} ref={myRef}>
        {images.map((img, index) => (
          <div
            className={classes.bottomImageParent}
          >
            <img
              className={classes.bottomImage}
              src={img}
              alt=""
              key={index}
              onClick={() => tab(index)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(DetailsThumb);
