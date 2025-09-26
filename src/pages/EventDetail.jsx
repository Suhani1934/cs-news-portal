// frontend/src/pages/EventDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`).then(res => setEvent(res.data)).catch(console.error);
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <img src={event.imageUrl} alt={event.title} className="img-fluid mb-3" />
      <p><strong>Date:</strong> {new Date(event.eventDate).toLocaleString()}</p>
      <p>{event.description}</p>
    </div>
  );
}
