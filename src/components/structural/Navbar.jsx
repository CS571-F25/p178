import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';
import routes from '../../routes.jsx';

export default function Navbar() {
  const [isLoggedIn, , , setCurrentUsername] = useContext(UserLoginStatusContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUsername('');
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('currentUsername');
    navigate('/'); // navigate to home after logout
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">BookWyrm App</span>
      <ul className="navbar-links">
        {routes
          .filter(r => {
            if (r.name === 'My Hoard' && !isLoggedIn) return false; // hide if not logged in
            if (r.name === 'Login' && isLoggedIn) return false;      // hide login if logged in
            return true;
          })
          .map(r => (
            <li key={r.path}>
              <NavLink
                to={r.path}
                className={({ isActive }) => isActive ? 'active navbar-link' : 'navbar-link'}
                end={r.path === '/'}
              >
                {r.name}
              </NavLink>
            </li>
          ))}
        {isLoggedIn && (
          <li>
            <span
              className="navbar-link"
              onClick={handleLogout}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') handleLogout(); }}
            >
              Log Out
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
}
