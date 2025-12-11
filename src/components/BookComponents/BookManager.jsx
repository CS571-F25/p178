import { useContext, useEffect, useState } from 'react';
import UserContext from '../contexts/UserContext.jsx';
import { API_BASE_URL, API_USERS_URL, API_BOOKS_URL, authHeaders } from '../../apiConfig.js';

export default function BookManager() {
  const { user, updateUserField } = useContext(UserContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.bookCollection?.length) {
        setBooks([]);
        setLoading(false);
        return;
      }
      try {
        const fetchedBooks = await Promise.all(
          user.bookCollection.map(id =>
            fetch(`${API_BOOKS_URL}/${id}`, { headers: authHeaders })
              .then(res => res.json())
          )
        );
        setBooks(fetchedBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user]);

  const handleDeleteBook = async (bookId) => {
    if (!user.permissions?.canDelete) return alert('You cannot delete books');

    try {
      await fetch(`${API_BOOKS_URL}/${bookId}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      const updatedCollection = user.bookCollection.filter(id => id !== bookId);
      updateUserField('bookCollection', updatedCollection);
      setBooks(prev => prev.filter(b => b.id !== bookId));
    } catch (err) {
      console.error('Failed to delete book:', err);
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (!books.length) return <p>No books in your collection.</p>;

  return (
    <div>
      <h2>My Book Collection</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author}
            {user.permissions?.canDelete && (
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
