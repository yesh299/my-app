import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5">
      <div className="py-5">
        <h1 style={{ fontSize: "8rem", fontWeight: "bold", color: "#dee2e6" }}>
          404
        </h1>
        <h2 className="mb-4">Oops! Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <Button variant="primary" onClick={() => navigate("/")}>
            <i className="bi bi-house-door"></i> Go to Homepage
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Go Back
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <i className="bi bi-exclamation-triangle" style={{ fontSize: "5rem", color: "#ffc107" }}></i>
      </div>
    </Container>
  );
};

export default NotFoundPage;
