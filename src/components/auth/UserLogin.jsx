import React, { useRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

export default function UserLogin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUsername } = useContext(UserLoginStatusContext);

  const handleLogin = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      alert("Please provide both username and password!");
      return;
    }

    // const sevenDigits = /^\d{7}$/;
    // if (!sevenDigits.test(password)) {
    //   alert("Your PIN must be a 7-digit number!");
    //   return;
    // }

    // Placeholder login: accept anything
    setIsLoggedIn(true);
    setCurrentUsername(username);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('currentUsername', username);

    usernameRef.current.value = '';
    passwordRef.current.value = '';

    alert(`Logged in as ${username}`);
    navigate('/'); // redirect to home
  };

  return (
    <Form onSubmit={handleLogin}>
      <h1>Login</h1>
      <Form.Label>Username</Form.Label>
      <Form.Control ref={usernameRef} />
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" ref={passwordRef} />
      <br />
      <Button type="submit">Log In</Button>
    </Form>
  );
}
