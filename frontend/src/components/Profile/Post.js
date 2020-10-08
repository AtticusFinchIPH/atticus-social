import React from "react";
import { useSelector } from "react-redux";
import { FormerPost } from "../Posts";

const Post = (props) => {
    const profileChecking = useSelector(state => state.profileChecking);
    const { userInfo, listPost } = profileChecking;
    return (
        <>
            {
                listPost.map((post, i) =>                   
                    <FormerPost key={i} userInfo={userInfo} post={post}/>
                )
            }
        </>
    )
}

export default Post;