import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

const joinArr = (arr = []) => {
 console.log(arr, " array")
 return arr.join(', ').replace(/,(?!.*,)/gmi, ' and');
}

class Book extends Component {

  handleChange = ({ target }) => {
    const { book, handleShelfChange } = this.props;
    const shelf = target.value;
    BooksAPI
      .update(book, shelf)
      .then(() => handleShelfChange && handleShelfChange());
  }

  render() {
    const { book } = this.props;
    const { title, authors, shelf = "none", imageLinks } = book;
    console.log(book, " book");
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` }}
          ></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={this.handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{joinArr(authors)}</div>
      </div>
    );
  }
}

export default Book;