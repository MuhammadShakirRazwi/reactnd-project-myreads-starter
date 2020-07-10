import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Search from "../components/Search";
import * as BooksAPI from '../BooksAPI';

const history = createBrowserHistory();

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    try {
      const books = await BooksAPI.getAll();
      this.setState({ books })
    } catch (error) {
      console.log(error, " error in getting all books");
    }
  }

  handleShelfChange = () => {
    this.getBooks();
  }

  render() {
    const { books } = this.state
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                books={books}
                handleShelfChange={this.handleShelfChange}
                {...props}
              />
            )}
          />
          <Route
            path="/search"
            render={props => (
              <Search
                books={books}
                handleShelfChange={this.handleShelfChange}
                {...props}
              />
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default Routes;