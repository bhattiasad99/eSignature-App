import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BoxComponent from "../BoxComponent";

const ImageComponent = ({
  width,
  height,
  objectFit,
  alt,
  source,
  containerStyles,
  ...props
}) => (
  <BoxComponent
    {...props}
    sx={{
      width,
      height,
      "& *": {
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
      },
      ...containerStyles,
    }}
  >
    <LazyLoadImage
      {...props}
      style={{ objectFit }}
      alt={alt}
      height="100%"
      src={source}
      width="100%"
      effect="blur"
    />
  </BoxComponent>
);

ImageComponent.propTypes = {
  alt: PropTypes.string.isRequired,
  containerStyles: PropTypes.any,
  height: PropTypes.string,
  objectFit: PropTypes.oneOf([
    "cover",
    "contain",
    "fill",
    "none",
    "scale-down",
  ]),
  source: PropTypes.string.isRequired,
  width: PropTypes.string,
};

ImageComponent.defaultProps = {
  height: "100px",
  width: "100px",
  objectFit: "contain",
};

export default ImageComponent;
