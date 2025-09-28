import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5">
      <Container>
        <Row className="mb-4 align-items-start text-center text-md-start">
          {/* Left Column: Logo + Social Icons */}
          <Col md={4} sm={12} className="mb-3">
            <img
              src="/DSVV_LOGO_WHITE.png"
              alt="Dept of CS"
              height="100" 
              className="d-block mx-auto mx-md-0 mb-3"
            />
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="text-light fs-4">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-light fs-4">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>

          {/* Middle Column: Department Info */}
          <Col md={4} sm={12} className="mb-3">
            <h5>Department of Computer Science</h5>
            <p>
              The Department of Computer Science at DSVV aims to provide quality
              education, foster research, and create innovative solutions in
              technology. Stay updated with latest events and news.
            </p>
          </Col>

          {/* Right Column: Contact */}
          <Col md={4} sm={12}>
            <h5>Contact Us</h5>
            <p>
              Department of Computer Science
              <br />
              DSVV Haridwar
              <br />
              Bhupatwala, near Shantikunj Road, Haripur Kalan, Motichur Range,
              Uttarakhand 249205
              <br />+91-97201 07192
              <br />
              Email: computer.science@dsvv.ac.in
            </p>
          </Col>
        </Row>

        {/* Bottom copyright */}
        <Row>
          <Col className="text-center pb-3 border-top border-secondary">
            &copy; {new Date().getFullYear()} Department of Computer Science,
            DSVV. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
