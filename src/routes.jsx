import Home from './components/content/Home.jsx';
import About from './components/content/About.jsx';
import BookHoard from './components/content/BookHoard.jsx';
import UserLogin from './components/auth/UserLogin.jsx';
import Admin from './components/content/Admin.jsx';
import UserLogout from './components/auth/UserLogout.jsx';

const routes = [
  { name: 'Home', path: '/', element: <Home/> },
  { name: 'About', path: '/about', element: <About/> },
  { name: 'My Hoard', path: '/hoard', element: <BookHoard/> },
  { name: 'Login', path: '/login', element: <UserLogin/> },
  { name: 'Admin', path: '/admin', element: <Admin/> },
  { name: 'Logout', path: '/logout', element: <UserLogout/>, hidden: true }
];

export default routes;
