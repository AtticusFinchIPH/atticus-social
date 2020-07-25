import { FAVORITE_STATUS_REQUEST, FAVORITE_STATUS_SUCCESS, FAVORITE_STATUS_FAIL } from "../constants/statusConstants";

function favoriteStatusReducer(state = {}, action) {
    switch (action.type) {
      case FAVORITE_STATUS_REQUEST:
        return { loading: true };
      case FAVORITE_STATUS_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case FAVORITE_STATUS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }

  export { favoriteStatusReducer };