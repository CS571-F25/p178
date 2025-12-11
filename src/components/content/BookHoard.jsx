import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext.jsx';
import { API_BOOKS_URL, authHeaders } from '../../apiConfig.js';

export default function MyHoard() {
  const { user, loading } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user?.favoriteBooks?.length > 0) {
      const fetchBooks = async () => {
        try {
          // Build query string with all favorite book IDs
          const query = user.favoriteBooks.map(id => `id=${id}`).join('&');
          const res = await fetch(`${API_BOOKS_URL}?${query}`, { headers: authHeaders });
          if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
          const data = await res.json();
          // Convert results object to array
          const booksArray = Object.values(data.results);
          setBooks(booksArray);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchBooks();
    }
  }, [user, loading]);

  if (loading) return null;
  if (!user) return <p>Please log in to view your hoard.</p>;

  return (
    <div className="user-home">
      <h2>{user.profile?.displayName || 'Your Hoard'}</h2>
      {error && <p className="error-text">{error}</p>}
      {books.length === 0 ? (
        <p>No books rated yet.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.title + book.author + book.createdAt}>
              <strong>{book.title}</strong> by {book.author} — Rating: {book.averageRating || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
