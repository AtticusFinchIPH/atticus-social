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
        if(listPost) {
            console.log(listPost);
            for(let post of listPost){
                if(post.photo?.data){
                    console.log(post.photo.data.data)
                    post.photo.data.data = bufferToBase64(post.photo.data.data)
                    console.log(post.photo.data.data)
                }
            }
        }
        if(personalPosts.error) {
            alert(personalPosts.error);
            personalPosts.error = null;
        }
    }, [personalPosts]);
    function bufferToBase64(buf) {
        var binstr = Array.prototype.map.call(buf, function (ch) {
            return String.fromCharCode(ch);
        }).join('');
        return btoa(binstr);
    }
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