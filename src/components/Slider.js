import React from "react";
import Carousel from "react-material-ui-carousel";
import { useQuery, gql } from "@apollo/client";
import {
  Personalize,
  useUniformTracker,
} from "@uniformdev/optimize-tracker-react";

import CarouselItem from "./CarouselItem";

const SLIDES = gql`
  query getSlides($id: String!) {
    carousel(id: $id) {
      title
      unfrmOptIntentTag
      slidesCollection {
        items {
          title
          slideImage {
            url
            fileName
          }
          sys {
            id
          }
        }
      }
    }

    carouselCollection {
      items {
        title
        unfrmOptIntentTag
        slidesCollection(limit: 3) {
          items {
            title
            slideImage {
              url
              fileName
            }
            sys {
              id
            }
          }
        }
      }
    }
  }
`;

const Test = ({ slidesCollection }) => {
  return (
    <Carousel>
      {slidesCollection.items.map((item) => (
        <CarouselItem key={item.sys.id} item={item} />
      ))}
    </Carousel>
  );
};

function Slider({ pageLink, id }) {
  // const query = pageLink === "/" ? SLIDES;
  const { loading, error, data } = useQuery(SLIDES, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error HERE</p>;
  const mappedSides = data.carouselCollection.items.map((slide) => {
    return {
      ...slide,
      // Assumes your CMS is capable of attaching Uniform Intent tags
      // to content items via `unfrmOptIntentTag` property.
      intentTag: slide.unfrmOptIntentTag,
    };
  });

  if (pageLink === "/")
    return (
      <Personalize variations={mappedSides} component={Test}></Personalize>
    );
  else {
    return (
      <Carousel>
        {data.carousel.slidesCollection.items.map((item) => (
          <CarouselItem key={item.sys.id} item={item} />
        ))}
      </Carousel>
    );
  }
}

export default Slider;
