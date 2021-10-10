import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  accordion: {
    boxShadow: "none",
  },
  heading: {
    fontSize: "15px",
    fontWeight: "400",
    color: "#666",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    padding: "0 10px 5px 10px",
  },
}));

export default function MaterialAccordion({ heading, description }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiAccordion className={classes.accordion}>
        <MuiAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{heading}</Typography>
        </MuiAccordionSummary>
        <MuiAccordionDetails style={{paddingTop: "0"}}>
          <Typography className={classes.description}>{description}</Typography>
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
}
