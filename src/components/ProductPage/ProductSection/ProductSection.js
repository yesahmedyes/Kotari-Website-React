import React from "react";
import CardsBox from "../CardsBox/CardsBox";
import Sidebar from "../Simpleaccordion/Sidebar";
import { Grid, makeStyles } from "@material-ui/core";
import Products from "../../products/Products";
const styles = makeStyles((theme) => ({
  sideBar: {
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
}));

function ProductSection({searchResults}) {
  const classes = styles();
  console.log(searchResults);
  return (
    <React.Fragment>
      <Grid container justify="center" direction="row">
        <Grid item lg={3} className={classes.sideBar}>

          <Sidebar />
        </Grid>

        <Grid item lg={9} md={12} sm={12}>
          {searchResults.length!==0&&(<><Products products={searchResults}/></>)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ProductSection;
