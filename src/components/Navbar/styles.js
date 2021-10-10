import { makeStyles, fade } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  shop: {
    flexGrow: 0.1,
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  popover: {},
  paper: {
    padding: theme.spacing(1),
  },
  shop: {
    flexGrow: 0.1,
    display: "flex",
  },
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    background: "#fff",
    boxShadow: "0 0 2.5px #aaa",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    padding: "3px 15px",
  },
  title: {
    flexGrow: 0.4,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },
  logoText: {
    margin: "0",
    fontSize: "21px",
    display: "flex",
    flexFlow: "row",
  },
  leadingText: {
    padding: "2px 1px 0 1px",
    margin: "0 15px",
    color: "#444",
    fontWeight: "500",
    fontSize: "15px",
    cursor: "pointer",
    "&:hover": {
      padding: "2.5px 1px",
      borderBottom: "2.4px solid rgba(255, 81, 81, 1)",
      transform: "translate(0, 2px)",
    },
  },
  search: {
    position: "relative",
    borderRadius: "5px",
    backgroundColor: "#F2F2F2",
    marginLeft: "0px",
    width: "400px",
  },
  searchIcon: {
    color: "#777",
    margin: "0 15px",
    fontSize: "18px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    fontSize: "14px",
    fontWeight: "400",
    color: "#000",
  },
  inputInput: {
    padding: "12px 30px 12px 45px",
    width: "100%",
  },
  navIcon: {
    margin: "auto",
    color: "#777",
  },
  navIconText: {
    paddingTop: "1px",
    color: "#fff",
    fontSize: "11px",
    margin: "0",
    fontWeight: "500",
  },
  selected: {
    fontWeight: "400",
    color: "#FF5151",
  },
  sideMenu: {
    display: "flex",
    backgroundColor: "white",
    transform: "translate(0, 21.8px)",
    zIndex: "0",
    padding: "15px 10px 15px 10px",
    borderRadius: "0 0 8px 8px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  signinMenu: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transform: "translate(0, 10px)",
  },
  welcome: {
    color: "#444",
    fontWeight: "500",
    padding: "0 2px",
  },
  welcomeSecondary: {
    color: "#666",
    fontSize: "12px",
    fontWeight: "400",
    margin: "0",
    padding: "0 2px 35px 2px",
  },
  loginButton: {
    borderRadius: "5px",
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
      backgroundColor: "#ed4040",
      color: "#fff",
    },
  },
}));
