import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, ListGroup, Button, Form, Alert, Badge } from "react-bootstrap";
import { Rating } from "../Component/Rating";
import { useState, useMemo } from "react";
import { formatPriceINR } from "../utils/currency";
import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  
  // Sample product data - in production, this would come from an API
  const products = {
    1: {
      name: "MacBook Pro 16",
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80"],
      description: "The most powerful MacBook Pro ever with M2 chip, stunning Retina display, and incredible battery life. Perfect for professionals and creatives who demand the best performance.",
      price: 2499,
      rating: 4.8,
      reviewsNumber: 342,
      stock: 25,
      category: "Electronics",
      brand: "Apple"
    },
    2: {
      name: "iPhone 15 Pro",
      images: ["https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&q=80"],
      description: "Latest iPhone with titanium design, A17 Pro chip, and pro camera system. The most advanced iPhone yet with incredible camera capabilities.",
      price: 999,
      rating: 4.9,
      reviewsNumber: 521,
      stock: 50,
      category: "Electronics",
      brand: "Apple"
    },
    3: {
      name: "The Great Gatsby",
      images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80"],
      description: "F. Scott Fitzgerald's classic American novel set in the Jazz Age. A timeless story of love, wealth, and the American Dream.",
      price: 12.99,
      rating: 4.6,
      reviewsNumber: 1205,
      stock: 200,
      category: "Books",
      brand: "Scribner"
    },
    4: {
      name: "Premium Cotton Casual Shirt",
      images: ["https://images.unsplash.com/photo-1598644902792-4db5ea6b5c44?w=800&q=80"],
      description: "Premium 100% cotton casual shirt perfect for any occasion. Comfortable, breathable, and stylish.",
      price: 39.99,
      rating: 4.3,
      reviewsNumber: 89,
      stock: 75,
      category: "Fashion",
      brand: "FashionCo"
    },
    5: {
      name: "Programmable Coffee Maker",
      images: ["https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=800&q=80"],
      description: "Programmable coffee maker with thermal carafe. Brew your perfect cup every time with customizable settings.",
      price: 79.99,
      rating: 4.4,
      reviewsNumber: 234,
      stock: 40,
      category: "Home & Kitchen",
      brand: "BrewMaster"
    },
    6: {
      name: "Premium Yoga Mat",
      images: ["https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"],
      description: "Non-slip yoga mat with extra cushioning for ultimate comfort. Perfect for all yoga styles and exercises.",
      price: 29.99,
      rating: 4.7,
      reviewsNumber: 156,
      stock: 100,
      category: "Sports",
      brand: "FitPro"
    },
    7: {
      name: "LEGO City Construction Set",
      images: ["https://images.unsplash.com/photo-1594787318286-3d835c1cab83?w=800&q=80"],
      description: "Build your own city with this amazing LEGO set featuring hundreds of colorful bricks. Endless creative possibilities.",
      price: 89.99,
      rating: 4.9,
      reviewsNumber: 412,
      stock: 60,
      category: "Toys",
      brand: "LEGO"
    },
    8: {
      name: "Premium Wireless Headphones",
      images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"],
      description: "Premium noise-cancelling headphones with crystal-clear sound. Active noise cancellation, 30-hour battery life.",
      price: 199.99,
      rating: 4.6,
      reviewsNumber: 678,
      stock: 45,
      category: "Electronics",
      brand: "SoundMax"
    },
    9: {
      name: "4K Action Camera",
      images: ["https://images.unsplash.com/photo-1508898578281-774ac4893c0c?w=800&q=80"],
      description: "Rugged 4K action camera with image stabilization and waterproof casing for outdoor adventures.",
      price: 249.99,
      rating: 4.5,
      reviewsNumber: 342,
      stock: 70,
      category: "Electronics",
      brand: "GoProMax"
    },
    10: {
      name: "Stainless Steel Air Fryer",
      images: ["https://images.unsplash.com/photo-1612874472278-5c1b09f0e5f6?w=800&q=80"],
      description: "Family-size air fryer with digital controls and rapid air circulation for crispy, healthy meals.",
      price: 129.99,
      rating: 4.4,
      reviewsNumber: 265,
      stock: 90,
      category: "Home & Kitchen",
      brand: "CrispyChef"
    },
    11: {
      name: "Running Shoes Pro",
      images: ["https://images.unsplash.com/photo-1528701800489-20be9c1f4ab4?w=800&q=80"],
      description: "Lightweight, breathable running shoes with responsive cushioning for daily training.",
      price: 89.99,
      rating: 4.2,
      reviewsNumber: 198,
      stock: 120,
      category: "Sports",
      brand: "StrideX"
    },
    12: {
      name: "Bluetooth Party Speaker",
      images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"],
      description: "Portable Bluetooth speaker with deep bass, LED lights, and 18-hour battery life.",
      price: 149.99,
      rating: 4.5,
      reviewsNumber: 254,
      stock: 65,
      category: "Electronics",
      brand: "SoundWave"
    }
  };

  const product = products[id] || products[1];
  const originalPrice = useMemo(() => Math.round(product.price * 1.2), [product.price]);

  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      comment: "Excellent product! Highly recommended.",
      date: "2024-01-15"
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Great quality, fast shipping.",
      date: "2024-01-10"
    },
    {
      name: "Mike Johnson",
      rating: 5,
      comment: "Exceeded my expectations!",
      date: "2024-01-05"
    }
  ];

  const handleAddToCart = () => {
    // In production, this would add to cart state/context
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0]
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container className="my-5">
      <Button variant="secondary" className="mb-4 back-btn" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left"></i> Back to Products
      </Button>

      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)} className="alert-success-custom">
          <i className="bi bi-check-circle"></i> Product added to cart successfully!
        </Alert>
      )}

      <Row className="product-details-container">
        <Col lg={6} className="mb-4">
          <div className="product-image-gallery">
            <Image
              src={product.images[0]}
              fluid
              className="product-detail-image"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";
              }}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="product-info">
            <Badge bg="warning" text="dark" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="product-detail-title">{product.name}</h1>
            <p className="product-brand text-muted">{product.brand}</p>
            
            <div className="rating-section mb-3">
              <Rating rating={product.rating} />
              <span className="ms-2">({product.reviewsNumber} customer reviews)</span>
            </div>

            <div className="price-section mb-4">
              <span className="product-detail-price">{formatPriceINR(product.price)}</span>
              <span className="ms-3 text-muted"><s>{formatPriceINR(originalPrice)}</s></span>
              <Badge bg="danger" className="ms-2">Save 17%</Badge>
            </div>

            <p className="product-detail-description">{product.description}</p>

            <ListGroup className="product-details-list mb-4">
              <ListGroup.Item>
                <strong>Stock Status:</strong>
                {product.stock > 0 ? (
                  <span className="ms-2 text-success fw-bold">
                    <i className="bi bi-check-circle"></i> In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="ms-2 text-danger">Out of Stock</span>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Category:</strong>
                <span className="ms-2">{product.category}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Brand:</strong>
                <span className="ms-2">{product.brand}</span>
              </ListGroup.Item>
            </ListGroup>

            {product.stock > 0 && (
              <div className="add-to-cart-section">
                <Row className="align-items-center mb-3">
                  <Col sm={4}>
                    <Form.Label className="fw-bold">Quantity:</Form.Label>
                  </Col>
                  <Col sm={8}>
                    <Form.Select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="quantity-select"
                    >
                      {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <Button
                  variant="warning"
                  className="w-100 add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </Button>
              </div>
            )}

            <div className="shipping-info mt-4 p-3 bg-light rounded">
              <p className="mb-2"><i className="bi bi-truck text-success"></i> Free shipping on orders over {formatPriceINR(100)}</p>
              <p className="mb-0"><i className="bi bi-shield-check text-success"></i> 30-day money back guarantee</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="mb-4">Customer Reviews</h3>
          <ListGroup variant="flush" className="reviews-list">
            {reviews.map((review, idx) => (
              <ListGroup.Item key={idx} className="review-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong className="review-author">{review.name}</strong>
                    <div className="mt-1">
                      <Rating rating={review.rating} />
                    </div>
                  </div>
                  <small className="text-muted">{review.date}</small>
                </div>
                <p className="mt-2 mb-0 review-comment">{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="review-form-section mt-5">
            <h4 className="mb-4">Write a Review</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Rating</Form.Label>
                <Form.Select>
                  <option value="">Select your rating...</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                  <option value="4">⭐⭐⭐⭐ 4 - Good</option>
                  <option value="3">⭐⭐⭐ 3 - Average</option>
                  <option value="2">⭐⭐ 2 - Poor</option>
                  <option value="1">⭐ 1 - Terrible</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Your Review</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Share your experience with this product..." />
              </Form.Group>
              <Button variant="primary" className="submit-review-btn">
                <i className="bi bi-send"></i> Submit Review
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
