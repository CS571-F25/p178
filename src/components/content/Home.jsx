import { useContext } from 'react';
import UserContext from '../contexts/UserContext.jsx';
import UserHome from './UserHome.jsx';
import PublicHome from './PublicHome.jsx';

export default function Home() {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // prevent early render

  return user ? <UserHome /> : <PublicHome />;
}
