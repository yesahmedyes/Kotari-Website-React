import React from "react";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Button } from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { Link } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import SideMenu from "./SideMenu";
import useStyles from "./styles";

export default function CategoryCard() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(false);
  const [component, setComponent] = React.useState(null);
  const mapObj = {
    Electronics: {
      Mobiles: ["XUA", "SDF", "DSAFS"],
    },
    Accessories: {
      Bags: ["A", "B", "C"],
    },
  };
  const show = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const remove = (event) => {
    if (anchorEl !== null) {
      setSelected(false);
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  let width;
  let off;
  if (selected === false) {
    off = 0;
    width = "200px";
  } else {
    width = "800px";
    off = 300;
  }
  return (
    <>
      <div onMouseEnter={show} onMouseLeave={remove}>
        <Typography className={classes.leadingText}>Categories</Typography>

        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          disablePortal
          transition
          modifiers={{
            offset: {
              enabled: true,
              offset: `${off}, 0`,
            },
          }}
        >
          <div
            className={classes.sideMenu}
            style={{ width: `${width}` }}
            onMouseLeave={(event) => {
              if (component) {
                component.className = "";
                setComponent(null);
                setSelected(false);
              }
            }}
          >
            <div style={{ flex: "2" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronic Devices
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Accessories
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
                <p
                  onMouseOver={(event) => {
                    if (component) component.className = "";
                    setComponent(event.target);
                    event.target.className = classes.selected;
                    setSelected(true);
                  }}
                >
                  Electronics
                </p>
              </div>
            </div>
            {selected && <SideMenu selected={mapObj[component.innerHTML]} />}
          </div>
        </Popper>
      </div>
    </>
  );
}
