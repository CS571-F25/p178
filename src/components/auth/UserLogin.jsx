import React, { useRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserLoginStatusContext from '../contexts/UserLoginStatusContext';

export default function UserLogin() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { setIsLoggedIn, setCurrentUsername, setRole } =
    useContext(UserLoginStatusContext);

  const API_URL_USERS = "https://cs571api.cs.wisc.edu/rest/f25/bucket/users";

  // Helper to convert API results into an array of users
  const parseUsers = (results) => {
    if (!results) return [];
    return Object.keys(results).map((id) => ({
      id,
      ...results[id]
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!username || !password) {
      alert("Please provide both username and password!");
      return;
    }

    try {

      const res = await fetch(API_URL_USERS, {
        method: "GET",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        }
      });

      //console.log("Fetch response:", res);

      if (!res.ok)
        throw new Error(`API fetch failed: ${res.status}`);

      const data = await res.json();

      const users = parseUsers(data.results);

      const user = users.find((u) => u.username === username);
      if (!user) {
        alert("User not found! Please try again.");
        console.log(`Login for ${username} failed: username not found`);
        return;
      }

      if (user.password !== password) {
        alert("Login failed, please try again.");
        console.log(`Login to ${username} failed: wrong password`);
        return;
      }

      // Successful login
      console.log(`User ${user.username} logged in (${user.role})`);

      setIsLoggedIn(true);
      setCurrentUsername(user.username);
      setRole(user.role || "user");

      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("currentUsername", user.username);
      sessionStorage.setItem("role", user.role || "user");

      usernameRef.current.value = "";
      passwordRef.current.value = "";

      navigate("/");
    } catch (err) {
      //console.error("Login error:", err);
      alert("Login failed, please try again.");
    }
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
