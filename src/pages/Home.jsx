// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import { Carousel, Row, Col, ListGroup } from 'react-bootstrap';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    API.get('/news').then(res => setNews(res.data)).catch(console.error);
    API.get('/events').then(res => setEvents(res.data)).catch(console.error);
  }, []);

  const handleView = ev => {
    setSelected(ev);
    setShow(true);
  };

  const now = new Date();

  // Upcoming events
  const upcoming = events
    .filter(e => new Date(e.eventDate) >= now)
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  // Past events
  const past = events
    .filter(e => new Date(e.eventDate) < now)
    .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));

  // Latest events: only upcoming events, sorted by creation date
  const latest = upcoming
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <>
      {/* Banner + Upcoming Events list */}
      <Row className="mb-4">
        {/* Carousel Banner */}
        <Col md={8}>
          <Carousel>
            {(events.slice(0, 3).length ? events.slice(0, 3) : [{
              title: 'Welcome',
              imageUrl: 'https://via.placeholder.com/1600x400?text=News+Portal'
            }]).map((item, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src={item.imageUrl || 'https://via.placeholder.com/1600x400'}
                  alt={`slide-${idx}`}
                  style={{ height: 350, objectFit: 'cover' }}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        {/* Upcoming Events list */}
        <Col md={4}>
          <h5>Upcoming Events</h5>
          <ListGroup>
            {upcoming.length ? upcoming.map(ev => (
              <ListGroup.Item key={ev._id}>
                <div style={{ fontWeight: '600' }}>{ev.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#555' }}>
                  {new Date(ev.eventDate).toLocaleDateString()} {new Date(ev.eventDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </ListGroup.Item>
            )) : <ListGroup.Item>No upcoming events</ListGroup.Item>}
          </ListGroup>
        </Col>
      </Row>

      {/* News marquee */}
      <div className="mt-3 mb-3 p-2 bg-light border">
        <marquee behavior="scroll" direction="left" style={{ color: 'red', fontWeight: 600 }}>
          {news.map((n, i) => (
            <span key={n.id}>
              {n.title}{i < news.length - 1 ? ' — ' : ''}
            </span>
          ))}
        </marquee>
      </div>

      {/* Latest Events */}
      <h4>Latest Events</h4>
      <Row xs={1} md={3} className="g-3">
        {latest.map(ev => (
          <Col key={ev._id}>
            <EventCard ev={ev} onView={handleView} />
          </Col>
        ))}
      </Row>

      {/* Past Events */}
      <h4 className="mt-4">Past Events</h4>
      <Row xs={1} md={3} className="g-3 mb-4">
        {past.length ? past.map(ev => (
          <Col key={ev._id}><EventCard ev={ev} onView={handleView} /></Col>
        )) : <p className="px-3">No past events.</p>}
      </Row>

      <EventModal show={show} onHide={() => setShow(false)} event={selected} />
    </>
  );
}
