import React from "react";
import { Personalize } from "@uniformdev/optimize-tracker-react";
import PersonalizedCarousel from "./PersonalizedCarousel";
import CarouselLib from "react-material-ui-carousel";
import CarouselItem from "./CarouselItem";

const Carousel = ({ pageLink, mappedSides, data }) => {
  if (pageLink === "/")
    return (
      <Personalize
        variations={mappedSides}
        component={PersonalizedCarousel}
      ></Personalize>
    );
  else {
    return (
      <CarouselLib autoPlay={false}>
        {data.carousel.slidesCollection.items.map((item) => (
          <CarouselItem key={item.sys.id} item={item} />
        ))}
      </CarouselLib>
    );
  }
};

export default Carousel;
