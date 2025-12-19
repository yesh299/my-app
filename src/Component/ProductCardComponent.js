import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "./Rating";
import { formatPriceINR } from "../utils/currency";
import "./ProductCardComponent.css";

const ProductCardComponent = ({ productId, name, description, price, images, rating, reviewsNumber, stock = 50 }) => {
  const mrp = Math.round(price * 1.2);
  const discountPct = Math.max(5, Math.min(80, Math.round(100 - (price / mrp) * 100)));
  
  // Determine stock badge
  const getStockBadge = () => {
    if (stock <= 0) {
      return { text: "Out of Stock", class: "out-of-stock" };
    } else if (stock <= 10) {
      return { text: `Only ${stock} Left!`, class: "low-stock" };
    } else {
      return { text: "In Stock", class: "" };
    }
  };
  
  const stockBadge = getStockBadge();
  const isSoldOut = stock <= 0;
  
  return (
    <Card className={`product-card mb-4 shadow-sm ${isSoldOut ? 'opacity-75' : ''}`}>
      <Row className="g-0">
        <Col md={4} className="position-relative">
          <div className="product-image-container">
            {stock > 20 && <div className="featured-badge">Popular</div>}
            <Card.Img
              variant="top"
              src={images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"}
              style={{ height: "100%", objectFit: "cover" }}
              className="product-image"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80";
              }}
            />
            <div className="image-overlay"></div>
            <div className={`stock-badge ${stockBadge.class}`}>
              {stockBadge.text}
            </div>
          </div>
        </Col>
        <Col md={8}>
          <Card.Body className="d-flex flex-column h-100" style={{ padding: "1rem 1.2rem" }}>
            <Card.Title className="product-title">{name}</Card.Title>
            <Card.Text className="product-description">
              {description && description.length > 80
                ? description.substring(0, 80) + "..."
                : description}
            </Card.Text>
            <div className="product-rating mb-3">
              <Rating rating={rating} />
              <span className="review-count">({reviewsNumber})</span>
            </div>
            <div className="mt-auto d-flex justify-content-between align-items-center gap-2 flex-wrap">
              <div className="d-flex align-items-center flex-wrap">
                <div className="product-price">{formatPriceINR(price)}</div>
                <div className="product-mrp">{formatPriceINR(mrp)}</div>
                <div className="product-offer">{discountPct}% off</div>
              </div>
              <LinkContainer to={`/product-details/${productId}`}>
                <Button 
                  variant="warning" 
                  className="btn-sm view-details-btn"
                  disabled={isSoldOut}
                >
                  <i className="bi bi-eye"></i> View
                </Button>
              </LinkContainer>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCardComponent;
