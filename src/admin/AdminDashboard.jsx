// frontend/src/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { Table, Button, Modal, Card, Row, Col, Pagination } from "react-bootstrap";
import AdminEventForm from "./AdminEventForm";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaCalendarAlt, FaClock, FaListAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const adminKey = localStorage.getItem("admin_key");

  useEffect(() => {
    if (!adminKey) {
      navigate("/admin");
      return;
    }
    load();
  }, []);

  const load = () => {
    API.get("/events", {
      headers: { Authorization: adminKey },
    })
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error(err.response?.data || err);
        alert("Failed to fetch events. Check admin key or backend.");
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await API.delete(`/events/${id}`, {
        headers: { Authorization: adminKey },
      });
      load();
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  // Filter & sort events
  const now = new Date();
  const upcomingEvents = events
    .filter((ev) => new Date(ev.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  const pastEvents = events
    .filter((ev) => new Date(ev.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  const totalEvents = events.length;

  // Pagination logic
  const paginate = (data, page) =>
    data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const renderPagination = (totalItems, currentPage, setPage) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <Pagination className="justify-content-center mt-3">
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx}
            active={idx + 1 === currentPage}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
        />
      </Pagination>
    );
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Header Section */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <h4 className="mb-0">📅 Manage Events</h4>
          <Button
            variant="success"
            className="me-2"
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            <FaPlus className="me-1" /> Create
          </Button>
        </Card.Header>
      </Card>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4} sm={12} className="mb-3">
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <FaListAlt size={30} className="text-primary mb-2" />
              <h5 className="fw-bold">Total Events</h5>
              <h3 className="text-dark">{totalEvents}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} className="mb-3">
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <FaClock size={30} className="text-success mb-2" />
              <h5 className="fw-bold">Upcoming Events</h5>
              <h3 className="text-success">{upcomingEvents.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card className="shadow-sm border-0 text-center">
            <Card.Body>
              <FaCalendarAlt size={30} className="text-danger mb-2" />
              <h5 className="fw-bold">Past Events</h5>
              <h3 className="text-danger">{pastEvents.length}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upcoming Events Section */}
      <Card className="shadow-sm border-0 mt-3">
        <Card.Header className="bg-success text-white">
          <h5 className="mb-0">🟢 Upcoming Events</h5>
        </Card.Header>
        <Card.Body>
          <Table hover responsive bordered className="align-middle">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th className="text-center" style={{ width: "120px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginate(upcomingEvents, upcomingPage).map((ev, idx) => (
                <tr key={ev._id}>
                  <td>{(upcomingPage - 1) * itemsPerPage + idx + 1}</td>
                  <td>{ev.title}</td>
                  <td>{new Date(ev.eventDate).toLocaleString()}</td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2 rounded-circle"
                      onClick={() => {
                        setEditing(ev);
                        setShowForm(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="rounded-circle"
                      onClick={() => handleDelete(ev._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
              {upcomingEvents.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No upcoming events.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {renderPagination(upcomingEvents.length, upcomingPage, setUpcomingPage)}
        </Card.Body>
      </Card>

      {/* Past Events Section */}
      <Card className="shadow-sm border-0 mt-4">
        <Card.Header className="bg-danger text-white">
          <h5 className="mb-0">🔴 Past Events</h5>
        </Card.Header>
        <Card.Body>
          <Table hover responsive bordered className="align-middle">
            <thead className="table-danger">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th className="text-center" style={{ width: "120px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginate(pastEvents, pastPage).map((ev, idx) => (
                <tr key={ev._id}>
                  <td>{(pastPage - 1) * itemsPerPage + idx + 1}</td>
                  <td>{ev.title}</td>
                  <td>{new Date(ev.eventDate).toLocaleString()}</td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2 rounded-circle"
                      onClick={() => {
                        setEditing(ev);
                        setShowForm(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="rounded-circle"
                      onClick={() => handleDelete(ev._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
              {pastEvents.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No past events.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {renderPagination(pastEvents.length, pastPage, setPastPage)}
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? "✏️ Edit Event" : "➕ Create Event"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminEventForm
            event={editing}
            onSaved={() => {
              setShowForm(false);
              load();
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
