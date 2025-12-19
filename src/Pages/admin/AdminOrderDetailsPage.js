import { Container, Row, Col, ListGroup, Button, Table, Badge, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatPriceINR } from "../../utils/currency";

const AdminOrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("Processing");

  const order = {
    orderId: id || 123456,
    user: "John Doe",
    email: "john@example.com",
    date: "2024-01-15T10:30:00",
    total: 2549.00,
    status: orderStatus,
    isPaid: true,
    paidAt: "2024-01-15T10:30:00",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      postalCode: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card",
    items: [
      {
        id: 1,
        name: "MacBook Pro 16",
        quantity: 1,
        price: 2499.00
      },
      {
        id: 2,
        name: "USB-C Cable",
        quantity: 2,
        price: 25.00
      }
    ]
  };

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

  const handleStatusUpdate = () => {
    alert(`Order status updated to: ${orderStatus}`);
  };

  return (
    <Container className="my-4">
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate("/admin/orders")}
      >
        <i className="bi bi-arrow-left"></i> Back to Orders
      </Button>

      <h1 className="mb-4">Order #{order.orderId}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>Customer Information</h5>
              <p className="mb-1"><strong>Name:</strong> {order.user}</p>
              <p className="mb-1"><strong>Email:</strong> {order.email}</p>
              <p className="mb-1"><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Shipping Address</h5>
              <p className="mb-1">{order.shippingAddress.name}</p>
              <p className="mb-1">{order.shippingAddress.address}</p>
              <p className="mb-1">
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p className="mb-1">{order.shippingAddress.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Payment</h5>
              <p className="mb-1"><strong>Method:</strong> {order.paymentMethod}</p>
              <p className="mb-1">
                <strong>Status:</strong>{" "}
                {order.isPaid ? (
                  <Badge bg="success">Paid on {new Date(order.paidAt).toLocaleString()}</Badge>
                ) : (
                  <Badge bg="danger">Not Paid</Badge>
                )}
              </p>
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
                  {order.items.map((item, idx) => (
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
              <h5>Order Status</h5>
              <Badge bg={getStatusVariant(order.status)} className="mb-3">
                {order.status}
              </Badge>
              <Form.Group className="mb-3">
                <Form.Label>Update Status</Form.Label>
                <Form.Select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
              <Button
                variant="primary"
                className="w-100"
                onClick={handleStatusUpdate}
              >
                Update Status
              </Button>
            </ListGroup.Item>

            <ListGroup.Item>
              <h5>Order Summary</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col className="text-end">
                  {formatPriceINR(order.items.reduce((acc, item) => acc + item.price * item.quantity, 0))}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col className="text-end">{formatPriceINR(0)}</Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrderDetailsPage;
