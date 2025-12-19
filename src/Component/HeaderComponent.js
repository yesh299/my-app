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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-list?search=${searchQuery}&category=${searchCategory}`);
    }
  };

  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold">
            <i className="bi bi-shop text-primary"></i> THAKUR ONLINE SHOP
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={searchCategory}
                  variant="outline-secondary"
                >
                  <Dropdown.Item onClick={() => setSearchCategory("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("Electronics")}>
                    Electronics
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("Books")}>
                    Books
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("Fashion")}>
                    Fashion
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("Home & Kitchen")}>
                    Home & Kitchen
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("Sports")}>
                    Sports
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchCategory("Toys")}>
                    Toys
                  </Dropdown.Item>
                </DropdownButton>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="warning" type="submit">
                  <i className="bi bi-search text-dark"></i>
                </Button>
              </InputGroup>
            </Form>
          </Nav>
          <Nav>
            {userInfo?.isAdmin && (
              <LinkContainer to="/admin/orders">
                <Nav.Link>
                  <i className="bi bi-speedometer2"></i> Admin
                  <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo ? (
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-person-circle"></i> {userInfo.email?.split("@")[0] || "User"}
                  </>
                }
                id="collapsible-nav-dropdown"
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
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <i className="bi bi-person-plus"></i> Register
                  </Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                  {cartItemsCount}
                </Badge>
                <i className="bi bi-cart-dash ms-1"></i>
                <span className="ms-1">CART</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Headrecomponent;
