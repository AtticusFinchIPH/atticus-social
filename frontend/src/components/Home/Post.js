import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOwnPosts, getFavoritePosts } from "../../actions/postActions";
import { NewPost, FormerPost } from "../Posts";
import { ALTER_PERSONAL_POSTS } from '../../constants/postConstants';

const Post = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const personalPosts = useSelector(state => state.personalPosts);
    let { listPost } = personalPosts;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOwnPosts());
        dispatch(getFavoritePosts());
    }, []);
    useEffect(() => {
        if(personalPosts.error) {
            alert(personalPosts.error);
            personalPosts.error = null;
        }
    }, [personalPosts]);
    const alterList = (futurePost) => {
        const index = listPost.findIndex(post => post._id === futurePost._id);
        listPost.splice(index, 1, futurePost);
        dispatch({type: ALTER_PERSONAL_POSTS, payload: listPost});
    }
    return (
        <>
            <NewPost userInfo={userInfo}/>
            {
                listPost.map((post, i) =>                   
                    <FormerPost key={i} post={post} alterList={alterList}/>
                )
            }
        </>
    )
}

export default Post;