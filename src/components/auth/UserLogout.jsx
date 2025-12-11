import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.jsx';

export default function UserLogout() {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => { 
    clearUser(); 
    navigate('/'); 
  }, []);

  return (
    <div>
      <p>Logging out...</p>
      <button onClick={() => { clearUser(); navigate('/'); }}>Force Logout</button>
    </div>
  );
}