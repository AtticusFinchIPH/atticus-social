import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { NewPost, FormerPost } from "../Posts";

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
  const avatarColor = useSelector(state => state.avatarColor);
  const { color } = avatarColor;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  return (
    <Container maxWidth='sm'>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <NewPost avatarColor={color} userInfo={userInfo}/>
        </Grid>
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </Container>
  )
};

export default Center;
