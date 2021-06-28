import React from "react";
import {
  Personalize,
  useUniformTracker,
} from "@uniformdev/optimize-tracker-react";
import { useQuery, gql } from "@apollo/client";
import CallToAction from "./CallToAction";

const PRODUCTS = gql`
  query GetProducts {
    productCollection {
      items {
        laptop
        unfrmOptIntentTag
        type
      }
    }
  }
`;

const Def = () => <h1>DEEEEEEEF</h1>;
const Photo = () => <h1>Photo</h1>;

const componentMapping = {
  cta: CallToAction,
  def: Def,
  photo: Photo,
};

function TestRender() {
  const { tracker } = useUniformTracker();
  const { loading, error, data, refetch } = useQuery(PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const mappedProducts = data.productCollection.items.map((product) => {
    return {
      ...product,
      // Assumes your CMS is capable of attaching Uniform Intent tags
      // to content items via `unfrmOptIntentTag` property.
      intentTag: product.unfrmOptIntentTag,
    };
  });

  const OnEnrichmentClickFireEvent = async () => {
    await tracker?.addEvent({
      label: "photo",
      category: "photo",
      value: "photo",
    });
    // refetch();
  };

  const onPress = () => {
    OnEnrichmentClickFireEvent();
  };

  return (
    <>
      <Personalize
        variations={mappedProducts}
        componentMapping={componentMapping}
      ></Personalize>
      <button onClick={onPress}>Press me</button>
    </>
  );
}

export default TestRender;
