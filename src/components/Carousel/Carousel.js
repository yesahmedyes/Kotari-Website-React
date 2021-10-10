import React, { useState, useEffect }  from "react";
import { firebase, db } from "../../firebase";
import Skeleton from '@material-ui/lab/Skeleton';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";

const CarouselPage = () => {
  const [images,setImages]=useState(null);
  const [loaded,setLoaded]=useState(false);
  let counter=0;
  useEffect(()=>{
    db.collection("featured-images").where("active","==",true).get().then((querySnapshot)=>{
      const data = querySnapshot.docs.map((doc) => doc.data());
      setImages(data);

    });
  })
  const setLoad=()=>{
    setLoaded(true);
  }
  const imageStyle = !loaded ? { display: "none !important" } : {};
  return (
    <MDBContainer fluid >

      <MDBCarousel
        activeItem={1}
        length={6}
        showControls={true}
        showIndicators={true}
        className="z-depth-1 "
        style={{maxWidth:"1200px",margin:"auto",marginTop:"8%",marginBottom:"6%"}}
      >
        <MDBCarouselInner>
        {images&&images.length!==0?(<>
          {images.map((image)=>{
            counter++;
            return(  <MDBCarouselItem itemId={counter}>
                <MDBView>
                {!loaded && <Skeleton variant="rect" width="1200px" height="280px" animation="wave"/>}
                  <img
                    style={imageStyle}
                    className={loaded?"d-block w-100 rounded":""}
                    src={image.image}
                    onLoad={setLoad}
                    alt="First slide"

                  />
                </MDBView>
              </MDBCarouselItem>)
          })}
          </>):(<div><Skeleton variant="rect" width="1200px" height="280px"/></div>)}

        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
}

export default CarouselPage;
