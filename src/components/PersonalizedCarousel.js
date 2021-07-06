import React from "react";
import Carousel from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";

const PersonalizedCarousel = ({ slidesCollection }) => {
  return (
    <Carousel autoPlay={false}>
      {slidesCollection.items.map((item) => (
        <CarouselItem key={item.sys.id} item={item} />
      ))}
    </Carousel>
  );
};

export default PersonalizedCarousel;
