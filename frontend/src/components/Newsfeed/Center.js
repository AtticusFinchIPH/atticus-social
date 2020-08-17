import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { NewPost, FormerPost } from "../Posts";
import { getNewsFeed } from "../../actions/postActions";

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
  const { loading, newsfeed, error } = newsfeedPosts;
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
  return (
    <Container maxWidth='sm'>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <NewPost userInfo={userInfo}/>
        </Grid>
        <Grid item xs={12}>
          {
            newsfeed.map((post, i) =>                   
              <FormerPost key={i} userInfo={userInfo} post={post}/>
            )
          }
        </Grid>
      </Grid>
    </Container>
  )
};

export default Center;
