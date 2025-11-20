import Home from './components/content/Home.jsx';
import About from './components/content/About.jsx';
import BookHoard from './components/content/BookHoard.jsx';
import UserLogin from './components/auth/UserLogin.jsx';

const routes = [
  { name: 'Home', path: '/', element: <Home/> },
  { name: 'About', path: '/about', element: <About/> },
  { name: 'My Hoard', path: '/hoard', element: <BookHoard/> },
  { name: 'Login', path: '/login', element: <UserLogin/> }
];

export default routes;
