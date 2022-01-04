import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainDiv: {
        width: "100%",
        backgroundColor: "#FE507E",
    },
    main: {
        height: "400px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
    },
    mainText: {
        color: "#fff",
        fontWeight: "500",
        letterSpacing: "0.4px",
        fontSize: "1.4rem",
        margin: "auto",
        textAlign: "center", 
        position: "relative",
        top: "47%",
    },
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
    promoCard: {
        width: "100%",
        background: "linear-gradient(to right, #86DEF6, #BEECFB)",
        borderRadius: "10px", 
    },
    promoText: {
        textAlign: "center",
        padding: "23px",
        fontWeight: "500",
        fontSize: "18px",
    },
    promoImageDiv: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    promoImage: {
        width: "75%",
        margin: "auto",
    },
}));	