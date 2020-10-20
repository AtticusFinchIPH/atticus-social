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
  GET_ALL_USERS_REQUEST,
  GET_NOTFOLLOWING_REQUEST,
  GET_NOTFOLLOWING_FAIL,
  GET_NOTFOLLOWING_SUCCESS,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_FAIL,
  PUT_FOLLOW_REQUEST,
  PUT_FOLLOW_SUCCESS,
  PUT_FOLLOW_FAIL,
  PUT_UNFOLLOW_SUCCESS,
  PUT_UNFOLLOW_FAIL,
  USER_UPDATE_ENABLE,
  USER_UPDATE_DISABLE,
  CHECK_PROFILE_REQUEST,
  CHECK_PROFILE_FAIL,
  CHECK_PROFILE_SUCCESS
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
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
    case USER_UPDATE_ENABLE:
      return { loading: false, editable: true }
    case USER_UPDATE_DISABLE:
      return { loading: false, editable: false }
    case USER_UPDATE_REQUEST:
      return { loading: true, editable: false };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, editable: false };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, editable: false };
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

function notfollowingReducer(state = {notfollowings: []}, action) {
  switch (action.type) {
    case GET_NOTFOLLOWING_REQUEST:
      return {...state, loading: true };
    case GET_NOTFOLLOWING_SUCCESS:
      return { loading: false, notfollowings: action.payload };
    case GET_NOTFOLLOWING_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function followingReducer(state = {followings: []}, action) {
  switch (action.type) {
    case GET_FOLLOWING_REQUEST:
    case PUT_FOLLOW_REQUEST:
      return {...state, loading: true };
    case GET_FOLLOWING_SUCCESS:
    case PUT_FOLLOW_SUCCESS:
    case PUT_UNFOLLOW_SUCCESS:
      return { loading: false, followings: action.payload };
    case GET_FOLLOWING_FAIL:
    case PUT_FOLLOW_FAIL:
    case PUT_UNFOLLOW_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function profileCheckingReducer(state = {userInfo: {}, listPost: []}, action) {
  switch (action.type) {
    case CHECK_PROFILE_REQUEST:
      return {...state, loading: true };
    case CHECK_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.profile, listPost: action.listPost };
    case CHECK_PROFILE_FAIL:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }  
}

export { userSigninReducer, userUpdateReducer, allUsersReducer, notfollowingReducer, followingReducer, profileCheckingReducer };
