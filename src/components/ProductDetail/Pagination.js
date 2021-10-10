import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
  },
  pagination: {
    color: "#FF5151",
  },
}));

export default function BasicPagination({ count, selectPage }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    selectPage(value);
    setPage(value);
  };
  return (
    <div className={classes.root}>
      <div style={{ display: "flex" }}>
        <Pagination count={count} onChange={handleChange} />
      </div>
    </div>
  );
}
