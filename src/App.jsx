import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/structural/AppLayout.jsx';
import routes from './routes.jsx';
import UserLoginStatusContext from './components/contexts/UserLoginStatusContext.jsx';
import { useState } from 'react';

export default function App() {
  const initialIsLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const initialUsername = sessionStorage.getItem('currentUsername') || '';

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [currentUsername, setCurrentUsername] = useState(initialUsername);

  return (
    <BrowserRouter>
      <UserLoginStatusContext.Provider value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUsername,
        setCurrentUsername
      }}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {routes.map((r) =>
              r.path === '/' ? (
                <Route key={r.path} index element={r.element} />
              ) : (
                <Route key={r.path} path={r.path} element={r.element} />
              )
            )}
            <Route path="*" element={routes[0].element} />
          </Route>
        </Routes>
      </UserLoginStatusContext.Provider>
    </BrowserRouter>
  );
}
