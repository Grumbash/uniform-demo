import React from "react";
import { useQuery, gql } from "@apollo/client";
import Carousel from "./Carousel";

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

  return (
    <Carousel
      data={data}
      mappedSides={mappedSides}
      pageLink={pageLink}
    ></Carousel>
  );
}

export default Slider;
