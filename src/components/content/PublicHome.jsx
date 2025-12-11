import { useNavigate } from 'react-router-dom';

export default function PublicHome() {
  const navigate = useNavigate(); // <- get navigate function from hook

  return (
    <div className="public-home">
      <h2>Check out some recent reviews</h2>

      <section className="recent-books">
        <p>Recent books from the community...</p>
      </section>

      <div className="auth-buttons">
        <button className="auth-btn login-btn" onClick={() => navigate('/login')}>
          Log In
        </button>
        <button className="auth-btn register-btn" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
}
