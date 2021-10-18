import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    search: {
        position: "relative",
        top: "-27px",
        margin: "auto",
        borderRadius: "10px",
        backgroundColor: "#FFF",
        width: "500px",
        boxShadow: "0 1.5px 3px 0 rgba(0, 0, 0, 0.15)",
    },
    searchIcon: {
        color: "#999",
        margin: "0 20px",
        fontSize: "22px",
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
        padding: "20px 25px 20px 55px",
        width: "100%",
    },
}));	