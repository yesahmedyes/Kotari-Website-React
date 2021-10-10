import React from "react";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button } from "@material-ui/core";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import { Link,Redirect } from "react-router-dom";
import {firebase} from "../../firebase"
import {connect} from "react-redux";
import useStyles from "./styles";


const SignedInMenu=({ render, update,auth,setCart,setUser,setTotalWish,setTotalItems,setDocId,setWishId,setWishlist })=> {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const show = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const remove = (event) => {
        if(anchorEl!==null){
            setAnchorEl(null);
        }



  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <div
        style={{ display: "inline" }}
        onMouseEnter={show}
        onMouseLeave={remove}
      >
        <IconButton aria-label="account of current user" color="inherit">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonOutlinedIcon
              className={classes.navIcon}
              style={{ fontSize: "24px" }}
            />
            {/* <p className={classes.navIconText}>Profile</p> */}
          </div>
        </IconButton>

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          disablePortal
          placement="bottom-start"
          transition
          modifiers={{
            offset: {
              enabled: true,
              offset: "-100,10",
            },
          }}
        >
          <div className={classes.paper}>
            <div style={{ margin: "15px" }}>
              <h5>
                <b>{auth ? auth.phoneNumber : null}</b>
              </h5>
              <Button
                component={Link}
                to="/"
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(() => {
                      console.log("LOGGED OFF");
                      setDocId(null);
                      setWishId(null);
                      setCart([]);
                      setTotalWish(0);
                      setTotalItems(0);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Popper>
      </div>
    </>
  );
}
const mapDispatchToProps=dispatch=>{
  return {
    logout:()=> dispatch({type:"LOGOUT"})
  };
}
export default connect(null,mapDispatchToProps)(SignedInMenu);
