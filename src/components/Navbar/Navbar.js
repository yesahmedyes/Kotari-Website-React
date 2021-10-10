import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
  InputBase,
} from "@material-ui/core";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import algoliasearch from "algoliasearch/lite";
import SearchIcon from "@material-ui/icons/Search";
import logo from "../../assets/logo.png";
import useStyles from "./styles";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import CategoryCard from "./Menu.js";
import LoginCard from "./loginMenu.js";
import SignedInMenu from "./SignedInMenu.js";
import { Link, useLocation, Redirect, withRouter } from "react-router-dom";
import { InstantSearch, SearchBox } from "react-instantsearch/dom";
import { useMediaQuery, useTheme, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { connectHits } from "react-instantsearch-dom";

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
  const theme = useTheme();
  const [searchText, setSearchText] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  let hitArr = {};
  const searchClient = algoliasearch(
    "2XJ1L1U2ZX",
    "ce360b83efef9ae522e29f33c1c65b53"
  );

  const Hits = ({ hits }) => {
    hitArr = hits;
    return (
      <div class="ais-Hits">
        <ul class="ais-Hits-list">
          {hits.map((hit) => (
            <li class="ais-Hits-item">
              <Hit hit={hit} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const CustomHits = connectHits(Hits);
  const Hit = ({ hit }) => {
    return (
      <div
        className="hitContainer"
        onClick={() => {
          let path = "/product/" + hit.objectID;
          setSearchText(null);
          props.history.push("/");
          props.history.push(path);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1" }}>
            <img style={{ width: "100px" }} src={hit.images[0]} />
          </div>

          <div
            style={{ marginLeft: "4%", width: "200px", whiteSpace: "nowrap" }}
          >
            <p>{hit.name.substring(0, 25)}...</p>
          </div>
          <div style={{ flex: "12", marginLeft: "4%" }}>
            <p>Rs {hit.price}</p>
          </div>
        </div>
      </div>
    );
  };
  const SideBar = () => <div className="sidebar"></div>;
  const Content = () => {
    return (
      <div className="content">
        <CustomHits />
      </div>
    );
  };

  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  let aUser = false;
  if (auth) {
    if (auth.isAnonymous) {
      aUser = true;
    }
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
              <p style={{ margin: "0", color: "#ff5151" }}>Kotari</p>
            </div>
          </Typography>
          {!isMatch && (
            <>
              <CategoryCard />
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
                {/* <InstantSearch searchClient={searchClient} indexName="products">
                  <header className="header">
                    <SearchBox
                      translations={{ placeholder: "Search for Products" }}
                      onChange={(event) => {
                        if (searchBox === null) {
                          setSearchBox(event);
                        }
                        if (event.currentTarget.value.length === 0) {
                          setSearchText(null);
                        } else {
                          setSearchText(event.currentTarget.value);
                        }
                      }}
                      onSubmit={(event) => {
                        event.preventDefault();
                        setSearchText(null);
                        props.history.push({
                          pathname: "/products",
                          state: { searchResults: hitArr },
                        });
                      }}
                    />
                  </header>
                  {searchText && (
                    <main style={{ position: "absolute" }}>
                      <SideBar />
                      <Content />
                    </main>
                  )}
                </InstantSearch> */}
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

                <IconButton
                  component={Link}
                  to="/wishlist"
                  aria-label="WishList"
                  color="inherit"
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
                      style={{ margin: "auto" }}
                    >
                      <FavoriteBorderOutlinedIcon
                        className={classes.navIcon}
                        style={{ fontSize: "22px" }}
                      />
                    </Badge>
                    {/* <p className={classes.navIconText}>WishList</p> */}
                  </div>
                </IconButton>

                {location.pathname !== "/cart" ? (
                  <IconButton
                    component={Link}
                    to="/cart"
                    aria-label="Show cart items"
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
                        style={{ margin: "auto" }}
                      >
                        <LocalMallOutlinedIcon
                          className={classes.navIcon}
                          style={{ fontSize: "21px" }}
                        />
                      </Badge>

                      {/* <p className={classes.navIconText}>Bag</p> */}
                    </div>
                  </IconButton>
                ) : null}
              </div>
            </>
          )}
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
