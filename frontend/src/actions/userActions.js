import axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_SIGNOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, GET_ALL_USERS_REQUEST, GET_ALL_USERS_FAIL, GET_ALL_USERS_SUCCESS, GET_NOTFOLLOWING_FAIL, GET_NOTFOLLOWING_SUCCESS, GET_FOLLOWING_REQUEST, GET_FOLLOWING_SUCCESS, GET_FOLLOWING_FAIL, GET_NOTFOLLOWING_REQUEST,
  PUT_FOLLOW_REQUEST,
  PUT_FOLLOW_SUCCESS,
  PUT_FOLLOW_FAIL,
} from "../constants/userConstants";

const authConfig = (userInfo) => {
  return {
      headers: {
          'Authorization': 'Bearer ' + userInfo.token,
      }
  }
}

const update = ({ userId, firstName, lastName, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, firstName, lastName, email, password } });
  try {
    const { data } = await axios.put("/api/users/" + userId,
      { firstName, lastName, email, password },
      authConfig(userInfo),
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response?.data?.msg || error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response?.data?.msg || error.message });
  }
}

const register = (firstName, lastName, email, password, isAdmin) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { firstName, lastName, email, password } });
  try {
    const { data } = await axios.post("/api/users/register", { firstName, lastName, email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.response?.data?.msg || error.message });
  }
}

const signout = () => (dispatch) => {
  dispatch({ type: USER_SIGNOUT })
}

const googleSignin = (data) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_SUCCESS, payload: data});
  Cookie.set('userInfo', JSON.stringify(data));
}

const getAllUsers = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: GET_ALL_USERS_REQUEST});
  try {
    const { data } = await axios.get("/api/users/",
      authConfig(userInfo),
    );
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error.response?.data?.msg || error.message });
  }
}

const getNotfollowings = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: GET_NOTFOLLOWING_REQUEST});
  try {
    const { data } = await axios.get("/api/users/notfollowing",
      authConfig(userInfo),
    );
    dispatch({ type: GET_NOTFOLLOWING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_NOTFOLLOWING_FAIL, payload: error.response?.data?.msg || error.message });
  }
}

const getFollowings = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: GET_FOLLOWING_REQUEST});
  try {
    const { data } = await axios.get("/api/users/following",
      authConfig(userInfo),
    );
    dispatch({ type: GET_FOLLOWING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_FOLLOWING_FAIL, payload: error.response?.data?.msg || error.message });
  }
}

const followRequest = (followingId) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  // dispatch({ type: PUT_FOLLOW_REQUEST});
  try {
    const { data } = await axios.put(
      "/api/users/follow",
      { followingId },
      authConfig(userInfo),
    );
    console.log(data)
    dispatch({ type: PUT_FOLLOW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: PUT_FOLLOW_FAIL, payload: error.response?.data?.msg || error.message });
    dispatch({ type: GET_NOTFOLLOWING_FAIL, payload: error.response?.data?.msg || error.message });
  }
}
export { signin, register, signout, update, googleSignin, getAllUsers, getNotfollowings, getFollowings, followRequest };