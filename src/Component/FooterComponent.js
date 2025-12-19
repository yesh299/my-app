import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./FooterComponent.css";

const FooterComponent = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert("Thank you for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="text-white mt-5" style={{ 
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
    }}>
      {/* Newsletter Section */}
      <div style={{ background: "rgba(13, 110, 253, 0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <Container className="py-4">
          <Row className="align-items-center">
            <Col md={6} className="mb-3 mb-md-0">
              <h4 className="mb-1 fw-bold">
                <i className="bi bi-envelope-heart text-warning me-2"></i>
                Subscribe to Our Newsletter
              </h4>
              <p className="mb-0 text-muted small">Get the latest updates on new products and upcoming sales</p>
            </Col>
            <Col md={6}>
              <Form onSubmit={handleSubscribe}>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2"
                    style={{ borderRadius: "25px 0 0 25px" }}
                  />
                  <Button 
                    type="submit" 
                    variant="warning" 
                    className="px-4 fw-bold"
                    style={{ borderRadius: "0 25px 25px 0" }}
                  >
                    Subscribe <i className="bi bi-send ms-1"></i>
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container className="py-5">
        <Row className="g-4">
          <Col lg={3} md={6} className="mb-4">
            <h4 className="fw-bold mb-3" style={{ color: "#ffc107" }}>
              <i className="bi bi-shop"></i> Thakur Online Shop
            </h4>
            <p className="text-light" style={{ lineHeight: "1.8" }}>
              Your one-stop destination for quality products at great prices. We offer a wide range of electronics, fashion, home goods, and more.
            </p>
            <div className="mt-4">
              <h6 className="fw-bold mb-3">Follow Us</h6>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white me-3"
                style={{ transition: "transform 0.3s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <i className="bi bi-facebook" style={{ fontSize: "1.8rem" }}></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white me-3"
                style={{ transition: "transform 0.3s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <i className="bi bi-twitter" style={{ fontSize: "1.8rem" }}></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white me-3"
                style={{ transition: "transform 0.3s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <i className="bi bi-instagram" style={{ fontSize: "1.8rem" }}></i>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white"
                style={{ transition: "transform 0.3s" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <i className="bi bi-linkedin" style={{ fontSize: "1.8rem" }}></i>
              </a>
            </div>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="fw-bold mb-3 text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/product-list" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> All Products
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/cart" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> Shopping Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/login" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> Login / Register
                </Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="fw-bold mb-3 text-warning">Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a 
                  href="#contact" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#shipping" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> Shipping Policy
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#returns" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> Returns & Exchanges
                </a>
              </li>
              <li className="mb-2">
                <a 
                  href="#faq" 
                  className="text-light text-decoration-none d-inline-flex align-items-center"
                  style={{ transition: "all 0.3s" }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = "#ffc107";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = "#f8f9fa";
                    e.currentTarget.style.paddingLeft = "0px";
                  }}
                >
                  <i className="bi bi-chevron-right me-2"></i> FAQs
                </a>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4">
            <h5 className="fw-bold mb-3 text-warning">Contact Info</h5>
            <ul className="list-unstyled text-light">
              <li className="mb-3 d-flex align-items-start">
                <i className="bi bi-geo-alt-fill text-warning me-2 mt-1" style={{ fontSize: "1.2rem" }}></i>
                <span>Amity University<br/>Ranchi, Jharkhand</span>
              </li>
              <li className="mb-3">
                <a 
                  href="tel:+917644997168" 
                  className="text-light text-decoration-none d-flex align-items-center"
                  style={{ transition: "color 0.3s" }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#ffc107"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#f8f9fa"}
                >
                  <i className="bi bi-telephone-fill text-warning me-2" style={{ fontSize: "1.2rem" }}></i>
                  +91 7644997168
                </a>
              </li>
              <li className="mb-3">
                <a 
                  href="mailto:tyesh4804@gmail.com" 
                  className="text-light text-decoration-none d-flex align-items-center"
                  style={{ transition: "color 0.3s" }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#ffc107"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#f8f9fa"}
                >
                  <i className="bi bi-envelope-fill text-warning me-2" style={{ fontSize: "1.2rem" }}></i>
                  tyesh4804@gmail.com
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <i className="bi bi-clock-fill text-warning me-2" style={{ fontSize: "1.2rem" }}></i>
                <span>Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Payment Methods */}
        <Row className="mt-4 pt-4 border-top border-secondary">
          <Col md={6} className="mb-3 text-center text-md-start">
            <h6 className="text-warning mb-3">We Accept</h6>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
              <i className="bi bi-credit-card-fill text-white" style={{ fontSize: "2rem" }}></i>
              <i className="bi bi-paypal text-white" style={{ fontSize: "2rem" }}></i>
              <i className="bi bi-google text-white" style={{ fontSize: "2rem" }}></i>
              <i className="bi bi-wallet2 text-white" style={{ fontSize: "2rem" }}></i>
            </div>
          </Col>
          <Col md={6} className="mb-3 text-center text-md-end">
            <h6 className="text-warning mb-3">Secure Shopping</h6>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 align-items-center">
              <i className="bi bi-shield-fill-check text-success" style={{ fontSize: "2rem" }}></i>
              <i className="bi bi-lock-fill text-success" style={{ fontSize: "2rem" }}></i>
              <span className="badge bg-success px-3 py-2">SSL Encrypted</span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Bottom Bar */}
      <div style={{ background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Container className="py-3">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
              <p className="mb-0 text-light">
                Copyright &copy; {new Date().getFullYear()} <span className="fw-bold text-warning">Thakur Online Shop</span>. All Rights Reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <Link to="#" className="text-light text-decoration-none me-3 small" style={{ transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "#ffc107"} onMouseOut={(e) => e.currentTarget.style.color = "#f8f9fa"}>
                Privacy Policy
              </Link>
              <Link to="#" className="text-light text-decoration-none me-3 small" style={{ transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "#ffc107"} onMouseOut={(e) => e.currentTarget.style.color = "#f8f9fa"}>
                Terms of Service
              </Link>
              <Link to="#" className="text-light text-decoration-none small" style={{ transition: "color 0.3s" }} onMouseOver={(e) => e.currentTarget.style.color = "#ffc107"} onMouseOut={(e) => e.currentTarget.style.color = "#f8f9fa"}>
                Cookie Policy
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default FooterComponent;
