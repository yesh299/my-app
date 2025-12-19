import { Container, Row, Col, ListGroup, Button, Form, Alert, Spinner, Card } from "react-bootstrap";
import ProductCardComponent from "../Component/ProductCardComponent";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/api";
import "./ProductListPage.css";

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      if (data.success) {
        setProducts(data.data);
        setFilteredProducts(data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by price
    if (priceFilter) {
      const [min, max] = priceFilter.split("-").map(Number);
      filtered = filtered.filter(p => p.price >= min && (!max || p.price <= max));
    }

    // Filter by rating
    if (ratingFilter) {
      filtered = filtered.filter(p => p.rating >= Number(ratingFilter));
    }

    // Sort
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceFilter, ratingFilter, sortOption]);

  const categories = ["Electronics", "Books", "Fashion", "Home & Kitchen", "Sports", "Toys"];

  return (
    <Container fluid className="product-list-page">
      <Row>
        {/* Sidebar Filters */}
        <Col lg={3} className="mb-4">
          <Card className="filter-card shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h5 className="filter-title mb-4">
                <i className="bi bi-funnel"></i> Filter Products
              </h5>
              
              <ListGroup className="filter-list mb-4">
                <ListGroup.Item className="filter-header">
                  <strong>📁 Category</strong>
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className={`filter-item ${selectedCategory === "" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("")}
                >
                  All Categories
                </ListGroup.Item>
                {categories.map((cat, idx) => (
                  <ListGroup.Item
                    key={idx}
                    action
                    className={`filter-item ${selectedCategory === cat ? "active" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <ListGroup className="filter-list mb-4">
                <ListGroup.Item className="filter-header">
                  <strong>💰 Price Range</strong>
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className={`filter-item ${priceFilter === "" ? "active" : ""}`}
                  onClick={() => setPriceFilter("")}
                >
                  All Prices
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className={`filter-item ${priceFilter === "0-50" ? "active" : ""}`}
                  onClick={() => setPriceFilter("0-50")}
                >
                  ₹0 - ₹50
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className={`filter-item ${priceFilter === "50-100" ? "active" : ""}`}
                  onClick={() => setPriceFilter("50-100")}
                >
                  ₹50 - ₹100
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className={`filter-item ${priceFilter === "100-500" ? "active" : ""}`}
                  onClick={() => setPriceFilter("100-500")}
                >
                  ₹100 - ₹500
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className={`filter-item ${priceFilter === "500-99999" ? "active" : ""}`}
                  onClick={() => setPriceFilter("500-99999")}
                >
                  ₹500+
                </ListGroup.Item>
              </ListGroup>

              <ListGroup className="filter-list mb-4">
                <ListGroup.Item className="filter-header">
                  <strong>⭐ Rating</strong>
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className={`filter-item ${ratingFilter === "" ? "active" : ""}`}
                  onClick={() => setRatingFilter("")}
                >
                  All Ratings
                </ListGroup.Item>
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <ListGroup.Item
                    key={rating}
                    action
                    className={`filter-item ${ratingFilter === rating.toString() ? "active" : ""}`}
                    onClick={() => setRatingFilter(rating.toString())}
                  >
                    {rating} ★ & Up
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Button 
                variant="outline-danger" 
                className="w-100 clear-filters-btn"
                onClick={() => {
                  setSelectedCategory("");
                  setPriceFilter("");
                  setRatingFilter("");
                  setSortOption("");
                }}
              >
                <i className="bi bi-arrow-counterclockwise"></i> Clear Filters
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          {/* Header Section */}
          <div className="products-header mb-5">
            <Row className="align-items-center">
              <Col md={7}>
                <h2 className="page-title">
                  {selectedCategory ? (
                    <>
                      <span className="category-badge">{selectedCategory}</span>
                    </>
                  ) : (
                    "All Products"
                  )}
                </h2>
                <p className="product-count text-muted">
                  <i className="bi bi-box2"></i> {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="sort-label">
                    <strong>Sort By:</strong>
                  </Form.Label>
                  <Form.Select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-select"
                  >
                    <option value="">✓ Default</option>
                    <option value="price-asc">💵 Price: Low to High</option>
                    <option value="price-desc">💵 Price: High to Low</option>
                    <option value="rating">⭐ Highest Rated</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Products Section */}
          <Row>
            <Col>
              {loading ? (
                <div className="loading-container text-center py-5">
                  <Spinner animation="border" role="status" variant="warning">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="mt-3 text-muted">Loading products...</p>
                </div>
              ) : error ? (
                <Alert variant="danger" className="error-alert">
                  <i className="bi bi-exclamation-circle"></i> {error}
                </Alert>
              ) : filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <ProductCardComponent key={product._id} productId={product._id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="no-products text-center py-5">
                  <i className="bi bi-inbox"></i>
                  <h4>No products found</h4>
                  <p className="text-muted">Try adjusting your filters or search criteria</p>
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListPage;
