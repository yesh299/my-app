import React from "react";
import { Carousel } from "react-bootstrap";

const ExampleCarouselImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="d-block w-100"
    style={{ height: "320px", objectFit: "cover" }}
  />
);

const ProductCarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage src="/Carousel/Carousel-1.png" alt="Slide 1" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src="/Carousel/Carousel-2.png" alt="Slide 2" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage src="/Carousel/Carousel-3.png" alt="Slide 3" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ProductCarouselComponent;
