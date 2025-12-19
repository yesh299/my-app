import { Container, Row, Col, Table, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";

const AdminUsersPage = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "user@user.com",
      isAdmin: false,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Admin User",
      email: "admin@admin.com",
      isAdmin: true,
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      isAdmin: false,
      createdAt: "2024-01-20"
    }
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      alert(`User ${id} deleted`);
    }
  };

  return (
    <Container className="my-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h1>Users Management</h1>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.isAdmin ? (
                  <Badge bg="success">Yes</Badge>
                ) : (
                  <Badge bg="secondary">No</Badge>
                )}
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <LinkContainer to={`/admin/edit-user/${user.id}`}>
                  <Button variant="primary" size="sm" className="me-2">
                    <i className="bi bi-pencil"></i> Edit
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteHandler(user.id)}
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

export default AdminUsersPage;
