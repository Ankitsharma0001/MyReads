
/*  materials: Building with React Udacity, reactjs.org 
(component lifecycle)
*/

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './features/BooksShelf';
import Search from './features/BooksSearch';
import { Route, Link } from 'react-router-dom';

// here is the declaration

class BooksApp extends React.Component{
  state = {
     allBooks: [],
     searchedBooks: [],
     isLoading: true,
  }

 fetch(){
    BooksAPI.getAll().then( allBooks => {
      this.setState({
        allBooks,
        isLoading: false,
      })
    });
 }

// when the component is rendered, the fetch() function will run 
 
 componentDidMount() {
 	this.fetch();
 }

/*
  if user tries to search for books, it runs search in BooksAPI and after this,
  it checks for the allBooks found are present in shelf, if they are it makes sure that the shelf   
  assigned on the main page and on the search page are the same;
  .catch handles incorrect query and returns no result;
  
*/
  search = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query).then( searchedBooks => {
        let searchResult = [];
          for (const serachedBook of searchedBooks) {
            for (const book of this.state.allBooks) {
                if (serachedBook.id === book.id) {
                  serachedBook.shelf = book.shelf
                }
            }
            searchResult.push(serachedBook)
          }
          return searchResult
      }).then((searchedBooks) => {
        this.setState((prevState) => ({ searchedBooks }))
      }).catch(searchedBooks => this.setState({ searchedBooks: [] }))
    } else {
      this.setState({ searchedBooks: [] })
    }
  }
  

  //  it checks for the update for shelf selection;
   
  shelfUpdate = (addedbook, shelf) => {
    BooksAPI.update(addedbook, shelf).then( response => {
      addedbook.shelf = shelf
    })

    let addedBooks = this.state.allBooks.filter( book => book.id !== addedbook.id )
    addedBooks.push(addedbook);
    this.setState({ allBooks: addedBooks })
   	this.setState({ searchedBooks: [] })
    this.componentDidMount()
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () => (
          <div className="list-allBooks">
            <div className="list-allBooks-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-allBooks-content">
                <Shelf
                  allBooks={this.state.allBooks}
                  shelfUpdate={this.shelfUpdate}
                />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={ () => (
          <Search
            searchedBooks={this.state.searchedBooks}
            search={this.search}
            shelfUpdate={this.shelfUpdate}
          />
        )}
        />
        </div>
    )
  }
}

export default BooksApp
