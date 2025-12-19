import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";

const UserProfilePage = () => {
  const [validated, setValidated] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John",
    lastName: "Doe",
    email: "user@user.com",
    phone: "+1 234 567 8900",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA"
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (storedUser.email) {
      setUserInfo(prev => ({ ...prev, email: storedUser.email }));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // Update user info
    const updatedInfo = {
      name: form.name.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      country: form.country.value
    };

    setUserInfo(updatedInfo);
    setUpdateSuccess(true);
    setTimeout(() => setUpdateSuccess(false), 3000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const current = form.formCurrentPassword.value.trim();
    const next = form.formNewPassword.value.trim();
    const confirm = form.formConfirmPassword.value.trim();

    if (!current || !next || !confirm) {
      alert("Please fill in all password fields.");
      return;
    }
    if (next.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }
    if (next !== confirm) {
      alert("New password and confirmation do not match.");
      return;
    }
    // Demo: persist a flag so login can validate later if needed
    const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
    localStorage.setItem("userPasswordUpdated", JSON.stringify({ email: storedUser.email, updatedAt: Date.now() }));
    alert("Password updated successfully!");
    form.reset();
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mb-4">My Profile</h1>
          {updateSuccess && (
            <Alert variant="success">Profile updated successfully!</Alert>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="name"
                    required
                    type="text"
                    defaultValue={userInfo.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your first name
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    required
                    type="text"
                    defaultValue={userInfo.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your last name
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue={userInfo.email}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phone"
                type="tel"
                defaultValue={userInfo.phone}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                defaultValue={userInfo.address}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    type="text"
                    defaultValue={userInfo.city}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="state"
                    type="text"
                    defaultValue={userInfo.state}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3" controlId="formZip">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    name="zip"
                    type="text"
                    defaultValue={userInfo.zip}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                defaultValue={userInfo.country}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>

          <hr className="my-4" />

          <h4>Change Password</h4>
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group className="mb-3" controlId="formCurrentPassword">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Button variant="warning" type="submit">Update Password</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
