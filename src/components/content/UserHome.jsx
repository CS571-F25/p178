import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext.jsx';
import { API_BOOKS_URL, authHeaders } from '../../apiConfig.js';

export default function UserHome() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [favoriteBooksData, setFavoriteBooksData] = useState([]);

  const handleLogBook = () => navigate('/add-book');

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.favoriteBooks || user.favoriteBooks.length === 0) return;

      try {
        const books = await Promise.all(
          user.favoriteBooks.map(async (bookId) => {
            const res = await fetch(`${API_BOOKS_URL}?id=${bookId}`, { headers: authHeaders });
            if (!res.ok) throw new Error('Failed to fetch book');
            const data = await res.json();
            const key = Object.keys(data.results)[0];
            return data.results[key];
          })
        );
        setFavoriteBooksData(books);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [user]);

  return (
    <div className="user-home">
      <div style={{ marginTop: '1.5rem' }}>
        <button 
          className="auth-btn register-btn" 
          onClick={handleLogBook}
        >
          Log a New Book
        </button>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Favorite Books</h3>
      {user?.favoriteBooks?.length === 0 ? (
        <p>No books rated yet</p>
      ) : (
        <ul>
          {favoriteBooksData.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author} – {book.averageRating || 0} stars
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
