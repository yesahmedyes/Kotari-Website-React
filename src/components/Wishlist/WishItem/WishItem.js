import React, { useState, useEffect,useMemo } from "react";
import {Typography,Button,Card,CardActions,CardContent,CardMedia} from "@material-ui/core";
import { firebase, db } from "../../../firebase";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import {Link}from "react-router-dom";
import useStyles from './styles';

const WishItem=({product,length,setLength,userId,mapShow,mapQuantity,mapVariations,access,removeString,fetchWishlist,wishId,setTotalWish})=>{
  const classes=useStyles();
  const [quantity, setQuantity] = useState(()=>mapQuantity[access]);
  const [show, setShow] = useState(()=>mapShow[access]);
  const removeItem=()=>{
    db.collection("wishlist")
      .doc(wishId)
      .collection("products")
      .doc(removeString)
      .delete()
      .then((cart) => {

        setTotalWish(length=>length-1);
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        mapShow[access]=true;
        console.error("Error removing document: ", error);
      });
  }
  useEffect(()=>{

        return ()=>{
          fetchWishlist()
        }




  });
  if(show){
  return(

    <div className="details" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start"}}>
    <div style={{flex:"0.6"}}/>
    <div style={{marginTop:"2.8%",marginRight:"2%"}}>
    <IconButton>
    <DeleteOutlineIcon style={{ fontSize: 30 }} onClick={()=>{
      console.log("DELETED");
      mapShow[access]=false;
      mapQuantity[access]=0;
      removeItem();





    }}/>
    </IconButton>
    </div>
    <div style={{flex:"10"}}>
          <img src={product.images[0]} alt="" style={{width:"120px",borderRadius:"20px"}} />
          </div>
          <div style={{display:"flex",flexDirection:"column",flex:"14.5"}}>
            <p style={{maxWidth:"250px"}}>{product.name}</p>
          {  mapVariations[access].map((variation)=>{
            return(<p><b>{variation[0]}</b>: {variation[1]}</p>)
          })}



          </div>
<p style={{flex:"5"}} ><b>PKR {product.price}</b></p>
<div style={{flex:"10"}}>
<div className={classes.buttons} style={{position:"relative",right:"25px"}}>

</div>

</div>
<div style={{flex:"10"}}>
          <Button
            type="button"
            variant="contained"
            size="medium"
            className={classes.viewItem}
            component={Link} to={`/product/${product.productId}`}
          >
            View Item
          </Button>
          </div>




  </div>
  )
}else{
  mapShow[access]=false;

  return (null);
}
}

export default WishItem;
