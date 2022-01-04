import React from "react";
import Product from "./Product/Product";
import { Container, Grid } from "@material-ui/core";

const ProductPage = (props) => {

  const { products } = props;

  return (
    <Container style={{padding: "70px 0"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3}>Filters</Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={4}>
            {Object.entries(products).map(([productId, productData]) => {
              return(
                <Grid item xs={12} sm={4} md={4}>
                  <Product product={productData} id={productId} />  
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )

};

export default ProductPage;
