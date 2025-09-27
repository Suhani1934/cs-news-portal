// frontend/src/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import { Table, Button, Modal, Card } from "react-bootstrap";
import AdminEventForm from "./AdminEventForm";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSignOutAlt } from "react-icons/fa";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
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

  return (
    <div className="container mt-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <h4 className="mb-0">📅 Manage Events</h4>
          <div>
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
            <Button
              variant="secondary"
              onClick={() => {
                localStorage.removeItem("admin_key");
                navigate("/admin");
              }}
            >
              <FaSignOutAlt className="me-1" /> Logout
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          <Table hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th style={{ width: "120px" }} className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev._id}>
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
            </tbody>
          </Table>
        </Card.Body>
      </Card>

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
