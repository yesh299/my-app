import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import ProductCarouselComponent from "../Component/ProductCarouselComponent";
import CategoryCardComponent from "../Component/CategoryCardComponent";
import { formatPriceINR } from "../utils/currency";
import "./Homepage.css";

const Homepage = () => {
  const heroHighlights = [
    { icon: "bi-lightning-charge-fill", title: "Fast Delivery", text: "2-day delivery on popular items" },
    { icon: "bi-shield-check", title: "Secure Payments", text: "Protected checkout & buyer safety" },
    { icon: "bi-arrow-repeat", title: "Easy Returns", text: "30-day hassle-free returns" },
    { icon: "bi-star-fill", title: "Top Rated", text: "4.8/5 average product rating" },
  ];

  const spotlightProducts = [
    {
      title: "MacBook Pro 16 M2",
      description: "Ultimate power for creators with stunning Retina display.",
      price: 150000,
      tag: "Bestseller",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      link: "/product-details/1",
    },
    {
      title: "Premium Wireless Headphones",
      description: "Immersive ANC, 30-hour battery, crystal-clear audio.",
      price: 199,
      tag: "Top Rated",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      link: "/product-details/8",
    },
    {
      title: "Stainless Steel Air Fryer",
      description: "Family-sized, rapid air tech for healthier crisping.",
      price: 129,
      tag: "New Arrival",
      image: "https://images.unsplash.com/photo-1612874472278-5c1b09f0e5f6?w=800&q=80",
      link: "/product-details/10",
    },
  ];

  const trustBadges = [
    {
      title: "Free Shipping",
      text: "On orders over "+formatPriceINR(100),
      icon: "bi-truck",
    },
    {
      title: "24/7 Support",
      text: "We’re here anytime",
      icon: "bi-headset",
    },
    {
      title: "Warranty",
      text: "1-year on most items",
      icon: "bi-shield-lock",
    },
    {
      title: "Secure Checkout",
      text: "PCI-DSS compliant",
      icon: "bi-credit-card",
    },
  ];

  const testimonials = [
    {
      quote: "Lightning fast delivery and superb quality. My go-to store!",
      name: "Ananya Patel",
      role: "Product Designer",
    },
    {
      quote: "Great prices, easy returns, and genuine products every time.",
      name: "Rahul Verma",
      role: "Software Engineer",
    },
    {
      quote: "Customer support was fantastic. They resolved my query in minutes.",
      name: "Sara Khan",
      role: "Entrepreneur",
    },
  ];

  return (
    <div className="homepage">
      <ProductCarouselComponent />

      {/* Hero highlights */}
      <Container className="highlight-bar">
        <Row>
          {heroHighlights.map((item, idx) => (
            <Col key={idx} md={3} sm={6} className="mb-3">
              <div className="highlight-card">
                <i className={`bi ${item.icon}`}></i>
                <h6>{item.title}</h6>
                <p>{item.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Category section */}
      <CategoryCardComponent />

      {/* Spotlight products */}
      <Container className="my-5">
        <div className="section-header">
          <div>
            <p className="section-tag">Editor’s Picks</p>
            <h2 className="section-title">Spotlight Products</h2>
            <p className="section-sub">Curated best-sellers loved by our customers</p>
          </div>
          <Button
            variant="warning"
            className="fw-bold shadow-sm"
            onClick={() => window.location.assign("/product-list")}
          >
            View All Products
          </Button>
        </div>
        <Row>
          {spotlightProducts.map((product, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <Card className="spotlight-card h-100 shadow-sm">
                <div className="spotlight-image-wrapper">
                  <Card.Img
                    src={product.image}
                    alt={product.title}
                    className="spotlight-image"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80";
                    }}
                  />
                  <Badge bg="warning" text="dark" className="spotlight-badge">{product.tag}</Badge>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">{product.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="spotlight-price">{formatPriceINR(product.price)}</span>
                    <Button
                      variant="outline-dark"
                      className="fw-semibold"
                      onClick={() => window.location.assign(product.link)}
                    >
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Trust badges */}
      <Container className="trust-section">
        <Row>
          {trustBadges.map((badge, idx) => (
            <Col key={idx} md={3} sm={6} className="mb-3">
              <div className="trust-card">
                <i className={`bi ${badge.icon}`}></i>
                <h6>{badge.title}</h6>
                <p>{badge.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Promo banner */}
      <Container className="promo-banner my-5">
        <Row className="align-items-center">
          <Col md={8}>
            <p className="section-tag">Limited Time</p>
            <h2 className="section-title mb-2">Holiday Mega Sale</h2>
            <p className="section-sub mb-3">Save up to 60% on electronics, fashion, and home essentials.</p>
            <Button
              variant="light"
              className="fw-bold text-dark"
              onClick={() => window.location.assign("/product-list")}
            >
              Shop Deals
            </Button>
          </Col>
          <Col md={4} className="text-md-end text-center mt-3 mt-md-0">
            <div className="promo-countdown">Ends Soon</div>
          </Col>
        </Row>
      </Container>

      {/* Testimonials */}
      <Container className="my-5">
        <div className="section-header">
          <div>
            <p className="section-tag">Loved by Customers</p>
            <h2 className="section-title">What Shoppers Say</h2>
          </div>
        </div>
        <Row>
          {testimonials.map((item, idx) => (
            <Col key={idx} md={4} className="mb-4">
              <Card className="testimonial-card h-100 shadow-sm">
                <Card.Body>
                  <i className="bi bi-quote text-warning fs-1"></i>
                  <p className="testimonial-text">{item.quote}</p>
                  <h6 className="mb-0">{item.name}</h6>
                  <small className="text-muted">{item.role}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Homepage;
