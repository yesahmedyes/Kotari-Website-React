import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './product/Product'
import useStyles from "./styles";
const Products=({products,addToCart})=>{
  const classes=useStyles();
  return(
    <div class="container mydiv">
    <div class="row">
      {Object.entries(products).map((product)=>{
        return(
          <Product product={product[1]} id={product[0]} addToCart={addToCart} />  
        )

      })}
    </div>
    </div>
  )

}
export default Products;
