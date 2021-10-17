import React from "react";
import useStyles from './styles';
import { Container } from "@material-ui/core";
import santa from "../../assets/santa.jpg";

const Home = () => {

    const classes = useStyles();

    return (
        <>
            <div style={{paddingTop: "50px", width: "100%", backgroundColor: "#1a5b8f"}}>
                <img src={santa} style={{display: "block", maxHeight: "350px", margin: "auto"}}></img>
            </div>
            <Container style={{paddingTop: "30px"}}>
                <p>Hello World</p>
            </Container>
        </>
    );
};

export default Home;