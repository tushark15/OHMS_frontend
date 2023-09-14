import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../context/auth-context";
import {  useContext } from "react";

const Navlinks = ({ currentStaff }) => {
  const auth = useContext(AuthContext);

  console.log(auth.user);

  return (
    <Container className="gap-5">
      <Navbar.Brand
        href={`/staff/school/dashboard/${currentStaff.schoolId}`}
        className="fs-3"
      >
        OHMS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="gap-5">
        <Nav className="me-auto">
          <Nav.Link href="/" className="me-3 fs-5" onClick={auth.logout}>
            Home
          </Nav.Link>
          {!!auth.user && (
            <>
              <Nav.Link
                href={`/staff/school/dashboard/${currentStaff.schoolId}`}
                className="me-3 fs-5"
              >
                Dashboard
              </Nav.Link>

              <Nav.Link
                href={`/staff/school/dashboard/${currentStaff.schoolId}/addStaff`}
                className="me-3 fs-5"
              >
                Add Staff
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav className="">
          <Nav.Link href="/" className="fs-5" onClick={auth.logout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  );
};

export default Navlinks;
