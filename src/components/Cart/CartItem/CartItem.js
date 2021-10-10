import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { firebase, db } from "../../../firebase";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { IconButton } from "@material-ui/core";
import useStyles from "./styles";

const CartItem = ({
  product,
  fetchCart,
  handleUpdateCartQty,
  length,
  setLength,
  price,
  setPrice,
  userId,
  mapShow,
  mapQuantity,
  mapVariations,
  access,
  removeString,
  docId,
  setProductPrice,
}) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(() => mapQuantity[access]);
  const [show, setShow] = useState(() => mapShow[access]);
  const removeItem = () => {
    db.collection("cart")
      .doc(docId)
      .collection("products")
      .doc(removeString)
      .delete()
      .then((cart) => {
        setLength((length) => length - 1);
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        mapShow[access] = true;
        console.error("Error removing document: ", error);
      });
  };
  useEffect(() => {
    if (!mapShow[access]) {
      return () => {
        fetchCart();
      };
    }
  });
  if (show) {
    return (
      <div
        className={classes.cartItem}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            flex: "5",
            display: "flex",
          }}
        >
          <div
            style={{
              margin: "auto",
            }}
          >
            <IconButton>
              <DeleteOutlineIcon
                className={classes.deleteButton}
                onClick={() => {
                  mapShow[access] = false;
                  setProductPrice(
                    (oldPrice) => oldPrice - mapQuantity[access] * product.price
                  );
                  mapQuantity[access] = 0;

                  removeItem();
                }}
              />
            </IconButton>
          </div>
        </div>
        <div style={{ flex: "12", display: "flex" }}>
          <img
            src={product.images[0]}
            alt=""
            style={{ width: "80px", borderRadius: "3px", margin: "auto" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: "40" }}>
          <div style={{ paddingLeft: "15px", paddingRight: "15px" }}>
            <p
              className="text-3"
              style={{ marginRight: "10px", marginBottom: "6px" }}
            >
              {product.name}
            </p>
            {mapVariations[access].map((variation) => {
              return (
                <p
                  className="text-3"
                  style={{ marginRight: "50px", marginBottom: "4px" }}
                >
                  <span style={{ fontWeight: "500" }}>{variation[0]}:</span>{" "}
                  {variation[1]}
                </p>
              );
            })}
          </div>
        </div>
        <p
          className="text-3-bold"
          style={{ flex: "15", textAlign: "center", marginBottom: "8px" }}
        >
          PKR {product.price}
        </p>
        <div style={{ flex: "18", display: "flex" }}>
          <div
            className={classes.buttons}
            style={{ margin: "auto", marginBottom: "8px" }}
          >
            <Button
              type="button"
              size="small"
              className={[classes.qBtn, classes.qBtnLeft].join(" ")}
              onClick={() => {
                setProductPrice((oldPrice) => oldPrice - product.price);
                mapQuantity[access]--;
                if (mapQuantity[access] === 0) {
                  mapShow[access] = false;
                  removeItem();
                  return;
                }
                handleUpdateCartQty(access, mapQuantity[access]);
              }}
            >
              -
            </Button>
            <Typography className={classes.qValue}>
              {mapQuantity[access]}
            </Typography>
            <Button
              type="button"
              size="small"
              className={[classes.qBtn, classes.qBtnRight].join(" ")}
              onClick={() => {
                setProductPrice((oldPrice) => oldPrice + product.price);
                mapQuantity[access]++;
                handleUpdateCartQty(access, mapQuantity[access]);
              }}
            >
              +
            </Button>
          </div>
        </div>
        <p
          className="text-3-bold"
          style={{ flex: "15", textAlign: "center", marginBottom: "8px" }}
        >
          PKR {product.price * mapQuantity[access]}
        </p>
      </div>
    );
  } else {
    mapShow[access] = false;

    return null;
  }
};

export default CartItem;
