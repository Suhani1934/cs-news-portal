import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    if (!key.trim()) return alert('Enter admin key (set in backend .env as ADMIN_KEY)');
    localStorage.setItem('admin_key', key);
    navigate('/admin/dashboard');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #f5f5f7, #e9ecef)',
      }}
    >
      <div
        className="card shadow p-4 border-0"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '18px',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <div className="text-center mb-4">
          <i
            className="bi bi-shield-lock"
            style={{ fontSize: '3rem', color: '#495057' }}
          ></i>
          <h4 className="mt-3 fw-bold text-dark">Admin Login</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            Access your control panel securely
          </p>
        </div>

        <form onSubmit={handle}>
          <div className="mb-4">
            <label className="form-label text-secondary fw-semibold">
              Admin Key
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter admin key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                borderRadius: '10px',
                border: '1px solid #ced4da',
                padding: '12px 16px',
              }}
            />
          </div>

          <button
            className="btn w-100 fw-semibold py-2"
            type="submit"
            style={{
              borderRadius: '10px',
              backgroundColor: '#343a40',
              color: 'white',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#495057')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#343a40')}
          >
            Enter Admin Panel
          </button>
        </form>

        
      </div>
    </div>
  );
}
