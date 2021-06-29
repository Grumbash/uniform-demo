import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";

function Slider({ items }) {
  return (
    <Carousel>
      {items.map((item) => (
        <CarouselItem key={item.sys.id} item={item} />
      ))}
    </Carousel>
  );
}

export default Slider;
