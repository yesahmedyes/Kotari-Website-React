import React, { useState, useEffect,useMemo } from "react";
import {Container,Typography,Button,Grid } from "@material-ui/core";
import useStyles from './styles';
import WishItem from './WishItem/WishItem';
import {Link}from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
const Wishlist=({wishList,userId,fetchWishlist,wishId,setTotalWish})=>{
  console.log("LENGTH",wishList.length);
  const classes=useStyles();
  const [length, setLength] = useState(wishList.length);
  const mapShow=useMemo(()=>{
    return {};
  },[userId]);
  const mapQuantity=useMemo(()=>{
    return {};
  },[userId]);
  let mapVariations=useMemo(()=>{
    return {};
  },[userId]);
  const EmptyCart=()=>(<Typography variant="subtitle1">You have no items in your Wish List, <Link to="/" className={classes.link}>start adding!</Link></Typography>);
  const FilledCart=()=>(
    <>
<div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>

    <div className="cartCheckout"  >
      <div className="details" style={{display:"flex",height:"80px",marginBottom:"1.5%"}}>
        <p style={{flex:"9"}}></p>
        <h2 style={{flex:"20"}}> <FavoriteBorderOutlinedIcon fontSize="large" className={classes.wishicon} />Wishlist</h2>
        <p style={{flex:"30"}}></p>
        <p style={{flex:"20"}}></p>
        <p style={{flex:"20"}}></p>
        <p style={{flex:"20"}}></p>

    </div>
     <Divider variant="middle" />
    {wishList.map((product)=>{
      let access;
      let removeString=product.productId+"-";
      let temp2 = [];
      let tempString="";
      for (let key of Object.entries(product.variations)) {
        tempString="";
        tempString+=key[0];
        tempString+="[";
        tempString+=key[1];
        tempString+="]";
        temp2.push(tempString);
      }
      let tempCompare = temp2.sort();
      for(let x=0;x<tempCompare.length;x++){
        removeString+=tempCompare[x];
        if(x!==(tempCompare.length-1)){
          removeString+="-";
        }
      }

      console.log("removeString",removeString);
      access=removeString;
      console.log("access", access);
      if(mapVariations[access]===undefined){
          mapVariations[access]=Object.entries(product.variations);
      }
      if(mapShow[access]===undefined){
         mapShow[access]=true;
      }
      if(mapQuantity[access]===undefined){
         mapQuantity[access]=product.quantity;
      }
      console.log(mapShow);
      return(
          <>
          <WishItem setTotalWish={setTotalWish} wishId={wishId} fetchWishlist={fetchWishlist} removeString={removeString} mapVariations={mapVariations} access={access} mapQuantity={mapQuantity}  mapShow={mapShow} userId={userId} product={product}  length={length} setLength={setLength} />
          <Divider variant="middle" />
          </>
      )
    }

    )}

</div>
  </div>



    </>
  )
  return(
    <div>


      {wishList.length===0?<EmptyCart/>:<FilledCart/>}


    </div>
  )
}

export default Wishlist;
