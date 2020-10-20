import Cookie from 'js-cookie';
import { CHATTING_REQUEST } from '../constants/chatConstants';
import {
    CHATTING_OPEN, CHATTING_CLOSE  
} from "../constants/chatConstants";

function chatReducer(state = {chattingUserInfo: null}, action) {
    switch (action.type) {
      case CHATTING_OPEN:
        return {loading: false, chattingUserInfo: action.chattingUserInfo };
      case CHATTING_REQUEST:
        return {loading: true, chattingUserInfo: action.chattingUserInfo  }
      case CHATTING_CLOSE:
        return {loading: false, chattingUserInfo: null};
      default:
        return state;
    }  
}

export {chatReducer};