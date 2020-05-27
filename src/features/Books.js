import React from 'react';
import Selector from './BooksSelector';
import green from '../icons/green.jpg';

class Book extends React.Component {
  render() {
	

  //  the constant author and image is used to check whether searchs wors properly or not
   
    const { book } = this.props;
    const image = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : green;
    const author = book.authors ? book.authors : "Unknown";
    return (

        <div className="book">
          <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
            <Selector
              shelfUpdate={this.props.shelfUpdate}
              book={ book }
              allBooks={ this.props.allBooks }
              selectorCheck={this.props.selectorCheck}
          />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{author}</div>
        </div>
    
    )
  }
}

export default Book