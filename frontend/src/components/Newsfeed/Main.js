import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden, Container } from "@material-ui/core";
import Left from './Left';
import Right from './Right';
import Center from './Center';
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/userActions";
import { FormerPost } from "../Posts";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(10),
    },
}));

const NewsFeedMain = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [])
  return (
    <>
        <Grid container className={classes.container}>
            <Grid item xs={12} md={8} lg={12}>
                <Center render={(post,i) => (
                  <FormerPost key={i} post={post}/>
                )}/>
            </Grid>
            <Grid item xs={12}></Grid>
        </Grid>
        <Hidden smDown>
            <Right />
        </Hidden>
    </>
  )
};

export default NewsFeedMain;
