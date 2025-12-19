import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminEditUserPage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const [user] = useState({
    name: "John Doe",
    email: "user@user.com",
    isAdmin: false
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setUpdateSuccess(true);
    setTimeout(() => {
      navigate("/admin/users");
    }, 1500);
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">Edit User</h1>
          <Button
            variant="secondary"
            className="mb-3"
            onClick={() => navigate("/admin/users")}
          >
            <i className="bi bi-arrow-left"></i> Back to Users
          </Button>
          
          {updateSuccess && (
            <Alert variant="success">User updated successfully!</Alert>
          )}
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={user.name}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue={user.email}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formIsAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                defaultChecked={user.isAdmin}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update User
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditUserPage;
