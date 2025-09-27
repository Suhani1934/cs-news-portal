import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5">
      <Container>
        <Row className="mb-4 align-items-center">
          {/* Logo + Department Info */}
          <Col md={4} sm={12} className="mb-3 text-center text-md-start">
            <img
              src="/DSVV_LOGO_WHITE.png"
              alt="Dept of CS"
            height="50"
            className="d-inline-block align-top"
            />
            <h5>Department of Computer Science</h5>
            <p>
              The Department of Computer Science at DSVV aims to provide quality
              education, foster research, and create innovative solutions in
              technology. Stay updated with latest events and news.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} sm={6} className="mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#latest-events"
                  className="text-light text-decoration-none"
                >
                  Events
                </a>
              </li>
              <li>
                <a href="#faculty" className="text-light text-decoration-none">
                  Faculty
                </a>
              </li>
              <li>
                <a href="#research" className="text-light text-decoration-none">
                  Research
                </a>
              </li>
            </ul>
          </Col>

          {/* Resources */}
          <Col md={2} sm={6} className="mb-3">
            <h6>Resources</h6>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/downloads/syllabus.pdf"
                  className="text-light text-decoration-none"
                >
                  Syllabus
                </a>
              </li>
              <li>
                <a
                  href="/downloads/timetable.pdf"
                  className="text-light text-decoration-none"
                >
                  Timetable
                </a>
              </li>
              <li>
                <a
                  href="/downloads/projects.pdf"
                  className="text-light text-decoration-none"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/downloads/lab-guide.pdf"
                  className="text-light text-decoration-none"
                >
                  Lab Guide
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4} sm={12}>
            <h6>Contact Us</h6>
            <p>
              Department of Computer Science
              <br />
              DSVV Haridwar
              <br />
              Bhupatwala, near Shantikunj Road, Haripur Kalan, Motichur Range,
              Uttarakhand 249205 <br /> +91-97201 07192
              <br />
              Email: computer.science@dsvv.ac.in
            </p>

            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
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
