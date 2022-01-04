import React from "react";
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const CustomCarousel = () => {

    var items = [
        {
            image: "https://firebasestorage.googleapis.com/v0/b/kotari-37bf9.appspot.com/o/featured_images%2F190421_pak_web_hp_hb_onsite_mychoice_en_%402x.jpg?alt=media&token=84c44332-7344-4601-a093-73d0eb8ce84e",
        },
        {
            image: "https://cdnprod.mafretailproxy.com/sys-master-root/hbd/h4d/14916572839966/06092021_pak_web_hp_hb_onsite_easypaisa_en@2x.jpg",
        },
        {
            image: "https://cdnprod.mafretailproxy.com/sys-master-root/h2c/hff/15695649898526/07102021_pak_web_hp_hb_onsite_c4now_en@2x.jpg",
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