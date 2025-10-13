import React from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";

export default function MainNavbar() {
  const navigate = useNavigate();
  const adminKey = localStorage.getItem("admin_key");

  const handleLogout = () => {
    localStorage.removeItem("admin_key");
    navigate("/");
  };

  return (
    <Navbar expand="lg" sticky="top" className="navbar-glass shadow-sm px-3">
      <Container fluid>
        {/* Left: Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/DSVV_LOGO_BLACK.png"
            alt="Dept of CS"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="main-navbar-nav" />

        {/* Navbar collapse */}
        <Navbar.Collapse id="main-navbar-nav" className="justify-content-between">
          {/* Center: Title */}
          <div className="mx-auto text-center d-none d-lg-block">
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#000",
              }}
            >
              Department of Computer Science News & Events
            </span>
          </div>

          {/* Right: Admin actions */}
          <Nav className="ms-auto d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0">
            {!adminKey ? (
              <Button
                as={Link}
                to="/admin"
                variant="outline-dark"
                size="sm"
                className="d-flex align-items-center"
              >
                <FaUser className="me-1" /> Admin Login
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/admin/dashboard"
                  variant="outline-primary"
                  size="sm"
                  className="d-flex align-items-center"
                >
                  <FaTachometerAlt className="me-1" /> Dashboard
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-1" /> Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
