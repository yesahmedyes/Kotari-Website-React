import React from "react";
import useStyles from './styles';
import { Container, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CustomCarousel from "./Carousel";
import Verified from "./Verified";
import bgImage from "../../assets/bg.jpg";

const Home = () => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.mainDiv}>
                <div style={{backgroundImage: `url(${bgImage})`}} className={classes.main}>
                    <h4 className={classes.mainText}>We deliver verified products from verified sellers</h4>
                </div>
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