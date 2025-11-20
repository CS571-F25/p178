import { Outlet } from 'react-router-dom';
import Navbar from './navbar.jsx';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>2025 BookWyrm App. Rights maybe reserved.</p>
      </footer>
    </div>
  );
}
