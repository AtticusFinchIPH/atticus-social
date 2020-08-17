import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOwnPosts, getFavoritePosts } from "../../actions/postActions";
import { NewPost, FormerPost } from "../Posts";

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
    return (
        <>
            <NewPost userInfo={userInfo}/>
            {
                listPost.map((post, i) =>                   
                    <FormerPost key={i} userInfo={userInfo} post={post}/>
                )
            }
        </>
    )
}

export default Post;