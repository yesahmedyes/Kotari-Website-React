import React from "react";
import DetailsThumb from "./DetailsThumb";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import StarRating from "./StarRating";
import MaterialAccordion from "./Accordion";
import Selector from "./Selector";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import { Typography, Button, Container, Divider } from "@material-ui/core";
import BasicPagination from "./Pagination.js";
import CenteredTabs from "./Paper.js";
import Skeleton from "@material-ui/lab/Skeleton";
import { db } from "../../firebase";
import { connect } from "react-redux";
import Review from "./Review/Review";
import { styles } from "./styles";

class ProductDetail extends React.Component {
  state = {
    index: 0,
    variations: {},
    product: null,
    quantity: 1,
    starData: {},
    totalRating: 0,
    totalReviews: 0,
    reviewsMap: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] },
    selectedRating: 0,
    selectedPage: 1,
    start: 0,
    end: 5,
    showReviews: false,
    oldId: null,
  };

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    // console.log(images[index].className);
    // images[index].className = `${images[index].className}`;
    // console.log(images[index].className);
  };
  setSelected = (value) => {
    this.setState({ selectedRating: value });
  };
  setPage = (value) => {
    this.setState({ selectedPage: value, start: (value - 1) * 20, end: value * 20 }, () => {});
  };
  fetchProduct = () => {
    window.scrollTo(0, 0);
    let product;
    if (this.props.products.length !== 0) {
      product = this.props.products[this.props.match.params.id];
      let variations;
      Object.keys(product.variations).map((variation) => {
        variations = {
          ...variations,
          [variation]: product.variations[variation][0],
        };
      });

      this.setState({
        product: { ...product },
        variations: variations,
        oldId: this.props.match.params.id,
      });
    } else {
      db.collection("products")
        .doc(this.props.match.params.id)
        .get()
        .then((data) => {
          product = data.data();
          let variations;
          Object.keys(product.variations).map((variation) => {
            variations = {
              ...variations,
              [variation]: product.variations[variation][0],
            };
          });

          this.setState({
            product: { ...product },
            variations: variations,
            oldId: this.props.match.params.id,
          });
        });
    }
  };
  componentDidMount() {
    this.fetchProduct();
  }
  addToWishlist = (wishList, setWishlist, totalWish, setTotalWish, setPrice, price, wishId) => {
    let tempProd = { ...this.state.product };
    let id = this.props.match.params.id;
    tempProd.quantity = 1;
    tempProd.variations = { ...this.state.variations };
    tempProd.productId = this.props.match.params.id;
    let temp = [];
    let tempString = "";
    for (let key of Object.entries(this.state.variations)) {
      tempString = "";
      tempString += key[0];
      tempString += "[";
      tempString += key[1];
      tempString += "]";
      temp.push(tempString);
    }
    let compare = temp.sort();
    let answer = "";
    for (let x = 0; x < compare.length; x++) {
      answer += compare[x];
      if (x !== compare.length - 1) {
        answer += "-";
      }
    }

    db.collection("wishlist")
      .doc(wishId)
      .collection("products")
      .doc(id + "-" + answer)
      .set({
        product: this.props.match.params.id,
        variations: this.state.variations,
      })
      .then(() => {})
      .catch((error) => {});
    let found = false;

    for (var i = 0; i < wishList.length; i++) {
      let temp = [];
      let tempString = "";
      for (let key of Object.entries(wishList[i].variations)) {
        tempString = "";
        tempString += key[0];
        tempString += "[";
        tempString += key[1];
        tempString += "]";
        temp.push(tempString);
      }
      let compare = temp.sort();
      let cartCompare = "";
      for (let x = 0; x < compare.length; x++) {
        cartCompare += compare[x];
        if (x !== compare.length - 1) {
          cartCompare += "-";
        }
      }
      let cmp1 = wishList[i].productId + "-" + cartCompare;
      let cmp2 = this.props.match.params.id + "-" + answer;

      if (cmp1 == cmp2) {
        db.collection("wishlist")
          .doc(wishId)
          .collection("products")
          .doc(wishList[i].productId + "-" + cartCompare)
          .set({
            product: wishList[i].productId,
            variations: wishList[i].variations,
          })
          .then(() => {})
          .catch((error) => {});
        found = true;
        break;
      }
    }
    if (!found) {
      setTotalWish(totalWish + 1);
      setWishlist([...wishList, tempProd]);
    }
  };
  addToCart = (cart, setCart, totalItems, setTotalItems, setPrice, price, docId) => {
    let tempProd = { ...this.state.product };
    let id = this.props.match.params.id;
    tempProd.quantity = this.state.quantity;
    tempProd.variations = { ...this.state.variations };
    tempProd.productId = this.props.match.params.id;

    let temp = [];
    let tempString = "";
    for (let key of Object.entries(this.state.variations)) {
      tempString = "";
      tempString += key[0];
      tempString += "[";
      tempString += key[1];
      tempString += "]";
      temp.push(tempString);
    }
    let compare = temp.sort();
    let answer = "";
    for (let x = 0; x < compare.length; x++) {
      answer += compare[x];
      if (x !== compare.length - 1) {
        answer += "-";
      }
    }
    db.collection("cart")
      .doc(docId)
      .collection("products")
      .doc(id + "-" + answer)
      .set({
        product: this.props.match.params.id,
        variations: this.state.variations,
        quantity: this.state.quantity,
      })
      .then(() => {})
      .catch((error) => {});
    let found = false;
    for (var i = 0; i < cart.length; i++) {
      let temp = [];
      let tempString = "";
      for (let key of Object.entries(cart[i].variations)) {
        tempString = "";
        tempString += key[0];
        tempString += "[";
        tempString += key[1];
        tempString += "]";
        temp.push(tempString);
      }
      let compare = temp.sort();
      let cartCompare = "";
      for (let x = 0; x < compare.length; x++) {
        cartCompare += compare[x];
        if (x !== compare.length - 1) {
          cartCompare += "-";
        }
      }
      let cmp1 = cart[i].productId + "-" + cartCompare;
      let cmp2 = this.props.match.params.id + "-" + answer;

      if (cmp1 == cmp2) {
        cart[i].quantity += this.state.quantity;
        setPrice((price) => price + cart[i].price * this.state.quantity);
        db.collection("cart")
          .doc(docId)
          .collection("products")
          .doc(cart[i].productId + "-" + cartCompare)
          .set({
            product: cart[i].productId,
            variations: cart[i].variations,
            quantity: cart[i].quantity + this.state.quantity,
          })
          .then(() => {})
          .catch((error) => {});
        found = true;
        break;
      }
    }
    if (!found) {
      setPrice((price) => price + this.state.product.price * this.state.quantity);

      setCart([...cart, tempProd]);
      setTotalItems(totalItems + 1);
    }
  };
  handleVariation = (event) => {
    const name = event.target.name;
    this.setState({
      variations: {
        ...this.state.variations,
        [name]: event.target.value,
      },
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id == this.state.oldId) {
      return;
    } else {
      this.setState(
        {
          index: 0,
          variations: {},
          product: null,
          quantity: 1,
          starData: {},
          totalRating: 0,
          totalReviews: 0,
          reviewsMap: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] },
          selectedRating: 0,
          selectedPage: 1,
          start: 0,
          end: 5,
          showReviews: false,
          oldId: null,
        },
        () => {
          this.fetchProduct();
        }
      );
    }
  }
  render() {
    const {
      classes,
      cart,
      setCart,
      totalItems,
      setTotalItems,
      setPrice,
      price,
      docId,
      wishId,
      wishList,
      setWishlist,
      totalWish,
      setTotalWish,
      products,
    } = this.props;
    if (!this.state.showReviews) {
      db.collection("product-reviews")
        .where("productId", "==", this.props.match.params.id)
        .get()
        .then((querySnapshot) => {
          let data;
          let docId;
          querySnapshot.forEach((doc) => {
            data = doc.data();
            docId = doc.id;
          });
          if (data !== undefined) {
            this.setState({
              totalRating: data.rating,
              starData: data.data,
              totalReviews: data.total,
              showReviews: true,
            });
            db.collection("product-reviews")
              .doc(docId)
              .collection("reviews")
              .orderBy("date", "desc")
              .get()
              .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());

                this.setState({ reviews: data });
                let map = {};
                map[0] = data;
                map[1] = [];
                map[2] = [];
                map[3] = [];
                map[4] = [];
                map[5] = [];
                data.forEach((review) => {
                  map[review.rating].push(review);
                });
                this.setState({ reviewsMap: { ...map } });
              });
          }
        });
    }
    const { index } = this.state;
    let product;
    if (products.length !== 0) {
      product = products[this.props.match.params.id];
    }
    if (this.state.product) {
      product = this.state.product;
    }

    if (this.myRef.current !== null) {
      let tempClass = this.myRef.current.children[index].className;
      if (!tempClass.includes("active")) {
        this.myRef.current.children[index].className = `${tempClass} active`;
      }
    }

    const discount = ((1 - product.price / product.orignalPrice) * 100).toFixed(1);

    return (
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div className={classes.productDetail}>
          <div
            style={{
              display: "flex",
              padding: "70px",
            }}
          >
            <div style={{ flex: "6" }}>
              {product ? (
                <div style={{ padding: "0 10px" }}>
                  <img src={product.images[index]} alt={product.name} style={{ width: "85%" }} />
                  <div style={{ width: "85%" }}>
                    <DetailsThumb images={product.images} tab={this.handleTab} myRef={this.myRef} />
                  </div>
                </div>
              ) : (
                <div style={{ padding: "0 10px", height: "100%" }}>
                  <Skeleton variant="rect" width={"85%"} height={"100%"} />
                </div>
              )}
            </div>

            <div style={{ flex: "8" }}>
              {product ? (
                <div style={{ padding: "0 10px" }}>
                  <h5 className={classes.storeName}>Khaadi</h5>
                  <p className={classes.productName}>{product.name}</p>
                  <StarRating
                    value={product.rating ? product.rating : this.state.totalRating}
                    totalReviews={product.total ? product.total : this.state.totalReviews}
                    size="small"
                  />
                  <div style={{ paddingTop: "20px", paddingBottom: "30px" }}>
                    <Divider variant="fullWidth" style={{ margin: "6px 0", background: "#ccc" }} />
                    <MaterialAccordion heading="Details & Highlights" description={product.description} />
                    <Divider variant="fullWidth" style={{ margin: "6px 0", background: "#ccc" }} />
                    <div style={{ padding: "12px 16px" }}>
                      <Typography className={classes.heading}>Variations</Typography>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {Object.keys(product.variations).map((variation) => (
                          <Selector name={variation} variations={product.variations} handleVariation={this.handleVariation} />
                        ))}
                      </div>
                    </div>
                    <Divider variant="fullWidth" style={{ margin: "6px 0", background: "#ccc" }} />
                    <div
                      style={{
                        padding: "18px 16px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography className={classes.heading}>Price</Typography>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className={classes.price}>Rs. {product.price}</div>
                        <div className={classes.oPrice}>Rs. {product.orignalPrice}</div>
                        <div className={classes.discount}>({discount}% OFF)</div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      type="button"
                      className={classes.wishList}
                      onClick={() => {
                        this.addToWishlist(wishList, setWishlist, totalWish, setTotalWish, setPrice, price, wishId);
                      }}
                    >
                      <FavoriteBorderOutlinedIcon className={classes.wishIcon} />

                      <span style={{ paddingTop: "1px" }}>Add to list</span>
                    </Button>
                    <Button
                      onClick={() => {
                        this.addToCart(cart, setCart, totalItems, setTotalItems, setPrice, price, docId);
                      }}
                      type="button"
                      variant="contained"
                      className={classes.cart}
                    >
                      <LocalMallOutlinedIcon className={classes.cartIcon} />
                      <span style={{ paddingTop: "2px" }}>Add to bag</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Skeleton variant="text" />

                  <Skeleton style={{ marginTop: "10px" }} variant="text" />

                  <Skeleton variant="text" width="30%" style={{ marginTop: "10px" }} />

                  <Skeleton variant="rect" width="60%" style={{ marginTop: "50px" }} />

                  <Skeleton variant="rect" width="80%" style={{ marginTop: "30px" }} />

                  <Skeleton variant="rect" width="80%" style={{ marginTop: "30px" }} />

                  <Skeleton variant="rect" width="100%" style={{ marginTop: "30px" }} />

                  <Skeleton variant="rect" width="100%" style={{ marginTop: "30px" }} />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: "60px",
                    }}
                  >
                    <Skeleton variant="rect" width="40%" height={50} />
                    <Skeleton variant="rect" width="40%" height={50} />
                  </div>
                </>
              )}

              {/* <div
                style={{ display: "flex", marginTop: "6%", marginBottom: "6%" }}
              >
                {product ? (
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "15px",
                      marginTop: "10px",
                    }}
                  >
                    <Typography className={classes.qty}>Qty</Typography>
                    <Button
                      type="button"
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        if (this.state.quantity > 1) {
                          this.setState({ quantity: this.state.quantity - 1 });
                        }
                      }}
                    >
                      -
                    </Button>
                    <Typography className={classes.button}>
                      {this.state.quantity}
                    </Typography>
                    <Button
                      type="button"
                      size="small"
                      className={classes.button}
                      onClick={() => {
                        this.setState({ quantity: this.state.quantity + 1 });
                      }}
                    >
                      +
                    </Button>
                  </div>
                ) : (
                  <>
                    <Skeleton variant="rect" width={210} height={20} />
                  </>
                )}
              </div>
*/}
            </div>
          </div>
        </div>

        <div className={classes.reviewContainer}>
          <div>
            {product ? (
              <>
                <p className={classes.reviewHeading}>{this.state.totalReviews} Reviews</p>
                <Divider variant="fullWidth" style={{ background: "#ccc" }} />
                {this.state.showReviews && (
                  <div style={{ paddingBottom: "5px" }}>
                    <div style={{ width: "100%", display: "flex" }}>
                      <div style={{ flex: 1 }} className={classes.topBarContainer}>
                        <StarRating value={this.state.totalRating} size="medium" />
                        <p className={classes.ratingText}>{this.state.totalRating}/5</p>
                      </div>

                      <Divider orientation="vertical" style={{ background: "#ccc", height: "250px" }} />

                      <div style={{ flex: 1 }} className={classes.topBarContainer}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
                            <span className={classes.nStars}>5 star</span>
                            <div className={classes.nStarOuter}>
                              <div
                                className={classes.nStarInner}
                                style={{
                                  width: `${(this.state.starData[5] / this.state.totalReviews) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
                            <span className={classes.nStars}>4 star</span>
                            <div className={classes.nStarOuter}>
                              <div
                                className={classes.nStarInner}
                                style={{
                                  width: `${(this.state.starData[4] / this.state.totalReviews) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
                            <span className={classes.nStars}>3 star</span>
                            <div className={classes.nStarOuter}>
                              <div
                                className={classes.nStarInner}
                                style={{
                                  width: `${(this.state.starData[3] / this.state.totalReviews) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
                            <span className={classes.nStars}>2 star</span>
                            <div className={classes.nStarOuter}>
                              <div
                                className={classes.nStarInner}
                                style={{
                                  width: `${(this.state.starData[2] / this.state.totalReviews) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span className={classes.nStars} style={{ paddingRight: "1.5%", marginLeft: "0.5%" }}>
                              1 star
                            </span>
                            <div className={classes.nStarOuter}>
                              <div
                                className={classes.nStarInner}
                                style={{
                                  width: `${(this.state.starData[1] / this.state.totalReviews) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Divider variant="fullWidth" style={{ background: "#ccc" }} />

                    <CenteredTabs setSelected={this.setSelected} />

                    <div
                      style={{
                        margin: "50px 80px 60px 80px",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", paddingBottom: "8px" }}>
                        {this.state.reviewsMap[this.state.selectedRating].slice(this.state.start, this.state.end).map((review) => {
                          let date = new Date(review.date.seconds * 1000);
                          return <Review reviewText={review.text} date={date.toDateString()} starVal={review.rating} />;
                        })}
                      </div>
                      <BasicPagination
                        selectPage={this.setPage}
                        count={Math.ceil(this.state.reviewsMap[this.state.selectedRating].length / 20)}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Skeleton variant="rect" width="100%" style={{ marginTop: "30px" }} />
              </>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch({ type: "GETUSER" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductDetail));
