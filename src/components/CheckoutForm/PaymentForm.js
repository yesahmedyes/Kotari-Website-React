import React from 'react';
import {Typography,Button,Divider} from "@material-ui/core";
import {Elements,CardElement,ElementsConsumer} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise=loadStripe("pk_test_51IHZzcCH52d6vHv5kyqNHr3VLKu02kqBC2dzGiSe1pvo6FW2AKW0tnifua8ed5rfr5WxJ0rr7Px78xRwuswZjvQ300oEguEW6D");
const PaymentForm=({token,backStep,onCaptureCheckout,shippingData,nextStep,cart})=>{
  const handleSubmit=async(event,elements,stripe)=>{
    console.log(elements,stripe);
    event.preventDefault();

    if(!stripe||!elements) return;

    const cardElement=elements.getElement(CardElement);

    const {error,paymentMethod}=await stripe.createPaymentMethod({type:"card",card:cardElement});

    if(error){
      console.log(error);
    }else{
      const orderData={
        line_items:token.live.line_items,
        customer:{firstname:shippingData.firstName,lastName:shippingData.lastName,email:shippingData.email},
        shipping:{name:"Primary",street:shippingData.address1,town_city:shippingData.city,county_state:shippingData.shippingSubdivision,postal_zip_code:shippingData.zip,country:shippingData.shippingCountry},
        fulfillment:{shipping_method:shippingData.shippingOption},
        payment:{
          gateway:"stripe",
          stripe:{
            payment_method_id:paymentMethod.id
          }
        }
      }
      onCaptureCheckout(token.id,orderData);
      nextStep();
    }
  }
  return(
    <>
      <Review token={token} cart={cart}/>
      <Divider/>
    <Typography variant="h6" gutterBottom style={{margin:"20px 0"}}> Payment Method</Typography>
      <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({elements,stripe})=>(
          <form onSubmit={(e)=>handleSubmit(e,elements,stripe)}>
            <CardElement/>
            <br/><br/>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" disabled={!stripe} color="primary">
              Pay pkr 1895
              </Button>
            </div>
          </form>
        )
        }
      </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm;
