import React, { Component } from 'react';
import { Link } from 'next/link';
import { connect } from 'react-redux';
// import { getProfileById } from '../../actions/profileAction';

export default class BookItem extends Component {
  // onStockClick = id => {
  //   this.props.getProfileById(id);
  // };
  render() {
    const { books } = this.props;
    // console.log(this.props.books);
    const Books = books.map(book => (
      <div>
        <div>
          <p>
            {book.author.map(boo => (
              <div className="container">
                <div className="row">
                  <div className="col col-4">
                    {boo.name} '' {boo.email}
                  </div>
                </div>
              </div>
            ))}
          </p>
        </div>
        <p>{book.subtitle}</p>
      </div>
    ));

    return (
      <div className="container">
        {Books}
        {/* <h4 className="mb-4">Experience Credentials</h4> */}
        {/* <div className=" d-md-none">{stockSmall}</div> */}
        {/* <div>{stockSmall}</div> */}
      </div>
    );
  }
}

// export default BookItem;
