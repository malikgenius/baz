// // pages/_app.js
import React from 'react';
import { createStore } from 'redux';
import axios from 'axios';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import configureStore from '../reducers';
import { getProfiles } from '../action/bookAction';
import { GET_PROFILES } from '../action/types';
import Page from '../components/Page';

// const reducer = (state = { foo: '' }, action) => {
//   switch (action.type) {
//     case 'FOO':
//       return { ...state, foo: action.payload };
//     default:
//       return state;
//   }
// };

// /**
//  * @param {object} initialState
//  * @param {boolean} options.isServer indicates whether it is a server side or client side
//  * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
//  * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
//  * @param {boolean} options.debug User-defined debug mode param
//  * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
//  */
// const makeStore = (initialState, options) => {
//   return createStore(reducer, initialState);
// };

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // we can dispatch from here too
    // let books = [];
    // const response = await axios.get(`http://localhost:5000/api/book/all`);
    // if (response && response.data) {
    //   books.push(response.data);
    // }
    // // console.log(books);
    // // return { books };
    // ctx.store.dispatch({ type: 'GET_PROFILES', payload: 'MYBOOKS' });

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Provider store={store}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(MyApp);

// NEXTJS PAGES SUGGESTION BUT NEXT-REDUX-WRAPPER is more famous..

// import App, { Container } from 'next/app';
// import React from 'react';
// import withReduxStore from '../lib/with-redux-store';
// import { Provider } from 'react-redux';

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, reduxStore } = this.props;
//     return (
//       <Container>
//         <Provider store={reduxStore}>
//           <Component {...pageProps} />
//         </Provider>
//       </Container>
//     );
//   }
// }

// export default withReduxStore(MyApp);
