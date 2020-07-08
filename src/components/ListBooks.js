import React from 'react';
import Book from './Book';

const ListBooks = props => {
  const { books, handleShelfChange } = props;
  return (
    <ol className="books-grid">
      {books.map((book, i) => {
        return (
          <li key={i}>
            <Book
              book={book}
              handleShelfChange={handleShelfChange}
            />
          </li>
        )
      })}
    </ol>
  );
}

export default ListBooks;