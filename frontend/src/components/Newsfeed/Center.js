import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { NewPost, FormerPost } from "../Posts";
import { getNewsFeed } from "../../actions/postActions";
import { ALTER_NEWSFEED_POSTS } from "../../constants/postConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'fit-content',
    marginTop: theme.spacing(3),
    backgroundColor: '#565c6229',
    flexGrow: 1,
  },
}));

const Center = props => {
  const classes = useStyles();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const newsfeedPosts = useSelector(state => state.newsfeedPosts);
  const { newsfeed } = newsfeedPosts;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewsFeed());
  }, [])
  useEffect(() => {
    if(newsfeedPosts.error) {
        alert(newsfeedPosts.error);
        newsfeedPosts.error = null;
    }
  }, [newsfeedPosts]);
  const alterList = (futurePost) => {
    const index = newsfeed.findIndex(post => post._id === futurePost._id);
    newsfeed.splice(index, 1, futurePost);
    dispatch({type: ALTER_NEWSFEED_POSTS, payload: newsfeed});  
  }
  return (
    <Container maxWidth='sm'>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <NewPost userInfo={userInfo}/>
        </Grid>
        <Grid item xs={12}>
          {
            newsfeed.map((post, i) => <FormerPost key={i} post={post} alterList={alterList}/>)
          }
        </Grid>
      </Grid>
    </Container>
  )
};

export default Center;
