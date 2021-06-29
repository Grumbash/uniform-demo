import React from "react";
import Typography from "@material-ui/core/Typography";
import Image from "material-ui-image";

function CarouselItem({
  item: {
    title,
    slideImage: { url },
  },
}) {
  return (
    <div>
      <Typography variant="h4" component="h4">
        {title}
      </Typography>
      <Image src={url} />
    </div>
  );
}

export default CarouselItem;
