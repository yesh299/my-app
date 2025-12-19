import { Container, Row, Col, Table, Badge, Button, Card, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { formatPriceINR } from "../../utils/currency";
import "./AdminOrdersPage.css";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load orders once on mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  // Re-filter whenever orders or filters change
  useEffect(() => {
    filterOrders(orders, statusFilter, searchTerm);
  }, [orders, statusFilter, searchTerm]);

  const filterOrders = (ordersList, status, search) => {
    let filtered = ordersList;

    if (status !== "All") {
      filtered = filtered.filter(o => o.status === status);
    }

    if (search) {
      filtered = filtered.filter(o =>
        o.orderId.includes(search) ||
        o.shippingAddress?.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(o =>
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    setFilteredOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    alert(`Order ${orderId} status updated to ${newStatus}`);
    setShowModal(false);
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

  const getTotalRevenue = () => {
    return orders
      .filter(o => o.status === "Delivered" && o.isPaid)
      .reduce((acc, o) => acc + o.total, 0);
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      processing: orders.filter(o => o.status === "Processing").length,
      shipped: orders.filter(o => o.status === "Shipped").length,
      delivered: orders.filter(o => o.status === "Delivered").length,
      cancelled: orders.filter(o => o.status === "Cancelled").length,
    };
  };

  const stats = getOrderStats();

  return (
    <Container fluid className="admin-orders-page my-4">
      <h1 className="mb-4">Order Management</h1>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <p className="stat-label">Total Orders</p>
              <h3 className="stat-value">{stats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <p className="stat-label">Processing</p>
              <h3 className="stat-value text-info">{stats.processing}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <p className="stat-label">Delivered</p>
              <h3 className="stat-value text-success">{stats.delivered}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <p className="stat-label">Revenue</p>
              <h3 className="stat-value text-primary">{formatPriceINR(getTotalRevenue())}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Search Orders</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by Order ID or Customer Name"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Filter by Status</Form.Label>
                <div className="status-buttons">
                  {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map(status => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => handleStatusChange(status)}
                      className="me-2"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Orders Table */}
      <Card>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table striped hover className="mb-0">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-4">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.orderId}>
                      <td>
                        <strong>{order.orderId}</strong>
                      </td>
                      <td>
                        <div>
                          <p className="mb-0">{order.shippingAddress?.name}</p>
                          <small className="text-muted">{order.shippingAddress?.email}</small>
                        </div>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td className="fw-bold">{formatPriceINR(order.total)}</td>
                      <td>
                        <Badge bg={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={order.isPaid ? "success" : "warning"}>
                          {order.isPaid ? "Paid" : "Pending"}
                        </Badge>
                      </td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                          className="me-2"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowModal(true);
                          }}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {selectedOrder?.orderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <h6 className="mb-3">Customer Information</h6>
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Name:</strong> {selectedOrder.shippingAddress?.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.shippingAddress?.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}</p>
                </Col>
                <Col md={6}>
                  <p><strong>City:</strong> {selectedOrder.shippingAddress?.city}</p>
                  <p><strong>State:</strong> {selectedOrder.shippingAddress?.state}</p>
                  <p><strong>Postal Code:</strong> {selectedOrder.shippingAddress?.postalCode}</p>
                </Col>
              </Row>

              <hr />

              <h6 className="mb-3">Order Items</h6>
              <Table striped size="sm" className="mb-3">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{formatPriceINR(item.price)}</td>
                      <td>{formatPriceINR(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <hr />

              <h6 className="mb-3">Update Status</h6>
              <Form.Select
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.orderId, e.target.value)}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminOrdersPage;
