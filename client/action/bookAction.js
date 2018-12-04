import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  CLEAR_ALL_PROFILES,
  GET_PAGINATION_PAGES,
  SET_CURRENT_USER,
  GET_ERRORS_RESET,
  GET_DELETED_STOCKS
} from './types';
// import setAuthToken from '../utils/setAuthToken';

// Get All Profiles
export const getProfiles = () => dispatch => {
  //   dispatch(setProfileLoading());
  axios
    .get(`http://localhost:5000/api/book/all`, {
      //   params: { page }
    })
    .then(res => {
      //   console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
      // GET pagination will get all the extra pagination options to redux store
      // total records, page number, records per page .. etc from server.
      // this will go to Component local state via nextProps to <Pagination /> comp.
      //   dispatch({
      //     type: GET_PAGINATION_PAGES,
      //     payload: res.data
      //   });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
