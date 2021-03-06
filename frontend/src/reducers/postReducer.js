import { FAVORITE_POST_REQUEST, FAVORITE_POST_SUCCESS, FAVORITE_POST_FAIL, 
        NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_FAIL,
        DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAIL,
        GET_OWN_POSTS_REQUEST, 
        GET_OWN_POSTS_SUCCESS,
        GET_OWN_POSTS_FAIL, 
        REACT_POST_REQUEST,
        REACT_POST_SUCCESS,
        REACT_POST_FAIL,
        GET_FAVORITE_POSTS_SUCCESS,
        GET_FAVORITE_POSTS_REQUEST,
        GET_FAVORITE_POSTS_FAIL,
        GET_NEWSFEED_REQUEST,
        GET_NEWSFEED_SUCCESS,
        GET_NEWSFEED_FAIL,
        ALTER_PERSONAL_POSTS,
        ALTER_NEWSFEED_POSTS} from "../constants/postConstants";

function favoritePostReducer(state = { favorites: []}, action) {
  switch (action.type) {
    case FAVORITE_POST_REQUEST:
    case GET_FAVORITE_POSTS_REQUEST:
      return {...state, loading: true };
    case FAVORITE_POST_SUCCESS:
    case GET_FAVORITE_POSTS_SUCCESS:
      return { loading: false, favorites: action.payload };
    case FAVORITE_POST_FAIL:
    case GET_FAVORITE_POSTS_FAIL:
      return {...state, loading: false, error: action.payload };
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

    case DELETE_POST_REQUEST:
      return {...state, loading: true};
    case DELETE_POST_SUCCESS:
      const removeIndex = state.listPost.findIndex(post => post._id === action.payload);
      state.listPost.splice(removeIndex, 1);
      return {...state, loading: false};
    case DELETE_POST_FAIL:
      console.log('fail')
      return {...state, loading: false};

    case REACT_POST_REQUEST:
      return {...state, loading: true};
    case REACT_POST_SUCCESS:
      return {...state, loading: false};
    case REACT_POST_FAIL:
      return {...state, loading: false, error: action.payload};
    
    case ALTER_PERSONAL_POSTS:
      return {...state, listPost: action.payload};

    default:
      return state;
  }
}

function newsfeedReducer(state = { newsfeed: []}, action) {
  switch (action.type) {
    case GET_NEWSFEED_REQUEST:
      return {...state, loading: true };
    case GET_NEWSFEED_SUCCESS:
      return { loading: false, newsfeed: action.payload };
    case GET_NEWSFEED_FAIL:
      return {...state, loading: false, error: action.payload };

    case ALTER_NEWSFEED_POSTS:
      return {...state, newsfeed: action.payload};

    default:
      return state;
  }
}


export { favoritePostReducer, personalPostsReducer, newsfeedReducer };