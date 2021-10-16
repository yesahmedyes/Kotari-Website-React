import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  InputBase,
} from "@material-ui/core";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import useStyles from "./styles";
import LoginCard from "./LoginMenu.js";
import SignedInMenu from "./SignedInMenu.js";
import { Link, useLocation, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = (props) => {
  const {
    totalItems,
    auth,
    wishItems,
    setCart,
    setDocId,
    setWishId,
    setUser,
    setWishlist,
    setTotalItems,
    setTotalWish,
  } = props;
  const classes = useStyles();
  const location = useLocation();

  let aUser = false;
  if (auth && auth.isAnonymous) {
    aUser = true;
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
          >
            <div className={classes.logoText}>
              <p className={classes.logoTextP}>Kotari</p>
            </div>
          </Typography>

          <Typography className={classes.leadingText}>Categories</Typography>
          <Typography className={classes.leadingText}>Shops</Typography>
          <Typography className={classes.leadingText}>Brands</Typography>

          <div style={{ flexGrow: "1" }} />

          <div className={classes.search}>
            <div>
              <SearchIcon className={classes.searchIcon} />
            </div>
            <InputBase
              placeholder="Search for products and shops"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              fullWidth="true"
            />
          </div>

          <div style={{ flexGrow: "1" }} />

          <div>
            {location.pathname !== "/signup" && aUser ? (
              <LoginCard />
            ) : (
              <SignedInMenu
                auth={auth}
                setCart={setCart}
                setTotalItems={setTotalItems}
                setTotalWish={setTotalWish}
                setUser={setUser}
                setDocId={setDocId}
                setWishId={setWishId}
                setWishlist={setWishlist}
              />
            )}

            {location.pathname !== "/wishlist" ? (
              <IconButton
                component={Link}
                to="/wishlist"
                aria-label="WishList"
                color="inherit"
                className={classes.navIconButton}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    badgeContent={wishItems}
                    color="secondary"
                    classes={{badge: classes.customBadge}}
                    style={{ margin: "auto" }}
                  >
                    <FavoriteBorderOutlinedIcon
                      className={classes.navIcon}
                      style={{ fontSize: "21px" }}
                    />
                  </Badge>
                  <p className={classes.navIconText}>Wishlist</p>
                </div>
              </IconButton>
            ) : null }

            {location.pathname !== "/cart" ? (
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart items"
                className={classes.navIconButton}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Badge
                    badgeContent={totalItems}
                    color="secondary"
                    classes={{badge: classes.customBadge}}
                    style={{ margin: "auto" }}
                  >
                    <LocalMallOutlinedIcon
                      className={classes.navIcon}
                      style={{ fontSize: "20px" }}
                    />
                  </Badge>

                  <p className={classes.navIconText}>Bag</p>

                </div>
              </IconButton>
            ) : null}
          </div>

        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default withRouter(connect(mapStateToProps, null)(Navbar));
