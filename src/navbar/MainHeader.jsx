import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
const MainHeader = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      className="navbar"
      fixed="top"
    >
      <Container className="gap-5">
        <Navbar.Brand href="/" className="fs-3">OHMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="gap-5">
          <Nav className="me-auto">
            <Nav.Link href="/" className="me-3 fs-5">
              Home
            </Nav.Link>
            <Nav.Link href="/" className="me-3 fs-5">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown" className="me-3 fs-5">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="" >
            <Nav.Link href="#deets" className="fs-5">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainHeader;
