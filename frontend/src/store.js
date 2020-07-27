import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer } from "./reducers/userReducer";
import { favoritePostReducer } from "./reducers/postReducer";
import { favoritePost } from "./data";

const userInfo = Cookie.getJSON('userInfo') || null;
const randomColor = () => {
  let picker = Math.floor(Math.random() * 3);
  return picker === 0 ? "orange" : picker === 1 ? "blue" : "purple";
}
const color = randomColor();

function avatarReducer(state = {color}, action) {
  return state;
}

const initialState = { userSignin: {userInfo}, favoritePost };

const reducer = combineReducers({
  userSignin: userSigninReducer,
  favoritePost: favoritePostReducer,
  avatarColor: avatarReducer
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
