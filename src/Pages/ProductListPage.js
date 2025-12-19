import { Container, Row, Col, ListGroup, Button, Form, Alert, Spinner, Card, Accordion, Badge } from "react-bootstrap";
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
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
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

  const appliedChips = [
    selectedCategory && { label: selectedCategory, type: "category" },
    priceFilter && { label: `₹${priceFilter.replace("-", " - ₹")}`, type: "price" },
    ratingFilter && { label: `${ratingFilter} ★ & Up`, type: "rating" },
  ].filter(Boolean);

  const applyCustomPrice = () => {
    const min = Number(priceMin) || 0;
    const max = Number(priceMax) || 0;
    const range = max && max > min ? `${min}-${max}` : `${min}-999999`;
    setPriceFilter(range);
  };

  return (
    <Container fluid className="product-list-page">
      <Row>
        {/* Sidebar Filters */}
        <Col lg={3} className="mb-4">
          <Card className="filter-card shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h5 className="filter-title mb-3 d-flex align-items-center justify-content-between">
                <span><i className="bi bi-funnel"></i> Filter Products</span>
                {appliedChips.length > 0 && (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="clear-all-btn"
                    onClick={() => {
                      setSelectedCategory("");
                      setPriceFilter("");
                      setRatingFilter("");
                      setSortOption("");
                      setPriceMin("");
                      setPriceMax("");
                    }}
                  >
                    Clear All
                  </Button>
                )}
              </h5>

              {appliedChips.length > 0 && (
                <div className="applied-chips mb-3">
                  {appliedChips.map((chip, idx) => (
                    <Badge bg="light" text="dark" key={idx} className="filter-chip">
                      {chip.label}
                      <Button
                        variant="link"
                        size="sm"
                        className="chip-close"
                        onClick={() => {
                          if (chip.type === "category") setSelectedCategory("");
                          if (chip.type === "price") setPriceFilter("");
                          if (chip.type === "rating") setRatingFilter("");
                        }}
                      >
                        <i className="bi bi-x-circle"></i>
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}

              <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen className="filter-accordion">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>📁 Category</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup className="filter-list">
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
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>💰 Price</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup className="filter-list mb-3">
                      <ListGroup.Item 
                        action 
                        className={`filter-item ${priceFilter === "" ? "active" : ""}`}
                        onClick={() => setPriceFilter("")}
                      >
                        All Prices
                      </ListGroup.Item>
                      {[
                        { label: "₹0 - ₹100", value: "0-100" },
                        { label: "₹100 - ₹500", value: "100-500" },
                        { label: "₹500 - ₹2000", value: "500-2000" },
                        { label: "₹2000+", value: "2000-999999" },
                      ].map((opt) => (
                        <ListGroup.Item
                          key={opt.value}
                          action
                          className={`filter-item ${priceFilter === opt.value ? "active" : ""}`}
                          onClick={() => setPriceFilter(opt.value)}
                        >
                          {opt.label}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <div className="price-custom">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Form.Control
                          type="number"
                          placeholder="Min"
                          value={priceMin}
                          onChange={(e) => setPriceMin(e.target.value)}
                        />
                        <span className="text-muted">to</span>
                        <Form.Control
                          type="number"
                          placeholder="Max"
                          value={priceMax}
                          onChange={(e) => setPriceMax(e.target.value)}
                        />
                      </div>
                      <Button size="sm" variant="outline-primary" className="filter-apply-btn" onClick={applyCustomPrice}>
                        Apply
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>⭐ Customer Ratings</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup className="filter-list">
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
                          <span className="rating-chip">
                            {rating} <i className="bi bi-star-fill"></i> & Up
                          </span>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
                {appliedChips.length > 0 && (
                  <div className="applied-chips applied-chips-inline">
                    {appliedChips.map((chip, idx) => (
                      <Badge bg="light" text="dark" key={idx} className="filter-chip">
                        {chip.label}
                        <Button
                          variant="link"
                          size="sm"
                          className="chip-close"
                          onClick={() => {
                            if (chip.type === "category") setSelectedCategory("");
                            if (chip.type === "price") setPriceFilter("");
                            if (chip.type === "rating") setRatingFilter("");
                          }}
                        >
                          <i className="bi bi-x-circle"></i>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
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
