import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";

const AdminProductsPage = () => {
  const [products] = useState([
    {
      id: 1,
      name: "MacBook Pro 16",
      price: 2499,
      category: "Electronics",
      stock: 15
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 999,
      category: "Electronics",
      stock: 25
    },
    {
      id: 3,
      name: "The Great Gatsby",
      price: 12.99,
      category: "Books",
      stock: 50
    }
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      alert(`Product ${id} deleted`);
    }
  };

  return (
    <Container className="my-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h1>Products Management</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/create-new-product">
            <Button variant="success">
              <i className="bi bi-plus-circle"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <LinkContainer to={`/admin/edit-product/${product.id}`}>
                  <Button variant="primary" size="sm" className="me-2">
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteHandler(product.id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminProductsPage;
