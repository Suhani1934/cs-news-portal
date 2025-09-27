// frontend/src/components/MainNavbar.jsx
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function MainNavbar() {
  return (
    <Navbar expand="lg" sticky="top" className="navbar-glass shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Left: Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/DSVV_LOGO_BLACK.png"
            alt="Dept of CS"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Center: Title */}
        <div className="mx-auto text-center d-none d-lg-block">
          <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#000" }}>
            News & Events
          </span>
        </div>

        {/* Right: Admin login */}
        <Nav className="ms-auto">
          <Button
            as={Link}
            to="/admin"
            variant="outline-dark"
            size="sm"
            className="d-flex align-items-center"
          >
            <FaUser className="me-1" /> Login
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
