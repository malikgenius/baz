import React, { Component } from 'react';
// import Header from '../components/Header';
import Meta from './Meta';
// import Search from './Search';

class Page extends Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <Meta />

        <div className="container mt-4">{this.props.children}</div>
      </div>
    );
  }
}

export default Page;
