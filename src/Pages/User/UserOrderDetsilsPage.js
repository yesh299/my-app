import { Container, Row, Col, ListGroup, Button, Table, Badge, Alert } from "react-bootstrap";
import { formatPriceINR } from "../../utils/currency";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Order Information</h5>
              <p className="mb-1"><strong>Order ID:</strong> {order.orderId}</p>
              <p className="mb-1"><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                <Badge bg={getStatusVariant(order.status)}>{order.status}</Badge>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Shipping Address</h5>
              <p className="mb-1">{order.shippingAddress?.name}</p>
              <p className="mb-1">{order.shippingAddress?.address}</p>
              <p className="mb-1">
                {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
              </p>
              <p className="mb-1">{order.shippingAddress?.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Payment Method</h5>
              <p>{order.paymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Order Items</h5>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatPriceINR(item.price)}</td>
                      <td>{formatPriceINR(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h5>Order Summary</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col className="text-end">
                  {formatPriceINR(order.items?.reduce((acc, item) => acc + item.price * item.quantity, 0))}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col className="text-end">Included</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col className="text-end">Included</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className="fw-bold">
                <Col>Total:</Col>
                <Col className="text-end text-danger">{formatPriceINR(order.total)}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          <div className="d-grid gap-2 mt-3">
            <Button variant="warning">Track Order</Button>
            <Button variant="outline-danger">Cancel Order</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPage;
