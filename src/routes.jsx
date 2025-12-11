import Home from './components/content/Home.jsx';
import About from './components/content/About.jsx';
import AddBookPage from './components/BookComponents/AddBookPage.jsx';
import BookHoard from './components/content/BookHoard.jsx';
import UserLogin from './components/auth/UserLogin.jsx';
import Admin from './components/content/Admin.jsx';
import UserProfile from './components/content/UserProfile.jsx';
import UserLogout from './components/auth/UserLogout.jsx';
import UserRegister from './components/auth/UserRegister.jsx';

const routes = [
  { name: 'Home', path: '/', element: <Home/> },
  { name: 'About', path: '/about', element: <About/> },
  { name: 'Add Book', path: '/add-book', element: <AddBookPage/> },
  { name: 'My Hoard', path: '/hoard', element: <BookHoard/> },
  { name: 'My Profile', path: '/profile', element: <UserProfile/> },
  { name: 'Admin', path: '/admin', element: <Admin/> },
  { name: 'Register', path: '/register', element: <UserRegister/>, hidden: true },
  { name: 'Login', path: '/login', element: <UserLogin/>, hidden: true },
  { name: 'Logout', path: '/logout', element: <UserLogout/>, hidden: true }
];

export default routes;
