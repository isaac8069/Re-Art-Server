import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Image1 from "../images/car1.jpeg";
import Image3 from "../images/car2.jpeg";
import styles from "./CarouselImage.module.css";

const CarouselImage = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className={styles.carousel}
    >
      {[Image1, Image3].map((image, idx) => (
        <Carousel.Item key={idx}>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={image}
            alt={`Slide ${idx + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselImage;
