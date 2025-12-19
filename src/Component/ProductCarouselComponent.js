import React from "react";
import { Carousel, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ExampleCarouselImage = ({ src, alt, gradient }) => (
  <div style={{ position: "relative" }}>
    <img
      src={src}
      alt={alt}
      className="d-block w-100"
      style={{ height: "500px", objectFit: "cover", filter: "brightness(0.7)" }}
      onError={(e) => {
        e.target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&q=80";
      }}
    />
    {gradient && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: gradient,
        }}
      />
    )}
  </div>
);

const ProductCarouselComponent = () => {
  const navigate = useNavigate();

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1920&q=80",
      title: "Premium Electronics",
      subtitle: "Up to 50% Off on Latest Gadgets",
      description: "Shop the newest smartphones, laptops, and tech accessories",
      buttonText: "Shop Electronics",
      category: "Electronics",
      gradient: "linear-gradient(135deg, rgba(13, 110, 253, 0.7) 0%, rgba(108, 117, 125, 0.5) 100%)"
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
      title: "Fashion & Style",
      subtitle: "New Season Collection",
      description: "Discover the latest trends in clothing and accessories",
      buttonText: "Explore Fashion",
      category: "Fashion",
      gradient: "linear-gradient(135deg, rgba(220, 53, 69, 0.7) 0%, rgba(253, 126, 20, 0.5) 100%)"
    },
    {
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&q=80",
      title: "Home & Kitchen",
      subtitle: "Transform Your Living Space",
      description: "Premium furniture, appliances, and decor for your home",
      buttonText: "Browse Home",
      category: "Home & Kitchen",
      gradient: "linear-gradient(135deg, rgba(25, 135, 84, 0.7) 0%, rgba(13, 202, 240, 0.5) 100%)"
    },
    {
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80",
      title: "Sports & Fitness",
      subtitle: "Stay Active, Stay Healthy",
      description: "Quality sports equipment and fitness gear for all levels",
      buttonText: "Shop Sports",
      category: "Sports",
      gradient: "linear-gradient(135deg, rgba(255, 193, 7, 0.7) 0%, rgba(255, 99, 71, 0.5) 100%)"
    },
    {
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1920&q=80",
      title: "Books & Learning",
      subtitle: "Expand Your Knowledge",
      description: "Best-selling books, novels, and educational materials",
      buttonText: "Discover Books",
      category: "Books",
      gradient: "linear-gradient(135deg, rgba(102, 16, 242, 0.7) 0%, rgba(13, 110, 253, 0.5) 100%)"
    },
    {
      image: "https://images.unsplash.com/photo-1587912781379-c797d3b1abca?w=1920&q=80",
      title: "Toys & Games",
      subtitle: "Fun for the Whole Family",
      description: "Educational toys, puzzles, and entertainment for kids",
      buttonText: "Shop Toys",
      category: "Toys",
      gradient: "linear-gradient(135deg, rgba(214, 51, 132, 0.7) 0%, rgba(252, 175, 69, 0.5) 100%)"
    }
  ];

  return (
    <Carousel fade interval={4000} pause="hover" className="shadow-lg">
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <ExampleCarouselImage 
            src={slide.image} 
            alt={slide.title}
            gradient={slide.gradient}
          />
          <Carousel.Caption className="text-start pb-5 ps-5">
            <div style={{ maxWidth: "600px" }}>
              <h5 className="text-warning fw-bold text-uppercase mb-2" style={{ letterSpacing: "2px" }}>
                {slide.subtitle}
              </h5>
              <h1 className="display-3 fw-bold mb-3" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}>
                {slide.title}
              </h1>
              <p className="fs-5 mb-4" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}>
                {slide.description}
              </p>
              <Button 
                variant="warning" 
                size="lg" 
                className="fw-bold px-5 py-3 shadow"
                onClick={() => navigate(`/product-list?category=${encodeURIComponent(slide.category)}`)}
              >
                {slide.buttonText} <i className="bi bi-arrow-right ms-2"></i>
              </Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarouselComponent;
