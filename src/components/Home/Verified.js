import React from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import vSellers from "../../assets/v-sellers.png";
import vProducts from "../../assets/v-products.png";
import vDeliveries from "../../assets/v-deliveries.png";
import useStyles from './styles';


const Verified = () => {

    const classes = useStyles();
    
    return (
        <Box sx={{ flexGrow: 1}} style={{ marginTop: "60px" }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <div className={classes.promoCard}>
                        <p className={classes.promoText}>Verified sellers</p>
                        <div className={classes.promoImageDiv}>
                            <img className={classes.promoImage} src={vSellers} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={classes.promoCard}>
                        <p className={classes.promoText}>Verified products</p>
                        <div className={classes.promoImageDiv}>
                            <img className={classes.promoImage} src={vProducts} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div className={classes.promoCard}>
                        <p className={classes.promoText}>Verified deliveries</p>
                        <div className={classes.promoImageDiv}>
                            <img className={classes.promoImage} src={vDeliveries} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Verified;