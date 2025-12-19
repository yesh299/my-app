import { Container, Row, Col, ListGroup, Image, Form, Button, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { formatPriceINR } from "../utils/currency";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cartpage.css";

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Number(newQuantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (userInfo.email) {
      navigate("/user/cart-details");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert variant="info">
              Your cart is empty. <LinkContainer to="/product-list"><Button variant="link">Continue Shopping</Button></LinkContainer>
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/100?text=Product";
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <LinkContainer to={`/product-details/${item.id}`}>
                        <Button variant="link" className="text-start p-0">
                          {item.name}
                        </Button>
                      </LinkContainer>
                    </Col>
                    <Col md={2}>
                      <strong>{formatPriceINR(item.price)}</strong>
                    </Col>
                    <Col md={2}>
                      <Form.Select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                      >
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <strong>{formatPriceINR(item.price * item.quantity)}</strong>
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h4>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
              </h4>
                <h3 className="text-danger">{formatPriceINR(getCartSubtotal())}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid">
                <Button
                  variant="warning"
                  size="lg"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/product-list">
                <Button variant="outline-secondary" className="w-100">
                  Continue Shopping
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup className="mt-3">
            <ListGroup.Item>
              <h5>Order Summary</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                  <Col className="text-end">{formatPriceINR(getCartSubtotal())}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col className="text-end">
                    {parseFloat(getCartSubtotal()) > 100 ? "FREE" : formatPriceINR(10)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col className="text-end">
                    {formatPriceINR(parseFloat(getCartSubtotal()) * 0.1)}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="fw-bold">
                <Col>Total:</Col>
                <Col className="text-end text-danger">
                    {formatPriceINR(
                      parseFloat(getCartSubtotal()) +
                      (parseFloat(getCartSubtotal()) > 100 ? 0 : 10) +
                      parseFloat(getCartSubtotal()) * 0.1
                    )}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Cartpage;
