import React from 'react';
import Book from './Books';
import { Link } from 'react-router-dom';

//  it is used to return the matched results if any for the search function 

class Search extends React.Component {
  render() {
      
    const { search } = this.props;
    return (
   
       <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={ event => search(event.target.value)}
              type="text"
              placeholder="Search by title or author"/>
          </div>
        </div>
        
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchedBooks.length > 0 ? (
              this.props.searchedBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={ book }
                  shelfUpdate={this.props.shelfUpdate}
                />
              </li>
          ))) : <li></li> }
          </ol>
        </div>
       </div>

    )
  }
}

export default Search
