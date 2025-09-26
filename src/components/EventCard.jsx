// frontend/src/components/EventCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function EventCard({ ev, onView }) {
  const short = ev.description.length > 120 ? ev.description.slice(0, 120) + '...' : ev.description;
  const dateStr = new Date(ev.eventDate).toLocaleString();
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={ev.imageUrl} style={{ height: 180, objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{ev.title}</Card.Title>
        <Card.Text className="flex-grow-1">{short}</Card.Text>
        <div className="mt-2">
          <small className="text-muted">{dateStr}</small>
        </div>
        <Button variant="primary" className="mt-2" onClick={() => onView(ev)}>View More</Button>
      </Card.Body>
    </Card>
  );
}
