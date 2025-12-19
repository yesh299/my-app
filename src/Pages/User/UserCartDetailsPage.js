import { Container, Row, Col, Form, Button, ListGroup, Card, Alert, Spinner } from "react-bootstrap";
import { formatPriceINR } from "../../utils/currency";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./UserCartDetailsPage.css";

const UserCartDetailsPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [validated, setValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const getCartSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const getShippingCost = () => {
    return getCartSubtotal() > 100 ? 0 : 50;
  };

  const getTaxAmount = () => {
    return getCartSubtotal() * 0.18;
  };

  const getTotalAmount = () => {
    return getCartSubtotal() + getShippingCost() + getTaxAmount();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData) => {
    const res = await loadRazorpayScript();
    if (!res) {
      setError("Failed to load payment gateway. Please try again.");
      return;
    }

    try {
      const paymentOrderResponse = await api.post("/payment/create-order", {
        amount: getTotalAmount(),
        orderId: orderData.orderId,
        description: `Order ${orderData.orderId} from Thakur Online Shop`,
        customerEmail: orderData.shippingAddress.email || "customer@example.com",
        customerName: orderData.shippingAddress.name,
      });

      const { razorpayOrderId, keyId } = paymentOrderResponse.data.data;

      const options = {
        key: keyId,
        amount: Math.round(getTotalAmount() * 100),
        currency: "INR",
        name: "Thakur Online Shop",
        description: `Order ${orderData.orderId}`,
        order_id: razorpayOrderId,
        prefill: {
          name: orderData.shippingAddress.name,
          email: orderData.shippingAddress.email || "customer@example.com",
          contact: orderData.shippingAddress.phone || "9999999999",
        },
        notes: {
          orderId: orderData.orderId,
        },
        handler: async (response) => {
          try {
            const verifyResponse = await api.post("/payment/verify", {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: orderData.orderId,
            });

            if (verifyResponse.data.success) {
              setSuccess("Payment successful! Your order has been placed.");
              
              const orders = JSON.parse(localStorage.getItem("orders") || "[]");
              const finalOrder = {
                ...orderData,
                isPaid: true,
                paidAt: new Date().toISOString(),
                paymentResult: response,
              };
              orders.push(finalOrder);
              localStorage.setItem("orders", JSON.stringify(orders));

              localStorage.removeItem("cart");

              setTimeout(() => {
                navigate(`/user/order-details/${orderData.orderId}`);
              }, 2000);
            }
          } catch (err) {
            setError("Payment verification failed. Please contact support.");
            console.error("Payment verification error:", err);
          }
        },
        modal: {
          ondismiss: () => {
            setError("Payment cancelled. Please try again.");
          },
        },
        theme: {
          color: "#2874f0",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to initialize payment");
      console.error("Payment error:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        orderId: "ORD-" + Date.now() + Math.floor(Math.random() * 1000),
        items: cartItems,
        shippingAddress: {
          name: form.name.value,
          email: form.email.value,
          phone: form.phone.value,
          address: form.address.value,
          city: form.city.value,
          state: form.state.value,
          postalCode: form.postalCode.value,
          country: form.country.value,
        },
        paymentMethod: paymentMethod,
        itemsPrice: getCartSubtotal(),
        taxPrice: getTaxAmount(),
        shippingPrice: getShippingCost(),
        total: getTotalAmount(),
        date: new Date().toISOString(),
        status: "Processing",
      };

      if (paymentMethod === "Razorpay") {
        await handleRazorpayPayment(orderData);
      } else if (paymentMethod === "Cash on Delivery") {
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push({ ...orderData, isPaid: false });
        localStorage.setItem("orders", JSON.stringify(orders));

        setSuccess("Order placed successfully! You can proceed with Cash on Delivery.");
        
        localStorage.removeItem("cart");

        setTimeout(() => {
          navigate(`/user/order-details/${orderData.orderId}`);
        }, 2000);
      } else {
        await handleRazorpayPayment(orderData);
      }
    } catch (err) {
      setError(err.message || "Failed to process order");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="my-4">
        <Alert variant="info">
          Your cart is empty. <a href="/product-list">Continue Shopping</a>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Checkout</h1>

      {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess("")} dismissible>{success}</Alert>}

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Shipping Address</h4>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formName">
                      <Form.Label>Full Name *</Form.Label>
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
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        name="email"
                        required
                        type="email"
                        placeholder="example@email.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formPhone">
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        name="phone"
                        required
                        type="tel"
                        placeholder="9999999999"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a phone number
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formAddress">
                      <Form.Label>Address *</Form.Label>
                      <Form.Control
                        name="address"
                        required
                        type="text"
                        placeholder="House No., Street Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide an address
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formCity">
                      <Form.Label>City *</Form.Label>
                      <Form.Control name="city" required type="text" placeholder="Mumbai" />
                      <Form.Control.Feedback type="invalid">
                        Please provide a city
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formState">
                      <Form.Label>State *</Form.Label>
                      <Form.Control name="state" required type="text" placeholder="Maharashtra" />
                      <Form.Control.Feedback type="invalid">
                        Please provide a state
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="formPostalCode">
                      <Form.Label>Postal Code *</Form.Label>
                      <Form.Control name="postalCode" required type="text" placeholder="400001" />
                      <Form.Control.Feedback type="invalid">
                        Please provide a postal code
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formCountry">
                  <Form.Label>Country *</Form.Label>
                  <Form.Control name="country" required type="text" placeholder="India" />
                  <Form.Control.Feedback type="invalid">
                    Please provide a country
                  </Form.Control.Feedback>
                </Form.Group>

                <hr />

                <h4 className="mt-4 mb-3">Payment Method</h4>
                <div className="payment-options">
                  <Form.Check
                    type="radio"
                    label={<span><i className="bi bi-wallet2"></i> Razorpay (Credit/Debit Card, UPI, NetBanking)</span>}
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === "Razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-3"
                  />
                  <Form.Check
                    type="radio"
                    label={<span><i className="bi bi-cash-coin"></i> Cash on Delivery (COD)</span>}
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-3"
                  />
                </div>

                <Button 
                  variant="warning" 
                  type="submit" 
                  size="lg" 
                  className="w-100 mt-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    `Proceed to ${paymentMethod === "Razorpay" ? "Payment" : "Order Confirmation"}`
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: "20px" }}>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <ListGroup.Item key={idx}>
                  <Row className="align-items-center">
                    <Col xs={8}>{item.name}</Col>
                    <Col xs={4} className="text-end">
                      <small>{item.quantity}x {formatPriceINR(item.price)}</small>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <Row>
                  <Col>Items Total:</Col>
                  <Col className="text-end fw-bold">{formatPriceINR(getCartSubtotal())}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Fee:</Col>
                  <Col className="text-end">
                    {getShippingCost() === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      formatPriceINR(getShippingCost())
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax (18%):</Col>
                  <Col className="text-end">{formatPriceINR(getTaxAmount())}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-light">
                <Row className="fw-bold">
                  <Col>Total Amount:</Col>
                  <Col className="text-end text-primary" style={{ fontSize: "1.25rem" }}>
                    {formatPriceINR(getTotalAmount())}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="text-center text-muted small">
                  <i className="bi bi-shield-check"></i> Secure & Encrypted Payment
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCartDetailsPage;
