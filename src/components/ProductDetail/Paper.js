import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      height: "1.5px",
      maxWidth: "40px",
      width: "100%",
      backgroundColor: "#FF5151",
      transform: "translate(0, -4px)",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    width: "30px !important",
    textTransform: "none",
    fontWeight: "500",
    fontSize: "12px",
    color: "#333",
    paddingBottom: "0 !important",
    marginRight: theme.spacing(-8),
    "&:focus": {
      opacity: 1,
      outline: "none",
    },
    "&:hover": {
      color: "#555",
      opacity: 1,
      outline: "none",
    },
    "&:active": {
      outline: "none",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
  },
}));

export default function CustomizedTabs({ setSelected }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelected(newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <StyledTabs centered value={value} onChange={handleChange}>
        <StyledTab label="All reviews" />
        <StyledTab label="1 star" />
        <StyledTab label="2 stars" />
        <StyledTab label="3 stars" />
        <StyledTab label="4 stars" />
        <StyledTab label="5 stars" />
      </StyledTabs>
    </div>
  );
}
