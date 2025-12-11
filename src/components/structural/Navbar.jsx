import { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.jsx';

export default function NavBar() {
  const { user, loading, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return null;

  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <Link className="navbar-brand" to="/">BookWyrm</Link>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" end className="navbar-link">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/hoard" className="navbar-link">
                My Hoard
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="navbar-link">
              Profile
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink to="/admin" className="navbar-link">
                  Admin Panel
                </NavLink>
              </li>
            )}
            <li>
              <button className="navbar-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/login" className="navbar-link">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="navbar-link">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
