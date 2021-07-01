import React from "react";
import Typography from "@material-ui/core/Typography";
import Image from "material-ui-image";
import { Personalize } from "@uniformdev/optimize-tracker-react";

const PersonalizedGeneric = (props) => {
  return (
    <>
      <Typography variant="h4" component="h4">
        {props.title}
      </Typography>
      <Typography variant="body2" component="p">
        {props.content}
      </Typography>
    </>
  );
};

const PersonalizedMedia = (props) => {
  return (
    <>
      <Typography variant="h4" component="h4">
        {props.name}
      </Typography>
      <Image src={props.image.url}></Image>
    </>
  );
};

const Section = ({ panesCollection }) => {
  const media = panesCollection.filter((m) => m.__typename === "MediaImage");
  const generic = panesCollection.filter(
    (m) => m.__typename === "GenericContent"
  );
  const mappedGeneric = generic.map((content) => {
    return {
      ...content,
      // Assumes your CMS is capable of attaching Uniform Intent tags
      // to content items via `unfrmOptIntentTag` property.
      intentTag: content.unfrmOptIntentTag,
    };
  });
  const mappedMedia = media.map((content) => {
    return {
      ...content,
      // Assumes your CMS is capable of attaching Uniform Intent tags
      // to content items via `unfrmOptIntentTag` property.
      intentTag: content.unfrmOptIntentTag,
    };
  });
  return (
    <>
      <Personalize
        variations={mappedGeneric}
        component={PersonalizedGeneric}
      ></Personalize>
      <Personalize
        variations={mappedMedia}
        component={PersonalizedMedia}
      ></Personalize>
    </>
  );
};

export default Section;
