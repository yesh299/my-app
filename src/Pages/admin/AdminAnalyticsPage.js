import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { useState } from "react";

const AdminAnalyticsPage = () => {
  const [analytics] = useState({
    totalRevenue: 125430.50,
    totalOrders: 1247,
    totalProducts: 156,
    totalUsers: 3421,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    usersGrowth: 15.2
  });

  const topProducts = [
    { name: "MacBook Pro 16", sales: 145, revenue: 362355 },
    { name: "iPhone 15 Pro", sales: 234, revenue: 233766 },
    { name: "Wireless Headphones", sales: 456, revenue: 91144 },
    { name: "LEGO City Set", sales: 189, revenue: 16998 },
    { name: "The Great Gatsby", sales: 567, revenue: 7359 }
  ];

  const recentOrders = [
    { orderId: 123458, customer: "Mike Johnson", total: 149.97, status: "Delivered" },
    { orderId: 123457, customer: "Jane Smith", total: 999.00, status: "Shipped" },
    { orderId: 123456, customer: "John Doe", total: 2499.00, status: "Processing" }
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "Processing":
        return "info";
      case "Shipped":
        return "primary";
      case "Delivered":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Total Revenue</Card.Title>
              <h2 className="text-success">${analytics.totalRevenue.toLocaleString()}</h2>
              <p className="mb-0">
                <i className="bi bi-arrow-up text-success"></i>
                <span className="text-success"> {analytics.revenueGrowth}%</span> vs last month
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Total Orders</Card.Title>
              <h2 className="text-primary">{analytics.totalOrders.toLocaleString()}</h2>
              <p className="mb-0">
                <i className="bi bi-arrow-up text-success"></i>
                <span className="text-success"> {analytics.ordersGrowth}%</span> vs last month
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Total Products</Card.Title>
              <h2 className="text-info">{analytics.totalProducts}</h2>
              <p className="mb-0 text-muted">Active products</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title className="text-muted">Total Users</Card.Title>
              <h2 className="text-warning">{analytics.totalUsers.toLocaleString()}</h2>
              <p className="mb-0">
                <i className="bi bi-arrow-up text-success"></i>
                <span className="text-success"> {analytics.usersGrowth}%</span> vs last month
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Top Selling Products</h5>
            </Card.Header>
            <Card.Body>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="text-end">Sales</th>
                    <th className="text-end">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, idx) => (
                    <tr key={idx}>
                      <td>{product.name}</td>
                      <td className="text-end">{product.sales}</td>
                      <td className="text-end">${product.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h5>Recent Orders</h5>
            </Card.Header>
            <Card.Body>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th className="text-end">Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.customer}</td>
                      <td className="text-end">${order.total.toFixed(2)}</td>
                      <td>
                        <Badge bg={getStatusVariant(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5>Sales Overview</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-5">
                <i className="bi bi-bar-chart" style={{ fontSize: "4rem", color: "#ccc" }}></i>
                <p className="text-muted mt-3">Chart visualization would appear here</p>
                <p className="text-muted">Integrate with a charting library like Chart.js or Recharts for visual analytics</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAnalyticsPage;
