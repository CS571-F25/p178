import React, { useState, useEffect } from 'react';

export default function BookForm({ bookToEdit, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || '');
      setAuthor(bookToEdit.author || '');
    }
  }, [bookToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...bookToEdit, title, author });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <label>Author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <button type="submit" style={{ marginTop: '1rem' }}>
        {bookToEdit ? 'Save Changes' : 'Add Book'}
      </button>

      <button
        type="button"
        onClick={onCancel}
        style={{ marginLeft: '0.5rem' }}
      >
        Cancel
      </button>
    </form>
  );
}
