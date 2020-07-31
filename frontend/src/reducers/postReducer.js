import { FAVORITE_POST_REQUEST, FAVORITE_POST_SUCCESS, FAVORITE_POST_FAIL, 
        NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_FAIL,
        GET_OWN_POSTS_REQUEST, 
        GET_OWN_POSTS_SUCCESS,
        GET_OWN_POSTS_FAIL } from "../constants/postConstants";

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

function personalPostsReducer(state = { listPost: []}, action) {
  switch (action.type) {
    
    case GET_OWN_POSTS_REQUEST:
      return {...state, loading: true};
    case GET_OWN_POSTS_SUCCESS:
      return {loading: false, listPost: action.payload};
    case GET_OWN_POSTS_FAIL:
      return {...state, loading: false, error: action.payload};

    case NEW_POST_REQUEST:
      state.listPost.unshift(action.payload);
      return {...state, loading: true};
    case NEW_POST_SUCCESS:
      state.listPost.shift();
      state.listPost.unshift(action.payload);
      return {...state, loading: false};
    case NEW_POST_FAIL:
      state.listPost.shift();
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export { favoritePostReducer, personalPostsReducer };