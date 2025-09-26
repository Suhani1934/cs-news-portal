// frontend/src/components/EventModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function EventModal({ show, onHide, event }) {
  if (!event) return null;
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={event.imageUrl} alt={event.title} className="img-fluid mb-3" />
        <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
        <p>{event.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
