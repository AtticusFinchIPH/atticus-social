import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer, allUsersReducer, notfollowingReducer, followingReducer } from "./reducers/userReducer";
import { favoritePostReducer, personalPostsReducer, newsfeedReducer } from "./reducers/postReducer";

const userInfo = Cookie.getJSON('userInfo') || null;
const randomColor = () => {
  let picker = Math.floor(Math.random() * 3);
  return picker === 0 ? "orange" : picker === 1 ? "blue" : "purple";
}
const color = randomColor();

function avatarReducer(state = {color}, action) {
  return state;
}

const initialState = { userSignin: {userInfo}, 
                      favoritePosts: { favorites: []}, 
                      personalPosts: { listPost: []},
                      newsfeedPosts: { newsfeed: []},
                      allUsers: { listUser: []},
                      notfollowingUsers: { notfollowings: []},
                      followingUsers: { followings: []},
                      };

const reducer = combineReducers({
  userSignin: userSigninReducer,
  favoritePosts: favoritePostReducer,
  avatarColor: avatarReducer,
  personalPosts: personalPostsReducer,
  newsfeedPosts: newsfeedReducer,
  allUsers: allUsersReducer,
  notfollowingUsers: notfollowingReducer,
  followingUsers: followingReducer,
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
