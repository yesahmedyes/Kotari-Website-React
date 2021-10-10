import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Fade
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import useStyles from "./styles";

const Product = ({ product, addToCart, id }) => {
  const classes = useStyles();
  let path = "/product/" + id;
  const discount = ((1 - product.price / product.orignalPrice) * 100).toFixed(
    1
  );

  const [showComponent, setShowComponent] = useState(false);

  const handleToggleHoverIn = (event) => {
    event.preventDefault();
    setShowComponent(true);
  };

  const handleToggleHoverOut = (event) => {
    event.preventDefault();
    setShowComponent(false);
  };

  return (
    <>
      <Grid item md={3} style={{ margin: "20px" }}>
        <Card
          className={classes.cardContainer}
          onMouseEnter={handleToggleHoverIn}
          onMouseLeave={handleToggleHoverOut}
        >
          <Button
            component={Link}
            to={{
              pathname: path,
              state: { product: product },
            }}
            style={{ padding: "0" }}
          >
            <div>
              <div style={{ alignItems: "center", position: "relative" }}>
                <CardMedia
                  component="img"
                  image={product.images[0]}
                  alt={product.id}
                  className={classes.cardImage}
                />
                <Fade in={showComponent}>
                  <div className={classes.cardImageHover}>
                    <FavoriteBorderOutlinedIcon className={classes.wishList} />
                  </div>
                </Fade>
              </div>
              <CardContent className={classes.cardContent}>
                <div className="text-2-bold">
                  {product.name.substring(0, 25)}
                  {product.name.length > 25 ? "..." : ""}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "6px",
                  }}
                >
                  <div className={classes.price}>Rs. {product.price}</div>
                  <div className={classes.oPrice}>
                    Rs. {product.orignalPrice}
                  </div>
                  <div className={classes.discount}>({discount}% OFF)</div>
                </div>
              </CardContent>
            </div>
          </Button>
        </Card>
      </Grid>
    </>
  );
};

export default Product;
