import { Container, Table, Button, Badge, Alert } from "react-bootstrap";
import { formatPriceINR } from "../../utils/currency";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UserOrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

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
};

export default UserOrderPage;