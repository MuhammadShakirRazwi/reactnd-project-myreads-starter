import React from 'react';
import ListBooks from './ListBooks';

const BookShelf = props => {
  const { title, books, handleShelfChange } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {
            books.length > 0 ? (
              <ListBooks
                books={books}
                handleShelfChange={handleShelfChange}
              />
            ) : (
                <p className="no-found">Can't Find Books in this shelf</p>
              )
          }
      </div>
    </div>
  );
}

export default BookShelf;