import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/structural/AppLayout.jsx';
import routes from './routes.jsx';
import { UserProvider } from './components/contexts/UserContext.jsx';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {routes.map(r =>
              r.path === '/' ? (
                <Route key={r.path} index element={r.element} />
              ) : (
                <Route key={r.path} path={r.path} element={r.element} />
              )
            )}
            <Route path="*" element={routes[0].element} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
