import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ALTER_PROFILE_POSTS } from "../../constants/userConstants";
import { FormerPost } from "../Posts";

const Post = (props) => {
    const profileChecking = useSelector(state => state.profileChecking);
    const { userInfo, listPost } = profileChecking;
    const dispatch = useDispatch();
    const alterList = (futurePost) => {
        const index = listPost.findIndex(post => post._id === futurePost._id);
        listPost.splice(index, 1, futurePost);
        dispatch({type: ALTER_PROFILE_POSTS, payload: listPost});
    }
    return (
        <>
            {
                listPost && listPost.length > 0
                ?
                listPost.map((post, i) =>                   
                    <FormerPost key={i} post={post} alterList={alterList}/>
                )
                :
                <Typography variant="h5" component="h2" align='center'>{`${userInfo.nickName} haven't had any post yet.`}</Typography>
            }
        </>
    )
}

export default Post;