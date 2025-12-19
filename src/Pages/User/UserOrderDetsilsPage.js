import { Container, Row, Col, ListGroup, Button, Table, Badge, Alert, Card, ProgressBar } from "react-bootstrap";
import { formatPriceINR } from "../../utils/currency";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./UserOrderPage.css";

const UserOrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
    
    if (id) {
      const foundOrder = storedOrders.find(o => o.orderId.toString() === id);
      setOrder(foundOrder);
    }
  }, [id]);

  const getStatusVariant = (status) => {
    switch (status) {
      case "Processing":
        return "info";
      case "Shipped":
        return "primary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const getStatusStage = (status) => {
    const stages = { Processing: 0, Shipped: 1, Delivered: 2 };
    return stages[status] || 0;
  };

  const getTrackingTimeline = () => {
    const timeline = [
      { stage: 0, label: "Order Placed", icon: "bi-check-circle-fill", color: "success" },
      { stage: 1, label: "Shipped", icon: "bi-truck", color: "primary" },
      { stage: 2, label: "Delivered", icon: "bi-gift", color: "success" },
    ];
    return timeline;
  };

  // If no ID, show all orders
  if (!id) {
    return (
      <Container className="my-4">
        <h1 className="mb-4">My Orders</h1>
        {orders.length === 0 ? (
          <Alert variant="info">
            You haven't placed any orders yet.
            <Button variant="link" onClick={() => navigate("/product-list")}>
              Start Shopping
            </Button>
          </Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{formatPriceINR(order.total)}</td>
                  <td>
                    <Badge bg={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/user/order-details/${order.orderId}`)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    );
  }

  // Show specific order details
  if (!order) {
    return (
      <Container className="my-4">
        <Alert variant="warning">
          Order not found.
          <Button variant="link" onClick={() => navigate("/user/my-orders")}>
            View all orders
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Button variant="secondary" className="mb-3" onClick={() => navigate("/user/my-orders")}>
        <i className="bi bi-arrow-left"></i> Back to Orders
      </Button>

      <h1 className="mb-4">Order Details</h1>
      
      <Row>
        <Col lg={8}>
          {/* Order Status Card */}
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Order Status & Tracking</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <p className="mb-0"><strong>Order ID:</strong> {order?.orderId}</p>
                  <p className="mb-0"><strong>Order Date:</strong> {new Date(order?.date).toLocaleDateString()}</p>
                </div>
                <div className="text-end">
                  <Badge bg={getStatusVariant(order?.status)} style={{ fontSize: "0.95rem", padding: "8px 12px" }}>
                    {order?.status}
                  </Badge>
                </div>
              </div>

              <hr />

              {/* Timeline Progress */}
              <div className="order-timeline">
                {getTrackingTimeline().map((item, idx) => {
                  const isActive = getStatusStage(order?.status) >= item.stage;
                  return (
                    <div key={idx} className="timeline-item">
                      <div className={`timeline-marker ${isActive ? 'active' : ''}`}>
                        <i className={`bi ${item.icon}`}></i>
                      </div>
                      <div className="timeline-content">
                        <p className={`mb-0 ${isActive ? 'fw-bold' : 'text-muted'}`}>{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <ProgressBar 
                now={(getStatusStage(order?.status) / 2) * 100} 
                className="mt-3"
                style={{ height: "8px" }}
              />
            </Card.Body>
          </Card>

          {/* Shipping Address */}
          <Card className="mb-4">
            <Card.Header className="bg-light">
              <h6 className="mb-0"><i className="bi bi-geo-alt"></i> Shipping Address</h6>
            </Card.Header>
            <Card.Body>
              <p className="mb-1"><strong>{order?.shippingAddress?.name}</strong></p>
              <p className="mb-1">{order?.shippingAddress?.phone}</p>
              <p className="mb-1">{order?.shippingAddress?.email}</p>
              <p className="mb-1">{order?.shippingAddress?.address}</p>
              <p className="mb-1">
                {order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.postalCode}
              </p>
              <p className="mb-0">{order?.shippingAddress?.country}</p>
            </Card.Body>
          </Card>

          {/* Payment Information */}
          <Card className="mb-4">
            <Card.Header className="bg-light">
              <h6 className="mb-0"><i className="bi bi-credit-card"></i> Payment Information</h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Payment Method:</strong></p>
                  <p className="text-muted">{order?.paymentMethod}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Payment Status:</strong></p>
                  <p>
                    <Badge bg={order?.isPaid ? "success" : "warning"}>
                      {order?.isPaid ? "Paid" : "Pending"}
                    </Badge>
                  </p>
                </Col>
              </Row>
              {order?.isPaid && (
                <p className="text-success small">
                  <i className="bi bi-check-circle"></i> Paid on {new Date(order?.paidAt).toLocaleString()}
                </p>
              )}
            </Card.Body>
          </Card>

          {/* Order Items */}
          <Card className="mb-4">
            <Card.Header className="bg-light">
              <h6 className="mb-0"><i className="bi bi-box"></i> Items</h6>
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive size="sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatPriceINR(item.price)}</td>
                      <td className="fw-bold">{formatPriceINR(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Order Summary */}
          <Card className="mb-4 sticky-top" style={{ top: "20px" }}>
            <Card.Header className="bg-primary text-white">
              <h6 className="mb-0">Order Summary</h6>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Items Price:</Col>
                  <Col className="text-end">{formatPriceINR(order?.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Fee:</Col>
                  <Col className="text-end">
                    {order?.shippingPrice === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      formatPriceINR(order?.shippingPrice)
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax (18%):</Col>
                  <Col className="text-end">{formatPriceINR(order?.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-light">
                <Row className="fw-bold">
                  <Col>Total Amount:</Col>
                  <Col className="text-end text-primary">{formatPriceINR(order?.total)}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>

          {/* Actions */}
          <Card>
            <Card.Header className="bg-light">
              <h6 className="mb-0">Actions</h6>
            </Card.Header>
            <Card.Body className="d-grid gap-2">
              {order?.status !== "Cancelled" && order?.status !== "Delivered" && (
                <Button 
                  variant="info" 
                  onClick={() => {
                    const nextStatusMap = { Processing: "Shipped", Shipped: "Delivered" };
                    const newStatus = nextStatusMap[order?.status];
                    if (newStatus) {
                      const updated = { ...order, status: newStatus };
                      const updatedOrders = orders.map(o => o.orderId === order?.orderId ? updated : o);
                      setOrder(updated);
                      localStorage.setItem("orders", JSON.stringify(updatedOrders));
                      alert(`Order updated to ${newStatus}`);
                    }
                  }}
                >
                  <i className="bi bi-pin-map"></i> Track Order
                </Button>
              )}
              
              {order?.status !== "Cancelled" && order?.status !== "Delivered" && (
                <Button 
                  variant="outline-danger" 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to cancel this order?")) {
                      const updated = { ...order, status: "Cancelled" };
                      const updatedOrders = orders.map(o => o.orderId === order?.orderId ? updated : o);
                      setOrder(updated);
                      localStorage.setItem("orders", JSON.stringify(updatedOrders));
                      alert("Order has been cancelled");
                    }
                  }}
                >
                  <i className="bi bi-x-circle"></i> Cancel Order
                </Button>
              )}

              <Button variant="outline-primary">
                <i className="bi bi-download"></i> Download Invoice
              </Button>

              <Button variant="outline-secondary">
                <i className="bi bi-chat-dots"></i> Contact Support
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPage;
