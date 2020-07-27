import axios from 'axios';
import { FAVORITE_POST_REQUEST, FAVORITE_POST_SUCCESS, FAVORITE_POST_FAIL, 
    NEW_POST_REQUEST, NEW_POST_SUCCESS, NEW_POST_FAIL } from "../constants/postConstants";

const newPost = ({text, photo}) => async(dispatch) => {
    try {
        const newPost = {text, photo};
        dispatch({ type: NEW_POST_REQUEST, payload: newPost })
        const formData = new FormData();
        formData.append('text', text);
        formData.append('photo', photo);
        const { data } = await axios.post(
            `/api/posts`,
            formData,
            {
                headers: {
                  'content-type': 'multipart/form-data'
                }
            }
        );
        dispatch({ type: NEW_POST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: NEW_POST_FAIL, payload: error.message });
    }
}

export { newPost }