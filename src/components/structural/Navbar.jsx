import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';
import routes from '../../routes.jsx';

export default function Navbar() {
  const { isLoggedIn, role, setIsLoggedIn, setCurrentUsername, currentUsername } =
    useContext(UserLoginStatusContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUsername('');
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('currentUsername');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      {/* Logout button on top right */}
      {isLoggedIn && (
        <button
          onClick={() => navigate('/logout')}
          className="navbar-logout-btn"
        >
          Logout {currentUsername}
        </button>
      )}

      <span className="navbar-brand">BookWyrm App</span>

      <ul className="navbar-links">
        {routes
          .filter(r => {
            if (r.name === 'My Hoard' && !isLoggedIn) return false;
            if (r.name === 'Login' && isLoggedIn) return false;
            if (r.name === 'Admin' && role !== 'admin') return false;
            if (r.name === 'Logout') return false;
            return true;
          })
          .map(r => (
            <li key={r.path}>
              <NavLink
                to={r.path}
                className={({ isActive }) =>
                  isActive ? 'active navbar-link' : 'navbar-link'
                }
                end={r.path === '/'}
              >
                {r.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
}
