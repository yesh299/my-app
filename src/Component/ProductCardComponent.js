import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "./Rating";
import { formatPriceINR } from "../utils/currency";
import "./ProductCardComponent.css";

const ProductCardComponent = ({ productId, name, description, price, images, rating, reviewsNumber }) => {
  return (
    <Card className="product-card mb-4 shadow-sm">
      <Row className="g-0">
        <Col md={4} className="position-relative">
          <div className="product-image-container">
            <Card.Img
              variant="top"
              src={images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"}
              style={{ height: "250px", objectFit: "cover" }}
              className="product-image"
            />
            <div className="image-overlay"></div>
          </div>
        </Col>
        <Col md={8}>
          <Card.Body className="d-flex flex-column h-100">
            <Card.Title className="product-title">{name}</Card.Title>
            <Card.Text className="product-description">
              {description && description.length > 80
                ? description.substring(0, 80) + "..."
                : description}
            </Card.Text>
            <div className="product-rating mb-2">
              <Rating rating={rating} />
              <span className="review-count">({reviewsNumber} reviews)</span>
            </div>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <div className="product-price">{formatPriceINR(price)}</div>
              <LinkContainer to={`/product-details/${productId}`}>
                <Button variant="warning" className="btn-sm view-details-btn">
                  <i className="bi bi-eye"></i> View Details
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
