import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  // toolbar: theme.mixins.toolbar,
  // title: {
  //   marginTop: '5%',
  // },
  // emptyButton: {
  //   minWidth: '150px',
  //   [theme.breakpoints.down('xs')]: {
  //     marginBottom: '5px',
  //   },
  //   [theme.breakpoints.up('xs')]: {
  //     marginRight: '20px',
  //   },
  // },
  // checkoutButton: {
  //   minWidth: '150px',
  // },
  title: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: "30px 0 10px 0",
  },
  link: {
    textDecoration: "none",
  },
  cartCheckout: {
    width: "100%",
    margin: "70px 25px 80px auto",
    boxShadow: "0 0 1.5px #aaa",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
  },
  cartSummary: {
    width: "100%",
    margin: "70px auto 80px 25px",
  },
  cartSummaryChild: {
    backgroundColor: "#ffffff",
    boxShadow: "0 0 1.5px #aaa",
    borderRadius: "5px",
    padding: "30px 35px 37px 35px",
  },
  checkoutBtn: {
    backgroundColor: "#FF5151",
    color: "#fff",
    fontWeight: "400",
    width: "100%",
    paddingTop: "10px",
    paddingBottom: "10px",
    textTransform: "none",
    letterSpacing: "1px",
    fontSize: "13px",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
      backgroundColor: "#ed4040",
      color: "#fff",
    },
  },
  titleText: {
    fontWeight: "500",
    color: "#888888",
    fontSize: "14px",
  },
}));
