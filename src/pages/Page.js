import React from "react";
import {
  Personalize,
  useUniformTracker,
} from "@uniformdev/optimize-tracker-react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Image from "material-ui-image";

import Slider from "../components/Slider";

const PAGE = gql`
  fragment Image on MediaImage {
    name
    image {
      url
    }
  }

  fragment Generic on GenericContent {
    title
    content
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
      pageSection: {
        panesCollection: {
          items: [genericContent, imageMedia],
        },
      },
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
      <Typography variant="h4" component="h4">
        {genericContent.title}
      </Typography>
      <Typography variant="body2" component="p">
        {genericContent.content}
      </Typography>
      <Typography variant="h4" component="h4">
        {imageMedia.name}
      </Typography>
      <Image src={imageMedia.image.url}></Image>
    </div>
  );
}

export default Page;
