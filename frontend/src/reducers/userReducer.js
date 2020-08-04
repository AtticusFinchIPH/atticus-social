import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      Cookie.remove("userInfo");
      return {};
    default:
      return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function allUsersReducer(state = {listUser: []}, action) {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {...state, loading: true };
    case GET_ALL_USERS_SUCCESS:
      return { loading: false, listUser: action.payload };
    case GET_ALL_USERS_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export { userSigninReducer, userUpdateReducer, allUsersReducer };
