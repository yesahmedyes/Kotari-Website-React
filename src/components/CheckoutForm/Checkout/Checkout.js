import React, {useState,useEffect} from 'react';
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button,CssBaseline} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import {commerce} from "../../../lib/Commerce";
import {Link,useHistory} from"react-router-dom";
const steps=["Shipping address","Payment Details"];

const Checkout=({cart,order,onCaptureCheckout,error})=>{
  const classes=useStyles();
  const [activeStep,setActiveStep]=useState(0);
  const [checkoutToken,setCheckoutToken]=useState(null);
  const [shippingData,setShippingData]=useState({});
  const history=useHistory();
  console.log(activeStep);
  useEffect(()=>{
    // const generateToken=async()=>{
    //   try{
    //     const token=await commerce.checkout.generateToken(cart.id,{type:"cart"});
    //     console.log(token);
    //     setCheckoutToken(token);
    //   }catch(err){
    //     if (activeStep !== steps.length) history.push('/');
    //   }
    // }
    // generateToken();
  },[cart]);
  const next=(data)=>{
    setShippingData(data);
    nextStep();
  }
  const nextStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep+1);
  const backStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep-1);
  const Form=()=> activeStep===0
    ? <AddressForm next={next} token={checkoutToken}/>
    :<PaymentForm token={checkoutToken} cart={cart} shippingData={shippingData} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>
    let Confirmation = () => (order.customer ? (
       <>
         <div>
           <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
           <Divider className={classes.divider} />
           <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
         </div>
         <br />
         <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
       </>
     ) : (
       <div className={classes.spinner}>
         <CircularProgress />
       </div>
     ));
     if (error) {
       Confirmation = () => (
         <>
           <Typography variant="h5">Error: {error}</Typography>
           <br />
           <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
         </>
       );
     }
  return(
    <>
    <CssBaseline/>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step)=>(
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep===steps.length?<Confirmation/>:<Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout;
