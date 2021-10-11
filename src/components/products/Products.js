import React from 'react';
import Product from './product/Product'
const Products=({products,addToCart})=>{
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
