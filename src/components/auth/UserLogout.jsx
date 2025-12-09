import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

export default function UserLogout() {
  const { isLoggedIn, currentUsername, role, setIsLoggedIn, setCurrentUsername, setRole } =
    useContext(UserLoginStatusContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    console.log(`User ${currentUsername} logged out`);
    setCurrentUsername('');
    setRole('user');

    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.removeItem('currentUsername');
    sessionStorage.setItem('role', 'user');

    const timer = setTimeout(() => {
      navigate('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="logout-page">
      <div className="logout-card">
        <h2>You have been logged out</h2>
        <p>Sending you back home...</p>
      </div>
    </div>
  );
}
