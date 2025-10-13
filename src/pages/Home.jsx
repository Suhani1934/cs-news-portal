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

  // Loader states
  const [loading, setLoading] = useState(true); // main loader
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingPast, setLoadingPast] = useState(true);

  // Past events filter
  const [year, setYear] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filteredPast, setFilteredPast] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    Promise.all([API.get("/news"), API.get("/events")])
      .then(([newsRes, eventsRes]) => {
        setNews(newsRes.data);
        setEvents(eventsRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // When events update → turn off individual loaders with small delay for smoothness
  useEffect(() => {
    if (events.length) {
      setTimeout(() => {
        setLoadingUpcoming(false);
        setLoadingLatest(false);
        setLoadingPast(false);
      }, 500); // small delay for animation
    }
  }, [events]);

  const handleView = (ev) => {
    setSelected(ev);
    setShow(true);
  };

  const now = new Date();

  // Event data categorization
  const upcoming = events
    .filter((e) => new Date(e.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  const past = events
    .filter((e) => new Date(e.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  const latest = past.slice(0, 4);
  const pastExcludingLatest = past.filter(
    (ev) => !latest.some((l) => l._id === ev._id)
  );

  // Filters
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
    setCurrentPage(1);
  };

  // Year options
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

  // Global Loader
  if (loading) {
    return (
      <div className="loader-container">
        <div className="custom-loader"></div>
        <p className="loader-text">Loading ...</p>
      </div>
    );
  }

  return (
    <>
      {/* Banner + Upcoming Events */}
      <Row className="mb-4">
        <Col md={8}>
          <Carousel fade controls={false} indicators={false} interval={3000}>
            {(latest.length
              ? latest
              : [
                  {
                    title: "Welcome to DSVV Student Club News & Events",
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
                      height: 555,
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 w-100"
                    style={{
                      height: "50%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                      borderRadius: "0 0 10px 10px",
                    }}
                  ></div>

                  <Carousel.Caption
                    style={{
                      top: "5%",
                      bottom: "auto",
                      textAlign: "center",
                    }}
                  >
                    <h2
                      className="fw-bold"
                      style={{
                        fontSize: "1.2rem",
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
          <h5 className="event-heading">
            Upcoming Events
            <img
              src="/upcoming.gif"
              alt="upcoming events animation"
              className="heading-gif"
            />
          </h5>

          {loadingUpcoming ? (
            <div className="section-loader">
              <div className="small-loader"></div>
              <p>Loading upcoming events...</p>
            </div>
          ) : upcoming.length ? (
            // Scrollable container for upcoming events
            <div className="scrollable-events">
              <ListGroup>
                {upcoming.map((ev) => {
                  const eventDate = new Date(ev.eventDate);
                  const day = eventDate.getDate();
                  const month = eventDate.toLocaleString("default", {
                    month: "long",
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
                          width: "100px",
                          height: "100px",
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
                        <div style={{ fontSize: "1.3rem" }}>{day}</div>
                        <div style={{ fontSize: "1rem" }}>{month}</div>
                        <div style={{ fontSize: "0.90rem" }}>{year}</div>
                      </div>

                      {/* Event Title */}
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          color: "#337ab7",
                        }}
                      >
                        {ev.title}
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          ) : (
            <ListGroup.Item>No upcoming events</ListGroup.Item>
          )}
        </Col>
      </Row>

      {/* Latest Events */}
      <h5 className="event-heading latest">
        Latest Events
        <img
          style={{
            width: "5rem",
            height: "2rem",
          }}
          src="/new-gif.gif"
          alt="upcoming events animation"
          className="heading-gif"
        />
      </h5>
      {loadingLatest ? (
        <div className="section-loader">
          <div className="small-loader"></div>
          <p>Loading latest events...</p>
        </div>
      ) : (
        <Row xs={1} md={4} className="g-3">
          {latest.length ? (
            latest.map((ev) => (
              <Col key={ev._id}>
                <EventCard ev={ev} onView={handleView} />
              </Col>
            ))
          ) : (
            <p className="px-3">No recent events.</p>
          )}
        </Row>
      )}

      {/* Past Events */}
      <div className="d-flex align-items-center justify-content-between mt-4 mb-2">
        <h5 className="mb-0 event-heading past">Past Events</h5>
        {/* Filter */}
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

      {loadingPast ? (
        <div className="section-loader">
          <div className="small-loader"></div>
          <p>Loading past events...</p>
        </div>
      ) : (
        <>
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
              <button
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                style={{
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                &laquo;
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  className={currentPage === idx + 1 ? "active" : ""}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                style={{
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                &raquo;
              </button>

              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </>
      )}

      <EventModal show={show} onHide={() => setShow(false)} event={selected} />
    </>
  );
}
