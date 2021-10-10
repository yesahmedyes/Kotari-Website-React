import React from "react";

const SideMenu=({selected})=>{
  return(
    <>
    <div  style={{flex:"6"}}>
    <div style={{display:"flex",flexDirection:"column",marginLeft:"20px",marginTop:"20px"}}>
        <div style={{display:"flex"}}>
            <div style={{flex:"1"}}>
            <div style={{display:"flex",flexDirection:"column",marginLeft:"20px",marginTop:"0px"}}>
                <p style={{margin:"2px"}}><b>Mobiles</b></p>
                  <p style={{margin:"2px"}}>Electronics</p>
                      <p style={{margin:"2px"}}>Electronics</p>
                      <p style={{margin:"2px"}}>Electronics</p>
                        <p style={{margin:"2px"}}>Electronics</p>
                          <p style={{margin:"2px"}}>Electronics</p>
                            <p style={{margin:"2px"}}>Electronics</p>
            </div>
            </div>
            <div style={{flex:"3"}}>
            <div style={{display:"flex",flexDirection:"column",marginLeft:"20px",marginTop:"0px"}}>
                <p style={{margin:"2px"}}><b>Digital Cameras</b></p>
                  <p style={{margin:"2px"}}>Electronics</p>
                      <p style={{margin:"2px"}}>Electronics</p>
                      <p style={{margin:"2px"}}>Electronics</p>

            </div>
            </div>
            </div>
            <div>
            <div style={{display:"flex"}}>
                <div style={{flex:"3"}}>
                <div style={{display:"flex",flexDirection:"column",marginLeft:"20px",marginTop:"10px"}}>
                    <p style={{margin:"2px"}}><b>Laptops</b></p>
                      <p style={{margin:"2px"}}>Electronics</p>
                          <p style={{margin:"2px"}}>Electronics</p>
                          <p style={{margin:"2px"}}>Electronics</p>
                            <p style={{margin:"2px"}}>Electronics</p>
                              <p style={{margin:"2px"}}>Electronics</p>

                </div>
                </div>
                <div style={{flex:"3",display:"flex",alignItems:"center",justifyContent:"center"}}>

                    <img src="https://www.pngkey.com/png/full/262-2626769_laptops-dell-laptop-price-2018.png" style={{width:"100%",marginRight:"50%"}}/>


                </div>
          </div>
      </div>

    </div>
   </div>
</>
  )
}
export default SideMenu;
