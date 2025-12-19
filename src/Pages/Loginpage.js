import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import "./auth.css";

const Loginpage = () => {
  const [validated, setValidated] = useState(false);
  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const email = form.email.value;
    const password = form.password.value;

    setLoginUserResponseState({ loading: true, error: "", success: "" });

    try {
      const data = await loginUser({ email, password });
      
      if (data.success) {
        setLoginUserResponseState({
          success: "Login successful! Redirecting...",
          loading: false,
          error: "",
        });

        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));

        setTimeout(() => {
          if (data.data.isAdmin) {
            navigate("/admin/orders");
          } else {
            navigate("/user");
          }
        }, 1000);
      } else {
        setLoginUserResponseState({
          error: data.message || "Login failed",
          loading: false,
          success: "",
        });
      }
    } catch (error) {
      setLoginUserResponseState({
        error: error.response?.data?.message || "Login failed. Please try again.",
        loading: false,
        success: "",
      });
    }
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          {loginUserResponseState.error && (
            <Alert variant="danger">{loginUserResponseState.error}</Alert>
          )}
          {loginUserResponseState.success && (
            <Alert variant="success">{loginUserResponseState.success}</Alert>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Do not logout"
              />
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              disabled={loginUserResponseState.loading}
            >
              {loginUserResponseState.loading ? "Loading..." : "Login"}
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              <p className="text-muted">
                <small>Demo credentials:</small>
                <br />
                <small>User: user@user.com / password</small>
                <br />
                <small>Admin: admin@admin.com / password</small>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Loginpage;
