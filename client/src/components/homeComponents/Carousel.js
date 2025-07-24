import React, { useState } from "react"
import { Carousel } from "react-bootstrap"
import Image1 from "./../homeComponents/images/car1.jpeg"
import Image3 from "./../homeComponents/images/car2.jpeg"

const carstyle = {
  maxHeight: '400px',
  maxWidth: '100%',
  objectFit: 'cover',
  marginTop: '50px'
}

const CarouselImage = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100 img-fluid"
          src={Image1}
          style={carstyle}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image3}
          style={carstyle}
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselImage