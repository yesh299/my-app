import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HeaderComponent.css";

const Headrecomponent = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const categories = [
    { key: "All", icon: "bi-grid-3x3-gap" },
    { key: "Electronics", icon: "bi-phone" },
    { key: "Books", icon: "bi-book" },
    { key: "Fashion", icon: "bi-bag" },
    { key: "Home & Kitchen", icon: "bi-house-door" },
    { key: "Sports", icon: "bi-trophy" },
    { key: "Toys", icon: "bi-joystick" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("userInfo") || "null");
    setUserInfo(user);

    // Get cart items count
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);

    // Update cart count on storage change
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(updatedCart);
      const updatedUser = JSON.parse(localStorage.getItem("userInfo") || "null");
      setUserInfo(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom events
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
    navigate("/");
  };

  const handleSellerClick = () => {
    if (userInfo?.isAdmin) {
      navigate("/admin/products");
    } else if (userInfo) {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  const buildSearchUrl = (query, category) => {
    const trimmedQuery = query.trim();
    const hasQuery = trimmedQuery.length > 0;
    const encodedQuery = encodeURIComponent(trimmedQuery);
    const encodedCategory = encodeURIComponent(category);

    if (category === "All" && !hasQuery) {
      return "/product-list";
    }
    if (category === "All") {
      return `/product-list?search=${encodedQuery}`;
    }
    if (!hasQuery) {
      return `/product-list?category=${encodedCategory}`;
    }
    return `/product-list?search=${encodedQuery}&category=${encodedCategory}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(buildSearchUrl(searchQuery, searchCategory));
  };

  const handleCategorySelect = (category) => {
    if (!category) return;
    setSearchCategory(category);
    navigate(buildSearchUrl(searchQuery, category));
  };

  const handleNavCategorySelect = (category) => {
    if (!category) return;
    setSearchCategory(category);
    setSearchQuery("");
    navigate(buildSearchUrl("", category));
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <div className="offer-bar text-center">
        <div className="offer-content">
          <span className="me-3"><i className="bi bi-tag-fill me-1"></i>Up to 70% Off on Electronics</span>
          <span className="me-3 d-none d-sm-inline"><i className="bi bi-truck me-1"></i>Free delivery on first order</span>
          <span className="d-none d-md-inline"><i className="bi bi-arrow-repeat me-1"></i>Easy 30-day returns</span>
        </div>
      </div>
      <Navbar collapseOnSelect expand="lg" className="flip-header" sticky="top">
        <Container fluid className="px-3 px-lg-4">
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold d-flex align-items-center gap-2">
              <i className="bi bi-shop"></i>
              <div className="brand-text">
                <span className="brand-name">THAKUR ONLINE SHOP</span>
                <small className="brand-sub">Explore Plus</small>
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />
          <Navbar.Collapse id="responsive-navbar-nav" className="mt-3 mt-lg-0">
            <Form onSubmit={handleSearch} className="search-form order-3 order-lg-1">
              <InputGroup className="search-input-group">
                <DropdownButton
                  id="dropdown-basic-button"
                  title={searchCategory}
                  variant="light"
                  className="category-select"
                  onSelect={handleCategorySelect}
                >
                  {categories.map(({ key, icon }) => (
                    <Dropdown.Item eventKey={key} key={key}>
                      <i className={`bi ${icon} me-2`}></i>
                      {key}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <Form.Control
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="warning" type="submit" className="search-btn">
                  <i className="bi bi-search text-dark"></i>
                </Button>
              </InputGroup>
            </Form>

            <Nav className="nav-actions ms-lg-3 align-items-center gap-2 order-1 order-lg-2">
              <Button variant="outline-primary" className="seller-btn" onClick={handleSellerClick}>
                <i className="bi bi-briefcase me-1"></i>
                Become a Seller
              </Button>
              {userInfo?.isAdmin && (
                <LinkContainer to="/admin/orders">
                  <Nav.Link className="px-2 d-flex align-items-center">
                    <i className="bi bi-speedometer2 me-1"></i> Admin
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown
                  align="end"
                  title={
                    <span className="d-inline-flex align-items-center">
                      <i className="bi bi-person-circle me-1"></i> {userInfo.email?.split("@")[0] || "User"}
                    </span>
                  }
                  id="collapsible-nav-dropdown"
                  menuVariant="light"
                >
                  <NavDropdown.Item as={Link} to="/user/my-orders">
                    <i className="bi bi-box-seam"></i> My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user">
                    <i className="bi bi-person"></i> My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Button variant="outline-primary" className="login-btn">
                    Login
                  </Button>
                </LinkContainer>
              )}
              {!userInfo && (
                <LinkContainer to="/register">
                  <Nav.Link className="px-2">Sign Up</Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to="/cart">
                <Nav.Link className="px-2 d-flex align-items-center">
                  <Badge pill bg="warning" text="dark" className="me-1">
                    {cartItemsCount}
                  </Badge>
                  <i className="bi bi-cart3 me-1"></i>
                  Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="category-strip">
        <Container fluid className="px-3 px-lg-4">
          <Nav className="category-nav" variant="pills" onSelect={handleNavCategorySelect}>
            {categories.map(({ key, icon }) => (
              <Nav.Item key={key}>
                <Nav.Link
                  eventKey={key}
                  className={key === "All" ? "all-link" : ""}
                >
                  <i className={`bi ${icon} me-2`}></i>
                  {key}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Container>
      </div>
    </>
  );
};

export default Headrecomponent;
