import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.jsx';
import { API_BOOKS_URL, API_USERS_URL, authHeaders } from '../../apiConfig.js';

export default function AddBookPage() {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Non-Fiction'];

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [loading, user, navigate]);

  if (loading) return null;
  if (!user) return <p>Please log in to add a book.</p>;

  const handleAddBook = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !author || !genre || !rating) {
      setError('All required fields must be filled.');
      return;
    }

    try {
      // Create new book object
      const newBook = {
        title,
        author,
        genre,
        reviews: review ? [{ user: user.username, rating, review }] : [],
        numberReviews: review ? 1 : 0,
        averageRating: Number(rating),
        firstAddedBy: user.username,
        lastAddedBy: user.username,
        addedBy: [user.id],
        createdAt: new Date().toISOString()
      };

      // POST to books collection
      const bookRes = await fetch(API_BOOKS_URL, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newBook)
      });
      if (!bookRes.ok) throw new Error('Failed to add book');
      const createdBook = await bookRes.json();
      const bookId = createdBook.id;

      // Fetch full user object
      const userRes = await fetch(API_USERS_URL, { headers: authHeaders });
      if (!userRes.ok) throw new Error('Failed to fetch users');
      const usersData = await userRes.json();

      const userKey = Object.keys(usersData.results).find(
        key => usersData.results[key].username === user.username
      );
      if (!userKey) throw new Error('User not found');

      const userEntry = usersData.results[userKey];

      // Update favoriteBooks (preserve existing fields)
      const updatedFavorites = Array.from(new Set([...(userEntry.favoriteBooks || []), bookId]));
      const updatedUser = { ...userEntry, favoriteBooks: updatedFavorites };

      const putUserRes = await fetch(`${API_USERS_URL}?id=${userKey}`, {
        method: 'PUT',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      if (!putUserRes.ok) throw new Error('Failed to update user');

      const savedUser = await putUserRes.json();
      setUser(savedUser);

      setSuccess('Book added successfully!');
      setTitle('');
      setAuthor('');
      setGenre('');
      setRating('');
      setReview('');
      navigate('/my-hoard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>Add a Book</h2>
      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <select
          value={genre}
          onChange={e => setGenre(e.target.value)}
          required
          style={{
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(255,255,255,0.8)',
            color: '#333',
            padding: '0.5rem',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        >
          <option value="" disabled>Select Genre</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={e => setRating(e.target.value)}
          min={1}
          max={5}
          required
        />
        <textarea
          placeholder="Review (optional, max 200 chars)"
          value={review}
          onChange={e => setReview(e.target.value.slice(0, 200))}
          maxLength={200}
        />
        <button type="submit" className="auth-btn register-btn">Add Book</button>
      </form>
    </div>
  );
}
