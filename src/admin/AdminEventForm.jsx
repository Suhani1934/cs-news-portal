import React, { useState } from 'react';
import API from '../api';

export default function AdminEventForm({ event, onSaved }) {
  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [eventDate, setEventDate] = useState(event ? new Date(event.eventDate).toISOString().slice(0,16) : '');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !eventDate) return alert('Fill all fields');
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    form.append('eventDate', eventDate);
    if (imageFile) form.append('image', imageFile);

    try {
      if (event) {
        // edit
        await API.put(`/events/${event._id}`, form);
      } else {
        // create
        await API.post('/events', form);
      }
      alert('Saved');
      onSaved();
    } catch (err) {
      console.error(err);
      alert('Save failed. Check admin key and backend logs.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label>Title</label>
        <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="mb-2">
        <label>Description</label>
        <textarea className="form-control" rows="4" value={description} onChange={e=>setDescription(e.target.value)} />
      </div>
      <div className="mb-2">
        <label>Date & Time</label>
        <input type="datetime-local" className="form-control" value={eventDate} onChange={e=>setEventDate(e.target.value)} />
      </div>
      <div className="mb-2">
        <label>Image {event ? '(leave blank to keep existing)' : ''}</label>
        <input type="file" accept="image/*" className="form-control" onChange={e=>setImageFile(e.target.files[0])} />
      </div>
      <div className="text-end">
        <button className="btn btn-secondary me-2" type="button" onClick={()=>{ onSaved(); }}>Cancel</button>
        <button className="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  );
}
