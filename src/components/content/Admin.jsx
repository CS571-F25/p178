import { useContext } from 'react';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

export default function Admin() {
  const { role } = useContext(UserLoginStatusContext);

  if (role !== 'admin') return <p>Access denied</p>;

  return (
    <div>
      <h1 tabIndex={-1}>Admin Stats</h1>
      <div>
        <h2><em>Put stuff in here</em></h2>
      </div>
    </div>
  );
}