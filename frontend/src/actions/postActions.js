import axios from 'axios';
import { FAVORITE_POST_REQUEST, FAVORITE_POST_SUCCESS, FAVORITE_POST_FAIL, 
    NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_FAIL,
    GET_OWN_POSTS_REQUEST, 
    GET_OWN_POSTS_SUCCESS,
    GET_OWN_POSTS_FAIL,
    GET_NEWSFEED_SUCCESS,
    GET_NEWSFEED_FAIL,
    GET_NEWSFEED_REQUEST,
    REACT_POST_REQUEST,
    REACT_POST_SUCCESS,
    REACT_POST_FAIL,
    REACT_TYPE_LIKE,
    REACT_TYPE_COMMENT,
    GET_FAVORITE_POSTS_REQUEST,
    GET_FAVORITE_POSTS_FAIL,
    GET_FAVORITE_POSTS_SUCCESS,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
} from "../constants/postConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

const authConfig = (userInfo) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + userInfo.token,
        }
    }
}

const newPost = (text, photo) => async(dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        const newPost = {text, photo, likes: [], comments: [], postedBy: {firstName: userInfo.firstName, lastName: userInfo.lastName, nickName: userInfo.nickName}, created: 'Just Now'};
        dispatch({ type: NEW_POST_REQUEST, payload: newPost })
        const formData = new FormData();
        formData.append('text', text);
        formData.append('photo', photo);
        const { data } = await axios.post(
            `/api/posts`,
            formData,
            {
                headers: {
                  'Accept': 'application/json',
                  'content-type': 'multipart/form-data',
                  'Authorization': 'Bearer ' + userInfo.token,
                }
            }
        );
        dispatch({ type: NEW_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: NEW_POST_FAIL, payload:  error.response?.data?.msg || error.message });
        if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
    }
}

const getFavoritePosts = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: GET_FAVORITE_POSTS_REQUEST, payload: []});
        const { data } = await axios.get(
            '/api/posts/favorites',
            authConfig(userInfo)
        );
        dispatch({ type: GET_FAVORITE_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_FAVORITE_POSTS_FAIL, payload:  error.response?.data?.msg || error.message });
        if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
    }
}

const getOwnPosts = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: GET_OWN_POSTS_REQUEST, payload: []});
        const { data } = await axios.get(
            '/api/posts/own',
            authConfig(userInfo)
        );
        dispatch({ type: GET_OWN_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_OWN_POSTS_FAIL, payload:  error.response?.data?.msg || error.message });
        if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
    }
}

const getNewsFeed = () => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: GET_NEWSFEED_REQUEST, payload: []});
        const { data } = await axios.get(
            '/api/posts/newsfeed',
            authConfig(userInfo)
        );
        dispatch({ type: GET_NEWSFEED_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_NEWSFEED_FAIL, payload:  error.response?.data?.msg || error.message });
        if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
    }
}

const favoritePost = (favoriteValue, postId) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: FAVORITE_POST_REQUEST, payload: []});
        const { data } = await axios.put(
            '/api/posts/favorite',
            {favoriteValue, postId},
            authConfig(userInfo)
        );
        dispatch({ type: FAVORITE_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FAVORITE_POST_FAIL, payload:  error.response?.data?.msg || error.message });
        if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
    }
}

const reactPost = (actionType, actionValue, postId) => async(dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        const body = {};
        switch(actionType){
            case REACT_TYPE_LIKE:
            case REACT_TYPE_COMMENT:
                body = {actionType, actionValue, postId};
                break;
            default: throw 'Action Undefined';
        }
        dispatch({ type: REACT_POST_REQUEST, payload: []});
        const { data } = await axios.put(
            '/api/posts/react',
            body,
            authConfig(userInfo)
        );
        dispatch({ type: REACT_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REACT_POST_FAIL, payload:  error.response?.data?.msg || error.message });
        if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
    }
}

const deletePost = (postId) => async(dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        dispatch({ type: DELETE_POST_REQUEST, payload: postId });
        const response = await axios.delete(
            `/api/posts/${postId}`,
            authConfig(userInfo)
        );
        dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
    } catch (error) {
        dispatch({ type: DELETE_POST_FAIL, payload:  error.response?.data?.msg || error.message });
        if(error.response?.status === 401) dispatch({ type: USER_SIGNOUT });
    }
}

export { newPost, getFavoritePosts, getOwnPosts, getNewsFeed, favoritePost, reactPost, deletePost }