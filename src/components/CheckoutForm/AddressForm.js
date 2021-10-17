import React, {useState,useEffect}from 'react';
import {InputLabel,Select,MenuItem,Button,Grid,Typography} from "@material-ui/core";
import {useForm,FormProvider} from "react-hook-form";
import {Link} from "react-router-dom"
import FormInput from "./FormInput";
const AddressForm=({token,next})=>{
  const methods=useForm();
  const [shippingCountries,setShippingCountries]=useState([]);
  const [shippingCountry,setShippingCountry]=useState("");
  const [shippingSubdivisions,setShippingSubdivisions]=useState([]);
  const [shippingSubdivision,setShippingSubdivision]=useState('');
  const [shippingOptions,setShippingOptions]=useState([]);
  const [shippingOption,setShippingOption]=useState('');

  const countries=["PAKISTAN"];
  const subdivisions=["KPK","PUNJAB","BALOCHISTAN","SINDH","GILGIT BALTISTAN"];
  const options=["OPTION1","OPTION2"];
  useEffect(()=>{
    setShippingCountries(countries);
    setShippingSubdivisions(subdivisions);
    setShippingOptions(options);
    setShippingCountry(countries[0]);
  },[])


  // const fetchShippingCountries=async(checkoutTokenId)=>{
  //   const {countries}=await commerce.services.localeListShippingCountries(checkoutTokenId);
  //   console.log("countries",countries);
  //   setShippingCountries(countries);
  //   setShippingCountry(Object.keys(countries)[0]);
  // }
  // const fetchSubdivisions=async(countryCode)=>{
  //   const {subdivisions}=await commerce.services.localeListSubdivisions(countryCode);
  //
  //   setShippingSubdivisions(subdivisions);
  //   setShippingSubdivision(Object.keys(subdivisions)[0]);
  //
  // }
  // const fetchShippingOptions=async(checkoutTokenId,country,region=null)=>{
  //   const options=await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region});
  //   setShippingOptions(options);
  //   console.log("options",options);
  //   setShippingOption(options[0].id);
  // }
  // useEffect(()=>{
  //   console.log("I CAME HERE");
  //   fetchShippingCountries(token.id);
  // },[]);

  // useEffect(()=>{
  //   if(shippingCountry)fetchSubdivisions(shippingCountry);
  // },[shippingCountry]);
  // useEffect(()=>{
  //   if(shippingSubdivision) fetchShippingOptions(token.id,shippingCountry,shippingSubdivision);
  // },[shippingSubdivision])
  return(
    <>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=>next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First name"/>
            <FormInput required name="lastName" label="Last name"/>
            <FormInput required name="address1" label="Address"/>
            <FormInput required name="email" label="Email"/>
            <FormInput required name="city" label="City"/>
            <FormInput required name="zip" label="Zip / Postal Code"/>
            <Grid item xs={12} sm={6}>
              <InputLabel> Shipping Country </InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e)=>{
                setShippingCountry(e.target.value);
              }}>
              {countries.map((country)=>(
                <MenuItem  value={country}>
                  {country}
                </MenuItem>
              ))}

              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel> Shipping Subdivision </InputLabel>
              <Select value={shippingSubdivision} fullWidth onChange={(e)=>{
                setShippingSubdivision(e.target.value);
              }}>
              {subdivisions.map((subdivision)=>(
                <MenuItem  value={subdivision}>
                  {subdivision}
                </MenuItem>
              ))}

              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel> Shipping Options </InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e)=>{
                setShippingOption(e.target.value);
              }}>
              {options.map((option)=>(
                <MenuItem  value={option}>
                  {option}
                </MenuItem>
              ))}
              </Select>
            </Grid>



          </Grid>
          <br/>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <Button variant="outlined" component={Link} to="/cart">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm;
