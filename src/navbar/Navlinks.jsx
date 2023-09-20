import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { useAuth } from "../hooks/auth-hook";

const Navlinks = ({ currentStaff }) => {
  const auth = useAuth();

  return (
    <Container className="gap-5">
      <Navbar.Brand href={`/`} className="fs-3" onClick={auth.logout}>
        OHMS
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="gap-5">
        <Nav className="me-auto">
          <Nav.Link href="/" className="me-3 fs-5" onClick={auth.logout}>
            Home
          </Nav.Link>
          {auth.user && auth.user._id && (
            <>
              <Nav.Link
                href={`/staff/school/dashboard/${currentStaff.schoolId}`}
                className="me-3 fs-5"
              >
                Dashboard
              </Nav.Link>

              {auth.user.isAdmin && (
                <Nav.Link
                  href={`/staff/school/dashboard/addStaff/${currentStaff.schoolId}`}
                  className="me-3 fs-5"
                >
                  Add Staff
                </Nav.Link>
              )}
            </>
          )}
          <Nav.Link href={`/aboutus`} className="me-3 fs-5">
            About Us
          </Nav.Link>
        </Nav>
        {auth.user && auth.user._id && (
          <Nav className="">
            <Nav.Link href="/" className="fs-5" onClick={auth.logout}>
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Container>
  );
};

export default Navlinks;
