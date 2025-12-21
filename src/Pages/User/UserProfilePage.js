import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../api/api";

const UserProfilePage = () => {
  const [validated, setValidated] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Fetch user profile from API
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        if (response.success && response.data) {
          // Parse name into first and last name
          const nameParts = response.data.name.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          setUserInfo({
            name: firstName,
            lastName: lastName,
            email: response.data.email,
            phone: response.data.phone || "",
            address: response.data.address || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        // Fallback to localStorage
        const storedUser = JSON.parse(localStorage.getItem("userInfo") || "{}");
        if (storedUser.email) {
          const nameParts = storedUser.name?.split(' ') || ['', ''];
          setUserInfo({
            name: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: storedUser.email,
            phone: "",
            address: "",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setError("");
    setUpdateSuccess(false);
    setLoading(true);

    try {
      // Combine first and last name
      const fullName = `${form.name.value.trim()} ${form.lastName.value.trim()}`.trim();
      
      // Update user profile via API
      const updatedData = {
        name: fullName,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
      };

      const response = await updateUserProfile(updatedData);
      
      if (response.success) {
        // Update local state
        setUserInfo({
          name: form.name.value,
          lastName: form.lastName.value,
          email: form.email.value,
          phone: form.phone.value,
          address: form.address.value,
        });
        
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        setError(response.message || "Failed to update profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);
    
    const form = e.currentTarget;
    const currentPassword = form.formCurrentPassword.value.trim();
    const newPassword = form.formNewPassword.value.trim();
    const confirmPassword = form.formConfirmPassword.value.trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      // Update password via API
      const response = await updateUserProfile({
        password: newPassword
      });
      
      if (response.success) {
        setPasswordSuccess(true);
        form.reset();
        setTimeout(() => setPasswordSuccess(false), 3000);
      } else {
        setPasswordError(response.message || "Failed to update password");
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to update password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mb-4">My Profile</h1>
          
          {loading && !userInfo.email ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Loading profile...</p>
            </div>
          ) : (
            <>
              {updateSuccess && (
                <Alert variant="success">Profile updated successfully!</Alert>
              )}
              {error && (
                <Alert variant="danger">{error}</Alert>
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
                    placeholder="Enter your phone number"
                    defaultValue={userInfo.phone}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    as="textarea"
                    rows={3}
                    placeholder="Enter your full address"
                    defaultValue={userInfo.address}
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </Form>

              <hr className="my-4" />

              <h4>Change Password</h4>
              
              {passwordSuccess && (
                <Alert variant="success">Password updated successfully!</Alert>
              )}
              {passwordError && (
                <Alert variant="danger">{passwordError}</Alert>
              )}
              
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3" controlId="formCurrentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Enter current password"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control 
                    type="password"
                    placeholder="Enter new password (min 6 characters)"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control 
                    type="password"
                    placeholder="Confirm new password"
                  />
                </Form.Group>

                <Button 
                  variant="warning" 
                  type="submit"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Updating Password...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
