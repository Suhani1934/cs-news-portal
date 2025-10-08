// frontend/src/components/EventCard.jsx
import React from "react";
import { Card } from "react-bootstrap";

export default function EventCard({ ev, onView }) {
  const short =
    ev.description.length > 100
      ? ev.description.slice(0, 100) + "..."
      : ev.description;

  const dateStr = new Date(ev.eventDate).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <Card
      className="h-100 shadow-sm border-0"
      style={{
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
      }}
    >
      {/* Thumbnail Image */}
      <Card.Img
        variant="top"
        src={ev.imageUrl}
        alt={ev.title}
        onClick={() => onView(ev)}
        style={{ height: 180, objectFit: "cover", cursor: "pointer" }}
      />

      <Card.Body>
        {/* Date */}
        <small className="text-muted d-block mb-1">{dateStr}</small>

        {/* Headline-style Title */}
        <Card.Title
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            lineHeight: "1.3em",
            marginBottom: "0.5rem",
          }}
        >
          {ev.title}
        </Card.Title>

        {/* Short Description */}
        <Card.Text style={{ fontSize: "0.9rem", color: "#444" }}>
          {short}
        </Card.Text>

        {/* Read More link */}
        <span
          className="text-primary fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => onView(ev)}
        >
          Read More →
        </span>
      </Card.Body>
    </Card>
  );
}
