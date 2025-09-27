import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainNavbar() {
  return (
    <Navbar expand="lg" sticky="top" className="navbar-glass">
      <Container>
        {/* logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/DSVV_LOGO_BLACK.png"
            alt="Dept of CS"
            height="50"
            className="d-inline-block align-top"
          />
          <span className="ms-2 fw-bold">CS NEWS PORTAL</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/news">
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <NavDropdown title="More" id="nav-dropdown">
              <NavDropdown.Item as={Link} to="/faculty">
                Faculty
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/resources">
                Resources
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
