import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin(){
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    if (!key) return alert('Enter admin key (set in backend .env as ADMIN_KEY)');
    localStorage.setItem('admin_key', key);
    navigate('/admin/dashboard');
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 420 }}>
      <h3>Admin Login</h3>
      <form onSubmit={handle}>
        <div className="mb-3">
          <label>Admin Key</label>
          <input className="form-control" value={key} onChange={e=>setKey(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Enter Admin Panel</button>
      </form>
    </div>
  );
}
