import React from "react";
import {
  Personalize,
  useUniformTracker,
} from "@uniformdev/optimize-tracker-react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import Slider from "../components/Slider";
import Section from "../components/Section";

const PAGE = gql`
  fragment Image on MediaImage {
    name
    image {
      url
    }
    unfrmOptIntentTag
  }

  fragment Generic on GenericContent {
    title
    content
    unfrmOptIntentTag
  }

  query GetPage($id: String!) {
    page(id: $id) {
      name
      linkTo
      pageContent {
        sys {
          id
        }
      }
      pageSection {
        panesCollection {
          items {
            ...Generic
            ...Image
          }
        }
        unfrmOptIntentTag
      }
    }
  }
`;

const getPageByName =
  (pathname) =>
  ({ linkTo }) => {
    return linkTo === pathname;
  };

function Page({ pageCollection }) {
  const { tracker } = useUniformTracker();
  const { pathname } = useLocation();

  const { loading, error, data } = useQuery(PAGE, {
    variables: {
      id: pageCollection.find(getPageByName(pathname))?.sys.id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error HERE</p>;
  const {
    page: {
      name,
      linkTo,
      pageContent,
      pageSection: { panesCollection },
    },
  } = data;
  return (
    <div>
      <Typography variant="h1" component="h1">
        {name}
      </Typography>
      <Typography variant="h3" component="h3">
        {pageContent.title}
      </Typography>
      <Slider id={pageContent.sys.id} pageLink={linkTo} />
      <Section panesCollection={panesCollection.items}></Section>
    </div>
  );
}

export default Page;
