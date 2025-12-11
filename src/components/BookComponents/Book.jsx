const Book = ({ book, onDelete, onEdit, isOwner }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.review}</p>
      {isOwner && (
        <>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => onDelete(book.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Book;
