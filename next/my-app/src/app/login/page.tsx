'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Login {
  email: string;
  password: string;
  phone?: number;
}

const LoginPage = () => {
  const [formdata, setFormData] = useState<Login>({
    email: '',
    password: '',
    phone: 0,
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
   
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={formdata.email}
              onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={formdata.password}
              onChange={(e) => setFormData({ ...formdata, password: e.target.value })}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don't have an account? <a href="#" className="text-decoration-none text-primary">Sign up</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
