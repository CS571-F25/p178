import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';
import routes from '../../routes.jsx';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, setCurrentUsername, currentUsername } =
    useContext(UserLoginStatusContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUsername('');
    setIsLoggedIn(false);
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('currentUsername');
    navigate('/');
  };

  return (
    <nav className="navbar" style={{ position: 'relative' }}>
      
      {isLoggedIn && (
        <span
          style={{
            position: 'absolute',
            top: '50%',
            right: '12px',
            transform: 'translateY(-50%)',
            fontStyle: 'italic',
            opacity: 0.75,
            pointerEvents: 'none'
          }}
        >
          {currentUsername}
        </span>
      )}

      <span className="navbar-brand">BookWyrm App</span>

      <ul className="navbar-links">
        {routes
          .filter(r => {
            if (r.name === 'My Hoard' && !isLoggedIn) return false;
            if (r.name === 'Login' && isLoggedIn) return false;
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
