import { Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";

const AdminOrdersPage = () => {
  const [orders] = useState([
    {
      orderId: 123456,
      user: "John Doe",
      date: "2024-01-15",
      total: 2499.00,
      status: "Processing",
      isPaid: true
    },
    {
      orderId: 123457,
      user: "Jane Smith",
      date: "2024-01-16",
      total: 999.00,
      status: "Shipped",
      isPaid: true
    },
    {
      orderId: 123458,
      user: "Mike Johnson",
      date: "2024-01-17",
      total: 149.97,
      status: "Delivered",
      isPaid: true
    }
  ]);

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

  return (
    <Container className="my-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h1>Orders Management</h1>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.user}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                {order.isPaid ? (
                  <Badge bg="success">Paid</Badge>
                ) : (
                  <Badge bg="danger">Not Paid</Badge>
                )}
              </td>
              <td>
                <Badge bg={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td>
                <LinkContainer to={`/admin/order-details/${order.orderId}`}>
                  <Button variant="primary" size="sm">
                    <i className="bi bi-eye"></i> Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminOrdersPage;
