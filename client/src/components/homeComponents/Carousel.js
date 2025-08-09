import React, { useState } from "react"
import { Carousel } from "react-bootstrap"
import Image1 from "./../homeComponents/images/car1.jpeg"
import Image2 from "./../homeComponents/images/car2.jpeg"

const carstyle = {
  maxHeight: '400px',
  maxWidth: '100%',
  objectFit: 'cover',
  marginTop: '50px'
}

const images = [
  { src: Image1, alt: "Modern abstract sculpture in city park" },
  { src: Image2, alt: "Colorful street mural on urban building" }
]

const CarouselImage = () => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((img, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100 img-fluid"
            src={img.src}
            alt={img.alt}
            style={carstyle}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default CarouselImage
