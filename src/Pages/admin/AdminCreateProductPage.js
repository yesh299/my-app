import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminCreateProductPage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setCreateSuccess(true);
    setTimeout(() => {
      navigate("/admin/products");
    }, 1500);
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="mb-4">Create New Product</h1>
          <Button
            variant="secondary"
            className="mb-3"
            onClick={() => navigate("/admin/products")}
          >
            <i className="bi bi-arrow-left"></i> Back to Products
          </Button>

          {createSuccess && (
            <Alert variant="success">Product created successfully!</Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                placeholder="Enter product name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a product name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                rows={3}
                placeholder="Enter product description"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a price
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formStock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    name="stock"
                    required
                    type="number"
                    min="0"
                    placeholder="0"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide stock quantity
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" required>
                <option value="">Choose...</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports">Sports</option>
                <option value="Toys">Toys</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select a category
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Product Image URL</Form.Label>
              <Form.Control
                name="image"
                type="text"
                placeholder="Enter image URL"
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Create Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCreateProductPage;
