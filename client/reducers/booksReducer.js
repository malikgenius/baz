import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
  CLEAR_ALL_PROFILES,
  GET_PAGINATION_PAGES,
  GET_DELETED_STOCKS
} from '../action/types';
const initialState = {
  book: null,
  books: null,
  deleted_book: null,
  loading: false
};

export default (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        // this will add more profiles to store when paginate to next, but when
        //come back to prev page it will still add :( more... find a solution of duplicate
        // profiles: state.profiles.concat(action.payload),
        books: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
