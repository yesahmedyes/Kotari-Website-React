import React from "react";
import { Grid } from "@material-ui/core";
import Product from "../products/product/Product";
import ProductSection from "./ProductSection/ProductSection";
import { useLocation } from "react-router-dom";
const ProductPage = (props) => {
   const location = useLocation();
   console.log(location);
  return (
    <>

    <div style={{marginTop:"10%"}}>
    </div>
      {/* work to be done */}
      <ProductSection searchResults={location.state.searchResults} />
    </>
  );
};
export default ProductPage;
