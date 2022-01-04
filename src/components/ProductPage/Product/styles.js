import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  cardContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 1.5px #aaa",
  },
  cardImage: {
    width: "100%",
    borderRadius: "5px 5px 0 0",
  },
  cardImageHover: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    top: "0",
    right: "0",
    width: "100%",
    height: "100%",
  },
  wishList: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "23px",
    position: "absolute",
    right: "18px",
    top: "15px",
  },
  cardContent: {
    width: "100%",
    padding: "25px 10px 25px 10px",
  },
  price: {
    fontWeight: "500",
    fontSize: "15px",
    color: "#333",
    padding: "0 3px",
    textTransform: "none",
  },
  oPrice: {
    fontWeight: "400",
    fontSize: "12.5px",
    color: "#999",
    padding: "2.5px 3px 0 3px",
    textTransform: "none",
    textDecoration: "line-through",
  },
  discount: {
    fontWeight: "400",
    fontSize: "12.5px",
    color: "#ff5151",
    padding: "2.5px 3px 0 3px",
    textTransform: "none",
  },
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));
