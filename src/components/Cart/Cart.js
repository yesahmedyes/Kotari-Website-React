import React, { useState, useEffect, useMemo } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";

const Cart = ({ cart, handleUpdateCartQty, fetchCart, handleEmptyCart, price, loadingCart, setPrice, userId, docId }) => {
  console.log(loadingCart);
  useEffect(() => {
    return () => {
      fetchCart();
    };
  }, [userId]);
  const classes = useStyles();
  const [length, setLength] = useState(cart.length);
  const [productPrice, setProductPrice] = useState(0);
  const deliveryPrice = 100;
  const taxes = 16;

  const mapShow = useMemo(() => {
    return {};
  }, [userId]);
  const mapQuantity = useMemo(() => {
    return {};
  }, [userId]);
  let mapVariations = useMemo(() => {
    return {};
  }, [userId]);
  let temp = 0;
  if (productPrice === 0 && cart.length !== 0) {
    cart.forEach((product) => {
      temp += product.price * product.quantity;
    });
    setProductPrice(temp);
  }

  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,{" "}
      <Link to="/" className={classes.link}>
        start adding!
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div className={classes.cartCheckout} style={{ flex: "16", paddingLeft: "20px", paddingRight: "20px" }}>
          <div className={classes.title}>
            <span style={{ flex: "5" }}></span>

            <div style={{ flex: "12", textAlign: "center" }}>
              <p className={classes.titleText}>Item</p>
            </div>
            <div style={{ flex: "40" }}>
              <p className={classes.titleText} style={{ marginLeft: "15px" }}>
                Details
              </p>
            </div>
            <div style={{ flex: "15", textAlign: "center" }}>
              <p className={classes.titleText}>Price</p>
            </div>
            <div style={{ flex: "18", textAlign: "center" }}>
              <p className={classes.titleText}>Quantity</p>
            </div>
            <div style={{ flex: "15", textAlign: "center" }}>
              <p className={classes.titleText}>Subtotal</p>
            </div>
          </div>

          <Divider variant="middle" style={{ marginBottom: "15px", background: "#ccc" }} />

          {!loadingCart ? (
            <>
              {cart.map((product) => {
                let access;
                let removeString = product.productId + "-";
                let temp2 = [];
                let tempString = "";
                for (let key of Object.entries(product.variations)) {
                  tempString = "";
                  tempString += key[0];
                  tempString += "[";
                  tempString += key[1];
                  tempString += "]";
                  temp2.push(tempString);
                }
                let tempCompare = temp2.sort();
                for (let x = 0; x < tempCompare.length; x++) {
                  removeString += tempCompare[x];
                  if (x !== tempCompare.length - 1) {
                    removeString += "-";
                  }
                }
                access = removeString;
                if (mapVariations[access] === undefined) {
                  mapVariations[access] = Object.entries(product.variations);
                }
                if (mapShow[access] === undefined) {
                  mapShow[access] = true;
                }
                if (mapQuantity[access] === undefined) {
                  mapQuantity[access] = product.quantity;
                }

                return (
                  <>
                    <CartItem
                      setProductPrice={setProductPrice}
                      docId={docId}
                      removeString={removeString}
                      mapVariations={mapVariations}
                      access={access}
                      mapQuantity={mapQuantity}
                      fetchCart={fetchCart}
                      mapShow={mapShow}
                      userId={userId}
                      product={product}
                      handleUpdateCartQty={handleUpdateCartQty}
                      length={length}
                      setLength={setLength}
                      setPrice={setPrice}
                      price={price}
                    />
                  </>
                );
              })}
              <div style={{ paddingBottom: "25px" }}></div>
            </>
          ) : (
            <div>
              <div
                style={{
                  marginTop: "40px",
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
              >
                <div style={{ marginTop: "10px" }}>
                  <Skeleton variant="text" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Skeleton variant="text" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Skeleton variant="text" width="80%" />
                </div>
              </div>
              <div
                style={{
                  marginTop: "30px",
                  marginLeft: "50px",
                  marginRight: "50px",
                  marginBottom: "50px",
                }}
              >
                <div style={{ marginTop: "10px" }}>
                  <Skeleton variant="text" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Skeleton variant="text" />
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Skeleton variant="text" width="80%" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={classes.cartSummary} style={{ flex: "5" }}>
          <div className={classes.cartSummaryChild}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "block", alignContent: "flex-start" }}>
                <p className="text-3" style={{ marginBottom: "8px" }}>
                  Subtotal
                </p>
                <p className="text-3" style={{ marginBottom: "8px" }}>
                  Delivery
                </p>
                <p className="text-3">Taxes</p>
              </div>
              <div style={{ display: "block", justifyContent: "flex-start" }}>
                <p className="text-3-bold" style={{ marginBottom: "8px" }}>
                  PKR {productPrice}
                </p>
                <p className="text-3-bold" style={{ marginBottom: "8px" }}>
                  PKR {deliveryPrice}
                </p>
                <p className="text-3-bold">PKR {taxes}</p>
              </div>
            </div>

            <Divider variant="middle" style={{ margin: "15px 0", background: "#ccc" }} />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <p className="text-3"> Total </p>
              <p className="text-3-bold">PKR {productPrice + deliveryPrice + taxes}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <>
                {" "}
                <Button type="button" variant="contained" size="medium" className={classes.checkoutBtn} component={Link} to="/checkout">
                  Proceed to Checkout
                </Button>
              </>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
  if (!cart) return "Loading...";
  console.log("cart", cart);
  return <div>{cart.length === 0 && loadingCart === false ? <EmptyCart /> : <FilledCart />}</div>;
};

export default Cart;
