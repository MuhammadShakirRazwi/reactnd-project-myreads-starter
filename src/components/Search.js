import React, { Component } from "react";
import _ from "lodash";
import ListBooks from "./ListBooks";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      searchedBooks: [],
    };
  }

  handleChange = ({ target }) => {
    const text = target.value;
    this.setState({ text });
    if (text) {
      this.searchBooks(text);
    }
  };

  searchBooks = (text) => {
    BooksAPI.search(text).then((res) =>
      this.setState({
        searchedBooks:
          res && res.length > 0 ? res.filter((x) => this.filterBooks(x)) : [],
      })
    );
  };

  filterBooks = (x) => {
    if (x.authors && x.imageLinks) {
      return this.markShelf(x);
    }
  };

  markShelf = (x) => {
    const { books } = this.props;
    const find = _.find(books, (o) => o.id === x.id);
    if (find) {
      x.shelf = find.shelf;
      return x;
    }
    return x;
  };

  componentDidUpdate(prevProps) {
    const { text, searchedBooks } = this.state;
    if (text) {
      const { books } = this.props;
      const { books: prevBooks } = prevProps;
      if (prevBooks !== books) {
        this.setState({
          searchedBooks: searchedBooks.map((x) => this.markShelf(x)),
        });
      }
    }
  }

  render() {
    const { handleShelfChange } = this.props;
    const { text, searchedBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={text}
              onChange={this.handleChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {text !== "" && (
          <div className="search-books-results">
            {searchedBooks.length > 0 ? (
              <ListBooks
                books={searchedBooks}
                handleShelfChange={handleShelfChange}
              />
            ) : (
              <p className="no-found">No search found of "{text}"</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
