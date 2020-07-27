import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { userSigninReducer } from "./reducers/userReducer";
import { favoriteStatusReducer } from "./reducers/statusReducer";
import { favoriteStatus } from "./data";

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {userSignin: {userInfo}, favoriteStatus: favoriteStatus};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  favoriteStatus: favoriteStatusReducer,
});

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
