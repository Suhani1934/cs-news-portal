// frontend/src/components/EventModal.jsx
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function EventModal({ show, onHide, event }) {
  if (!event) return null;

  const dateStr = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title
          style={{
            fontSize: "1.6rem",
            fontWeight: "700",
            lineHeight: "1.3em",
          }}
        >
          {event.title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Date */}
        <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
          {dateStr}
        </p>

        {/* Image */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="img-fluid mb-4 rounded"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        />

        {/* Description styled like article */}
        <p
          style={{
            fontSize: "1rem",
            lineHeight: "1.7em",
            textAlign: "justify",
            color: "#333",
          }}
        >
          {event.description}
        </p>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button
          variant="link"
          onClick={onHide}
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          ← Back to Events
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
