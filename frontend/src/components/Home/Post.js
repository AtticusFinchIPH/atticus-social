import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOwnPosts } from "../../actions/postActions";
import { NewPost, FormerPost } from "../Posts";

const Post = (props) => {
    const avatarColor = useSelector(state => state.avatarColor);
    const { color } = avatarColor;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const personalPosts = useSelector(state => state.personalPosts);
    let { loading, listPost, error } = personalPosts;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOwnPosts());
    }, []);
    useEffect(() => {
        if(personalPosts.error) {
            alert(personalPosts.error);
            personalPosts.error = null;
        }
    }, [personalPosts]);
    return (
        <>
            <NewPost avatarColor={color} userInfo={userInfo}/>
            {
                listPost.map(post =>                   
                    <FormerPost key={post.id} avatarColor={color} userInfo={userInfo} post={post}/>
                )
            }
        </>
    )
}

export default Post;