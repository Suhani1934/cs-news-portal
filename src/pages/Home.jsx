import React, { useEffect, useState } from "react";
import API from "../api";
import {
  Carousel,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
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
  const [loading, setLoading] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingPast, setLoadingPast] = useState(true);

  // Past events filter
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [keyword, setKeyword] = useState("");
  const [filteredPast, setFilteredPast] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch data
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

  // Smooth loader transition
  useEffect(() => {
    if (events.length) {
      setTimeout(() => {
        setLoadingUpcoming(false);
        setLoadingLatest(false);
        setLoadingPast(false);
      }, 500);
    }
  }, [events]);

  const handleView = (ev) => {
    setSelected(ev);
    setShow(true);
  };

  const now = new Date();

  // Categorize events
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

  // Dynamic filter options
  const years = Array.from(
    new Set(pastExcludingLatest.map((e) => new Date(e.eventDate).getFullYear()))
  ).sort((a, b) => b - a);

  const months = [
    ...new Set(
      pastExcludingLatest.map((e) => new Date(e.eventDate).getMonth() + 1)
    ),
  ].sort((a, b) => a - b);

  // Apply filter logic
  const applyFilter = () => {
    let temp = pastExcludingLatest;

    if (year) {
      temp = temp.filter(
        (e) => new Date(e.eventDate).getFullYear() === parseInt(year)
      );
    }

    if (month) {
      temp = temp.filter(
        (e) => new Date(e.eventDate).getMonth() + 1 === parseInt(month)
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

  // Pagination logic
  const displayedPast = (
    filteredPast.length ? filteredPast : pastExcludingLatest
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    (filteredPast.length ? filteredPast.length : pastExcludingLatest.length) /
      itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Global loader
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
          <h5 className="event-heading d-flex align-items-center gap-2">
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
                        <div style={{ fontSize: "0.9rem" }}>{year}</div>
                      </div>

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
      <h5 className="event-heading latest d-flex align-items-center gap-2">
        Latest Events
        <img
          style={{ width: "5rem", height: "2rem" }}
          src="/new-gif.gif"
          alt="latest events animation"
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

      {/* Past Events + Filters */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mt-4 mb-3 gap-2">
        <h5 className="mb-0 event-heading past">Past Events</h5>

        <div className="filter-bar d-flex flex-wrap gap-2 p-2 rounded bg-light shadow-sm">
          <Form.Select
            size="sm"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{ width: "120px" }}
          >
            <option value="">Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            size="sm"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={{ width: "130px" }}
          >
            <option value="">Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {new Date(0, m - 1).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            size="sm"
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{ width: "180px" }}
          />

          <Button
            size="sm"
            variant="warning"
            className="fw-semibold"
            onClick={applyFilter}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Past Events List */}
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

          {/* Pagination with Dots */}
          {totalPages > 1 && (
            <div className="pagination-container">
              {/* Prev */}
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

              {/* Pages */}
              {(() => {
                const pages = [];
                const showPages = 2;
                let start = Math.max(1, currentPage - showPages);
                let end = Math.min(totalPages, currentPage + showPages);

                if (start > 1) {
                  pages.push(
                    <button key={1} onClick={() => handlePageChange(1)}>
                      1
                    </button>
                  );
                  if (start > 2) pages.push(<span key="start-dots">...</span>);
                }

                for (let i = start; i <= end; i++) {
                  pages.push(
                    <button
                      key={i}
                      className={currentPage === i ? "active" : ""}
                      onClick={() => handlePageChange(i)}
                    >
                      {i}
                    </button>
                  );
                }

                if (end < totalPages) {
                  if (end < totalPages - 1)
                    pages.push(<span key="end-dots">...</span>);
                  pages.push(
                    <button
                      key={totalPages}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  );
                }

                return pages;
              })()}

              {/* Next */}
              <button
                onClick={() =>
                  currentPage < totalPages &&
                  handlePageChange(currentPage + 1)
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
