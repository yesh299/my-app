import { Container, Row, Col, Form, Button, ListGroup, Card } from "react-bootstrap";
import { formatPriceINR } from "../../utils/currency";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserCartDetailsPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const getCartSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // Simulate order placement
    const orderData = {
      orderId: Math.floor(Math.random() * 1000000),
      items: cartItems,
      total: (
        parseFloat(getCartSubtotal()) +
        (parseFloat(getCartSubtotal()) > 100 ? 0 : 10) +
        parseFloat(getCartSubtotal()) * 0.1
      ).toFixed(2),
      date: new Date().toISOString(),
      status: "Processing",
      shippingAddress: {
        name: form.name.value,
        address: form.address.value,
        city: form.city.value,
        postalCode: form.postalCode.value,
        country: form.country.value
      },
      paymentMethod: form.paymentMethod.value
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to order details
    navigate(`/user/order-details/${orderData.orderId}`);
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Checkout</h1>
      <Row>
        <Col md={8}>
          <h3>Shipping Information</h3>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                placeholder="Enter your full name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                required
                type="text"
                placeholder="1234 Main St"
              />
              <Form.Control.Feedback type="invalid">
                Please provide an address
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" required type="text" />
                  <Form.Control.Feedback type="invalid">
                    Please provide a city
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="formPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control name="postalCode" required type="text" />
                  <Form.Control.Feedback type="invalid">
                    Please provide a postal code
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control name="country" required type="text" />
                  <Form.Control.Feedback type="invalid">
                    Please provide a country
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <h3 className="mt-4">Payment Method</h3>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Credit Card"
                name="paymentMethod"
                value="Credit Card"
                defaultChecked
              />
              <Form.Check
                type="radio"
                label="PayPal"
                name="paymentMethod"
                value="PayPal"
              />
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                value="Cash on Delivery"
              />
            </Form.Group>

            <Button variant="warning" type="submit" size="lg" className="w-100 mt-3">
              Place Order
            </Button>
          </Form>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h4>Order Summary</h4>
            </Card.Header>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <ListGroup.Item key={idx}>
                  <Row>
                    <Col>{item.name}</Col>
                    <Col className="text-end">
                      {item.quantity} x {formatPriceINR(item.price)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPage;
