import React from "react";
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const CustomCarousel = () => {

    var items = [
        {
            image: "https://firebasestorage.googleapis.com/v0/b/kotari-37bf9.appspot.com/o/featured_images%2F200421_pak_web_hp_hb_onsitemonetization_unilever_ramadan_en_.png?alt=media&token=e6be0d00-5263-489d-acc0-3753b07d55b4",
        },
    ];

    return (
        <>
            <Carousel animation="slide" IndicatorIcon={<div/>}  PrevIcon={<ArrowBackIosRoundedIcon/>} NextIcon={<ArrowForwardIosRoundedIcon/>}
            
            indicatorIconButtonProps={{
                style: {
                    width: "33px",
                    height: "4px",
                    margin: "8px",
                    transform: "scale(1.15)",
                    borderRadius: "10px",
                    backgroundColor: "#e3e3e3",
                }
            }}
            
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: "#ff7373",
                }
            }}
            
            indicatorContainerProps={{
                style: {
                    marginTop: "12px",
                },
            }}
            
            navButtonsProps={{
                style: {
                    backgroundColor: 'transparent',
                    transform: "scale(1.8)",
                    outline: "none",
                }
            }} 
            
            navButtonsWrapperProps={{
                style: {
                    top: "-15px",
                    paddingLeft: "12px",
                    paddingRight: "12px",
                }
            }}
            
            >
                {
                    items.map((item, i) => (
                        <img src={item.image} style={{width: "100%", borderRadius: "10px"}}></img>
                    ))
                }
            </Carousel>
        </>
    );
};

export default CustomCarousel;