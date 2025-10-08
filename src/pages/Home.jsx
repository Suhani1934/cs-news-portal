import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Carousel,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import "./Home.css";

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  // Past events filter
  const [year, setYear] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filteredPast, setFilteredPast] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    API.get("/news")
      .then((res) => setNews(res.data))
      .catch(console.error);
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch(console.error);
  }, []);

  const handleView = (ev) => {
    setSelected(ev);
    setShow(true);
  };

  const now = new Date();

  // Upcoming events
  const upcoming = events
    .filter((e) => new Date(e.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  // Past events
  const past = events
    .filter((e) => new Date(e.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  // Latest 4 past events
  const latest = past.slice(0, 4);

  // Past events excluding latest
  const pastExcludingLatest = past.filter(
    (ev) => !latest.some((l) => l._id === ev._id)
  );

  // Apply filter function
  const applyFilter = () => {
    let temp = pastExcludingLatest;
    if (year) {
      temp = temp.filter(
        (e) => new Date(e.eventDate).getFullYear() === parseInt(year)
      );
    }
    if (keyword) {
      temp = temp.filter(
        (e) =>
          e.title.toLowerCase().includes(keyword.toLowerCase()) ||
          e.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    setFilteredPast(temp);
    setCurrentPage(1); // Reset page when filter applied
  };

  // Prepare years list from past events
  const years = Array.from(
    new Set(pastExcludingLatest.map((e) => new Date(e.eventDate).getFullYear()))
  ).sort((a, b) => b - a);

  // Pagination logic
  const displayedPast = (
    filteredPast.length ? filteredPast : pastExcludingLatest
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    (filteredPast.length ? filteredPast.length : pastExcludingLatest.length) /
      itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <>
      {/* Banner + Upcoming Events list */}
      <Row className="mb-4">
        <Col md={8}>
          <Carousel fade controls={false} indicators={false} interval={3000}>
            {(past.length
              ? past
              : [
                  {
                    title:
                      "Welcome to Department of Computer Science News & Events",
                    imageUrl:
                      "https://res.cloudinary.com/dil1tjdrc/image/upload/v1759903712/dsvv-banner_jus5pk.jpg",
                  },
                ]
            ).map((item, idx) => (
              <Carousel.Item key={idx}>
                <div className="position-relative">
                  <img
                    className="d-block w-100"
                    src={
                      item.imageUrl ||
                      "https://res.cloudinary.com/dil1tjdrc/image/upload/v1759903712/dsvv-banner_jus5pk.jpg"
                    }
                    alt={`slide-${idx}`}
                    style={{
                      height: 400,
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  {/* Bottom black gradient overlay */}
                  <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                      height: "50%", // adjust height as needed
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                      borderRadius: "0 0 10px 10px",
                    }}
                  ></div>

                  {/* Title at top-center */}
                  <Carousel.Caption
                    style={{
                      top: "5%", // moves title near top
                      bottom: "auto",
                      textAlign: "center",
                    }}
                  >
                    <h2
                      className="fw-bold"
                      style={{
                        fontSize: "1.1rem",
                        color: "#003366",
                        backgroundColor: "rgba(255, 223, 0, 0.9)",
                        display: "inline-block",
                        padding: "6px 16px",
                        borderRadius: "25px",
                        boxShadow: "1px 1px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.title}
                    </h2>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <Col md={4}>
          <h5 className="event-heading">Upcoming Events</h5>
          <ListGroup>
            {upcoming.length ? (
              upcoming.map((ev) => {
                const eventDate = new Date(ev.eventDate);
                const day = eventDate.getDate();
                const month = eventDate.toLocaleString("default", {
                  month: "short",
                });
                const year = eventDate.getFullYear();

                return (
                  <ListGroup.Item
                    key={ev._id}
                    className="d-flex align-items-center"
                  >
                    {/* Date Box */}
                    <div
                      style={{
                        width: "80px",
                        height: "80px", 
                        backgroundColor: "rgba(255, 221, 0, 1)",
                        color: "#000",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "5px",
                        marginRight: "15px",
                        fontWeight: "600",
                      }}
                    >
                      <div style={{ fontSize: "1.2rem" }}>{day}</div>
                      <div style={{ fontSize: "0.85rem" }}>{month}</div>
                      <div style={{ fontSize: "0.75rem" }}>{year}</div>
                    </div>

                    {/* Event Title */}
                    <div style={{ fontWeight: "600", color: "#337ab7" }}>
                      {ev.title}
                    </div>
                  </ListGroup.Item>
                );
              })
            ) : (
              <ListGroup.Item>No upcoming events</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>

      {/* News marquee */}
      {/* <div className="mt-3 mb-3 p-2 bg-light border">
        <marquee
          behavior="scroll"
          direction="left"
          style={{ color: "red", fontWeight: 600 }}
        >
          {news.map((n, i) => (
            <span key={n.id}>
              {n.title}
              {i < news.length - 1 ? " — " : ""}
            </span>
          ))}
        </marquee>
      </div> */}

      {/* Latest Events */}
      <h5 className="event-heading latest">Latest Events</h5>
      <Row xs={1} md={4} className="g-3">
        {latest.length ? (
          latest.map((ev) => (
            <Col key={ev._id}>
              <EventCard ev={ev} onView={handleView} />
            </Col>
          ))
        ) : (
          <p className="px-3">No recent past events.</p>
        )}
      </Row>

      {/* Past Events with filter */}
      <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
        <h5 className="mb-0 event-heading past">Past Events</h5>
        {/* filter */}
        <InputGroup style={{ maxWidth: "400px" }}>
          <Form.Select
            size="sm"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button size="sm" variant="primary" onClick={applyFilter}>
            Apply
          </Button>
        </InputGroup>
      </div>

      {/* past event cards */}
      <Row xs={1} md={4} className="g-3 mb-3">
        {displayedPast.length ? (
          displayedPast.map((ev) => (
            <Col key={ev._id}>
              <EventCard ev={ev} onView={handleView} />
            </Col>
          ))
        ) : (
          <p className="px-3">No past events found.</p>
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-container">
          {/* Prev button */}
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            &laquo;
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={currentPage === idx + 1 ? "active" : ""}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            &raquo;
          </button>

          {/* Total pages info */}
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}

      <EventModal show={show} onHide={() => setShow(false)} event={selected} />
    </>
  );
}
