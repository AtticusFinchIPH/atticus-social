import { CHATTING_REQUEST } from "../constants/chatConstants";
import {
    CHATTING_OPEN, CHATTING_CLOSE  
} from "../constants/chatConstants";
import { joinChat, sendMessage } from "../socket";

const chattingRequest = (chattingUserInfo) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: CHATTING_OPEN, chattingUserInfo});
  dispatch({ type: CHATTING_REQUEST, chattingUserInfo});
  joinChat(chattingUserInfo.nickName, `${userInfo._id}_${chattingUserInfo._id}`);
}
  
const closeChat = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: CHATTING_CLOSE});
}

const sendChat = (msg) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  sendMessage(msg);
}

export { chattingRequest, closeChat, sendChat }