import { 
  CHATTING_OPEN, 
  CHATTING_CLOSE  
} from "../constants/chatConstants";

const openChat = (chattingUserInfo) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: CHATTING_OPEN, chattingUserInfo});
}
  
const closeChat = () => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: CHATTING_CLOSE});
}

export { openChat, closeChat }