import axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_SIGNOUT, 
  USER_UPDATE_ENABLE, USER_UPDATE_DISABLE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, 
  GET_ALL_USERS_REQUEST, GET_ALL_USERS_FAIL, GET_ALL_USERS_SUCCESS, 
  GET_NOTFOLLOWING_FAIL, GET_NOTFOLLOWING_SUCCESS, GET_FOLLOWING_REQUEST, GET_FOLLOWING_SUCCESS, GET_FOLLOWING_FAIL, GET_NOTFOLLOWING_REQUEST,
  PUT_FOLLOW_SUCCESS,
  PUT_FOLLOW_FAIL,
  PUT_UNFOLLOW_SUCCESS,
  PUT_UNFOLLOW_FAIL,
  CHECK_PROFILE_FAIL,
  CHECK_PROFILE_SUCCESS,
  CHECK_PROFILE_REQUEST,
} from "../constants/userConstants";
import {
  FAVORITE_POST_SUCCESS,
} from "../constants/postConstants";

const authConfig = (userInfo) => {
  return {
      headers: {
          'Authorization': 'Bearer ' + userInfo.token,
      }
  }
}

const enableUpdate = (isEnable) => (dispatch) => {
  if(isEnable) dispatch({ type: USER_UPDATE_ENABLE });
  else dispatch({ type: USER_UPDATE_DISABLE });
}

const updateCover = (nickName, description) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  const userId = userInfo._id;
  dispatch({ type: USER_UPDATE_REQUEST, payload: { nickName, description } });
  try {
    const { data } = await axios.put(`/api/users/${userId}`,
      { nickName, description },
      authConfig(userInfo),
    );
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response?.data?.msg || error.message });
    if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    const {_id, firstName, lastName, nickName, isAdmin, email: userEmail, token, description, favoritePosts} = data;
    const userInfo = {_id, firstName, lastName, nickName, isAdmin, userEmail, token, description};
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: userInfo });
    Cookie.set('userInfo', JSON.stringify(userInfo));
    dispatch({type: FAVORITE_POST_SUCCESS, payload: favoritePosts});
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
    if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
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
    if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
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
    if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
  }
}

const followRequest = (followingId) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await axios.put(
      "/api/users/follow",
      { followingId },
      authConfig(userInfo),
    );
    dispatch({ type: PUT_FOLLOW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PUT_FOLLOW_FAIL, payload: error.response?.data?.msg || error.message });
    if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
  }
}

const unfollowRequest = (unfollowingId) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await axios.put(
      "/api/users/unfollow",
      { unfollowingId },
      authConfig(userInfo),
    );
    dispatch({ type: PUT_UNFOLLOW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PUT_UNFOLLOW_FAIL, payload: error.response?.data?.msg || error.message });
    if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
  }
}

const checkProfileRequest = (followingId) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: CHECK_PROFILE_REQUEST});
  try {
    const { data } = await axios.get(
      `/api/users/profile/${followingId}`,
      authConfig(userInfo),
    );
    dispatch({ type: CHECK_PROFILE_SUCCESS, profile: data.user, listPost: data.posts});
  } catch (error) {
    dispatch({ type: CHECK_PROFILE_FAIL, payload: error.response?.data?.msg || error.message });
    if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
  }
}
export { signin, register, signout, enableUpdate, updateCover, googleSignin, getAllUsers, getNotfollowings, getFollowings, followRequest, unfollowRequest, checkProfileRequest };