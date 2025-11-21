import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";

import { Link, LinkContainer } from "react-router-bootstrap";

const Headrecomponent = () => {
  return function CollapsibleExample() {
    return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <LinkContainer to="/">
          <Navbar.Brand href="/">THAKUR ONLINE SHOPE</Navbar.Brand>
            </LinkContainer>
             <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <InputGroup>
              <DropdownButton
                id="dropdown-basic-button"
                title="All"
              >
                <Dropdown.Item>Electronic</Dropdown.Item>
                <Dropdown.Item>Cars</Dropdown.Item>
                <Dropdown.Item>Books</Dropdown.Item>
              </DropdownButton>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              <Form.Control type="text" placeholder="Search in shop... " />
              <Button variant="warning">Warning</Button>
              </InputGroup>
            </Nav>
            <Nav>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#pricing">
                <Badge pill bg="danger">
                  Danger
                </Badge>
                CART
              </Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
};

export default Headrecomponent;
