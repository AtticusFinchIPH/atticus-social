import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { FormerPost } from "../Posts";

const Post = (props) => {
    const profileChecking = useSelector(state => state.profileChecking);
    const { userInfo, listPost } = profileChecking;
    return (
        <>
            {
                listPost && listPost.length > 0
                ?
                listPost.map((post, i) =>                   
                    <FormerPost key={i} post={post}/>
                )
                :
                <Typography variant="h5" component="h2" align='center'>{`${userInfo.nickName} haven't had any post yet.`}</Typography>
            }
        </>
    )
}

export default Post;