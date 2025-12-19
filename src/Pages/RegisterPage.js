import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import "./auth.css";

const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  const [passwordsMatchState, setPasswordsMatchState] = useState(true);
  const navigate = useNavigate();

  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirmPassword = document.querySelector("input[name=confirmPassword]");
    if (confirmPassword.value === password.value) {
      setPasswordsMatchState(true);
    } else {
      setPasswordsMatchState(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (form.checkValidity() === false || password !== confirmPassword) {
      setValidated(true);
      return;
    }

    const name = `${form.name.value} ${form.lastName.value}`;
    const email = form.email.value;

    setRegisterUserResponseState({ loading: true, error: "", success: "" });

    try {
      const data = await registerUser({ name, email, password });
      
      if (data.success) {
        setRegisterUserResponseState({
          success: "Registration successful! Redirecting to home...",
          loading: false,
          error: "",
        });

        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setRegisterUserResponseState({
          error: data.message || "Registration failed",
          loading: false,
          success: "",
        });
      }
    } catch (error) {
      setRegisterUserResponseState({
        error: error.response?.data?.message || "Registration failed. Please try again.",
        loading: false,
        success: "",
      });
    }
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          {registerUserResponseState.error && (
            <Alert variant="danger">{registerUserResponseState.error}</Alert>
          )}
          {registerUserResponseState.success && (
            <Alert variant="success">{registerUserResponseState.success}</Alert>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                placeholder="Enter your first name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your first name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                placeholder="Enter your last name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>

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
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Confirm password"
                minLength={6}
                onChange={onChange}
                isInvalid={!passwordsMatchState}
              />
              <Form.Control.Feedback type="invalid">
                Passwords do not match
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Already have an account?{" "}
                <Link to="/login">Login</Link>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              disabled={registerUserResponseState.loading}
            >
              {registerUserResponseState.loading ? "Registering..." : "Register"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
