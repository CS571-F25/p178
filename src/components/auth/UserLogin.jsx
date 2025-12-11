import { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext.jsx';
import { API_USERS_URL, authHeaders } from '../../apiConfig.js';

export default function UserLogin() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const registeredSuccess = location.state?.registered; // true if redirected from register

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(API_USERS_URL, { headers: authHeaders });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();

      const usersArray = Object.values(data.results || data); // normalize array
      const matchedUser = usersArray.find(
        (u) => u.username === username && u.password === password
      );
      if (!matchedUser) throw new Error('Invalid credentials');

      const userObj = {
        username: matchedUser.username,
        role: matchedUser.role,
        permissions: matchedUser.permissions || [],
        loggedBooks: matchedUser.loggedBooks || [],
      };

      setUser(userObj);
      sessionStorage.setItem('currentUsername', matchedUser.username);
      sessionStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', userObj.role);

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>

      {registeredSuccess && (
        <p className="success-text">Successfully registered! Log in now.</p>
      )}
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn login-btn">Login</button>
      </form>

      <div className="auth-link">
        <p>
          Don't have an account? <span><Link to="/register">Register</Link></span>
        </p>
      </div>
    </div>
  );
}
