import React from "react";
import useStyles from './styles';
import { Container, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CustomCarousel from "./Carousel";
import Verified from "./Verified";
import santa from "../../assets/santa.jpg";

const Home = () => {

    const classes = useStyles();

    return (
        <>
            <div style={{paddingTop: "50px", width: "100%", backgroundColor: "#1a5b8f"}}>
                <img src={santa} style={{display: "block", maxHeight: "350px", margin: "auto"}}></img>
            </div>
            <div className={classes.search}>
                <div>
                    <SearchIcon className={classes.searchIcon} />
                </div>
                <InputBase
                placeholder="Search for products and shops"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                fullWidth="true"
                />
            </div>
            <Container style={{marginTop: "40px", marginBottom: "500px"}}>
                <CustomCarousel/>
                <Verified/>
            </Container>
        </>
    );
};

export default Home;