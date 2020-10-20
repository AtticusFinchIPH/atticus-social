import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, allUsersReducer, notfollowingReducer, followingReducer, userUpdateReducer, profileCheckingReducer } from "./reducers/userReducer";
import { favoritePostReducer, personalPostsReducer, newsfeedReducer } from "./reducers/postReducer";
import { chatReducer } from "./reducers/chatReducer";

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = { userSignin: {userInfo}, 
                      userUpdate: { editable: false},
                      profileChecking: { userInfo: {}, listPost: [] },
                      favoritePosts: { favorites: []}, 
                      personalPosts: { listPost: []},
                      newsfeedPosts: { newsfeed: []},
                      allUsers: { listUser: []},
                      notfollowingUsers: { notfollowings: []},
                      followingUsers: { followings: []},
                      chattingUserInfo: null,
                      };

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userUpdate: userUpdateReducer,
  profileChecking: profileCheckingReducer,
  favoritePosts: favoritePostReducer,
  personalPosts: personalPostsReducer,
  newsfeedPosts: newsfeedReducer,
  allUsers: allUsersReducer,
  notfollowingUsers: notfollowingReducer,
  followingUsers: followingReducer,
  chattingUser: chatReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
