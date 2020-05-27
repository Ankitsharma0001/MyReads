import React from 'react';
import Book from './Books';

class Shelf extends React.Component {
  

  render() {
    const { allBooks } = this.props;
    const currentlyReading = allBooks.filter( book => book.shelf === "currentlyReading");
    const wantToRead = allBooks.filter(book => book.shelf === "wantToRead");
    const read = allBooks.filter(book => book.shelf === "read");

    return (

      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {currentlyReading.map( book => (
                <li key={book.id}>
                  <Book
                    books={ this.props.books }
                    book={ book }
                    shelfUpdate={this.props.shelfUpdate}
                  />
                </li>
              ))
              }
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {wantToRead.map( book => (
                <li key={book.id}>
                  <Book
                    allBooks={ this.props.allBooks }
                    book={ book }
                    shelfUpdate={this.props.shelfUpdate}
                  />
                </li>
              ))
              }
            </ol>
          </div>
        </div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {read.map( book => (
                <li key={book.id}>
                  <Book
                    allBooks={ this.props.allBooks }
                    book={ book }
                    shelfUpdate={this.props.shelfUpdate}
                  />
                </li>
              ))
              }
            </ol>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Shelf
