import React, { CSSProperties } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { colors } from 'react-select/dist/declarations/src/theme';

interface DarkVariantExampleProps {
  images: ImageInfo[]; // Array of image URLs
}
interface ImageInfo {
  contentType: string;
  data: string;
}

const DarkVariantExample: React.FC<DarkVariantExampleProps> = ({ images }) => {
  const imageStyle: CSSProperties = {
    maxHeight: '60%',
    maxWidth: '60%',
    margin: 'auto',
    objectFit: 'contain',
  };
  console.log(images)

  return (
    <Carousel data-bs-theme="dark">
      {images.map((imageUrl, index) => (
        <Carousel.Item key={index} >
          <img
            className="d-block w-100"
            src={`data:${imageUrl.contentType};base64,${imageUrl.data}`}
            alt={`Slide ${index}`}
            style={imageStyle}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default DarkVariantExample;

