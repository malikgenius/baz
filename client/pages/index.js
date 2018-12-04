import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getProfiles } from '../action/bookAction';
import BookItem from '../components/BookItem';
import { GET_PROFILES } from '../action/types';

class Index extends React.Component {
  state = {};
  // below is server side static getInitialProps which will go away when client loeads, so do your shit in client its only to configure the redux store for you ..
  static async getInitialProps({ store, isServer, pathname, query }) {
    // const isServer = !!req
    // console.log(store, isServer, pathname, query);
    // let books = [];
    // const response = await axios.get(`http://localhost:5000/api/book/all`);
    // if (response && response.data) {
    //   books.push(response.data);
    // }
    // // console.log(books);
    return {};
  }

  componentDidMount = async () => {
    const { dispatch } = this.props;
    this.props.getProfiles();
    // console.log(dispatch);
    // this.timer = startClock(dispatch);
  };
  componentWillReceiveProps = nextProps => {
    // console.log(nextProps.books.books);
  };

  render() {
    const { books } = this.props.books;
    console.log(this.props);

    // let profileItems;
    // if (books === null) {
    //   profileItems = <div>loading ... </div>;
    // } else {
    //   if (books.length > 0) {
    //     profileItems = books.map(profile => {
    //       <div>{profile.title}</div>;
    //     });
    //   } else {
    //     profileItems = <h4>No Books Found!</h4>;
    //   }
    // }

    return (
      <div>
        {books === null ? '' : <BookItem books={books} />}
        <div>Prop from Redux {this.props.foo}</div>
        <div>Prop from getInitialProps {this.props.custom}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    books: state.books
  };
};
export default connect(
  mapStateToProps,
  { getProfiles }
)(Index);
