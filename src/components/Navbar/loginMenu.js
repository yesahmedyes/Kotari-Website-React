import React from "react";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button } from "@material-ui/core";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import { Link } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import useStyles from "./styles";

export default function LoginCard() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const show = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const remove = (event) => {
    if (anchorEl !== null) {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <div style={{ display: "inline" }} onMouseEnter={show} onMouseLeave={remove}>
        <IconButton aria-label="account of current user" color="inherit">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PersonOutlinedIcon className={classes.navIcon} style={{ fontSize: "24px" }} />
            {/* <p className={classes.navIconText}>Profile</p> */}
          </div>
        </IconButton>

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          disablePortal
          transition
          modifiers={{
            offset: {
              enabled: true,
            },
          }}
        >
          <div className={classes.signinMenu}>
            <div style={{ margin: "15px" }}>
              <h5 className={classes.welcome}>Welcome</h5>
              <p className={classes.welcomeSecondary}>login to place and manage orders</p>
              <Button component={Link} to="/signup" type="button" variant="contained" className={classes.loginButton}>
                Signup / Login
              </Button>
            </div>
          </div>
        </Popper>
      </div>
    </>
  );
}
