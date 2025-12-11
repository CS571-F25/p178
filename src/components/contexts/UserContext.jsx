import { createContext, useState, useEffect } from 'react';
import { API_BASE_URL, authHeaders } from '../../apiConfig.js';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
  logout: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUsername = sessionStorage.getItem('currentUsername');
      const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

      if (!currentUsername || !isLoggedIn) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/users`, { headers: authHeaders });

        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();

        const resultsObj = (data && data.results && typeof data.results === 'object') ? data.results : {};

        const usersArray = Object.values(resultsObj);

        const foundUser = usersArray.find(u => u.username === currentUsername);

        if (foundUser) {
          setUser({
            username: foundUser.username,
            role: foundUser.role,
            permissions: foundUser.permissions || [],
            loggedBooks: foundUser.loggedBooks || [],
          });
        } else {
          setUser(null);
          sessionStorage.removeItem('currentUsername');
          sessionStorage.removeItem('isLoggedIn');
        }
      } catch (err) {
        console.error('[UserProvider] Error fetching user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('currentUsername');
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
