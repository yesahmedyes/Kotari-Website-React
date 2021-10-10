import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import SimpleCard from "../BrandCard/BrandCard";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  carousel:{
    margin:"5%"
  }
});

const MultiCarouselPage= () => {
  const classes = useStyles();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        classes={classes.carousel}
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<i style={{position:"relative",left:"5px"}}class="fas fa-chevron-circle-left fa-3x"></i>}
        rightChevron={<i style={{position:"relative",right:"5px"}} class="fas fa-chevron-circle-right fa-3x"></i>}
        outsideChevron
        chevronWidth={chevronWidth}
        alwaysShowChevrons
      >
        <SimpleCard/>
        <SimpleCard/>
        <SimpleCard/>
        <SimpleCard/>
        <SimpleCard/>
        <SimpleCard/>
        <SimpleCard/>
      </ItemsCarousel>
    </div>
  );
};
export default MultiCarouselPage;
