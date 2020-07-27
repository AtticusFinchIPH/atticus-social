import { FAVORITE_POST_REQUEST, FAVORITE_POST_SUCCESS, FAVORITE_POST_FAIL, 
        NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_FAIL } from "../constants/postConstants";

function favoritePostReducer(state = {}, action) {
    switch (action.type) {
      case FAVORITE_POST_REQUEST:
        return { loading: true };
      case FAVORITE_POST_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case FAVORITE_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  function newPostReducer(state = {}, action) {
    switch (action.type) {
      case NEW_POST_REQUEST:
        return { loading: true };
      case NEW_POST_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case NEW_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export { favoritePostReducer, newPostReducer };