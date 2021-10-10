import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import CategoryCard from "./CategoryCard";
const CategoryCarousel= () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
      <CategoryCard/>
        <CategoryCard/>
          <CategoryCard/>

      </ItemsCarousel>
    </div>
  );
};
export default CategoryCarousel;
