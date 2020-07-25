import { createStore, combineReducers } from "redux";
import { userSigninReducer } from "./reducers/userReducer";
import { favoriteStatusReducer } from "./reducers/statusReducer";
import { favoriteStatus } from "./data";

const initialState = {userLogin: false, favoriteStatus: favoriteStatus};

const reducer = combineReducers({
  userLogin: userSigninReducer,
  favoriteStatus: favoriteStatusReducer,
});

const store = createStore(reducer, initialState);

export default store;
