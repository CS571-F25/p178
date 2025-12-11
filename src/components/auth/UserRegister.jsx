import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_USERS_URL, authHeaders } from '../../apiConfig.js';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password || !displayName) {
      setError('All fields are required.');
      return;
    }

    try {
      const newUser = {
        username,
        password,
        role: 'user',
        profile: { displayName, avatar: '' },
        favoriteBooks: [],  // always initialized
        favoriteGenres: [],
        loggedBooks: [],
        ActivityPoints: 0,
        createdAt: new Date().toISOString()
      };

      const res = await fetch(API_USERS_URL, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error(`Failed to register: ${res.status}`);
      const createdUser = await res.json();

      setSuccess('Registration successful!');
      setUsername('');
      setPassword('');
      setDisplayName('');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn register-btn">Register</button>
      </form>
    </div>
  );
}
