import React, { useState } from 'react';


// Backend login endpoint
const LOGIN_API = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/login/`;

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Demo: two users, but try backend first
    try {
      const res = await fetch(LOGIN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        setError('');
        onLogin && onLogin(username);
        return;
      }
    } catch (err) {}
    // Fallback: local demo users
    if ((username === 'team' && password === 'Oktofit!') || (username === 'restricted' && password === 'limittedOktoFit!')) {
      setError('');
      onLogin && onLogin(username);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="card p-4 shadow" style={{ minWidth: 350 }}>
        <h2 className="card-title mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger py-1">{error}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
