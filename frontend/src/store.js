import { createStore, combineReducers } from "redux";
import { userSigninReducer } from "./reducers/userReducer";

const initialState = {userLogin: false};

const reducer = combineReducers({
  userLogin: userSigninReducer
});

const store = createStore(reducer, initialState);

export default store;
