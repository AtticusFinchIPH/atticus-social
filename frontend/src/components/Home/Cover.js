import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar, Typography} from "@material-ui/core";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors'

const AVATAR_DIMENSION = 20;

const useStyles = makeStyles((theme) => ({
  mainCover: {
    position: 'relative',
    marginTop: theme.spacing(10),
    color: theme.palette.common.white,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainCoverContent: {
    position: 'static',
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(10),
      paddingBottm: theme.spacing(0)
    }
  },
  avatar: {
    width: theme.spacing(AVATAR_DIMENSION),
    height: theme.spacing(AVATAR_DIMENSION)
  },
  text: {
    paddingTop: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  blue: {
    color: theme.palette.getContrastText(lightBlue[500]),
    backgroundColor: lightBlue[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));

const Cover = (props) => {
  const classes = useStyles();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  return (
    <Paper className={classes.mainCover}>
        <div className={classes.mainCoverContent}>
            <Avatar className={clsx( classes.avatar, classes[props.avatarColor])}>
                <Typography component="h1" variant="h3" color="inherit">
                  {userInfo.firstName.charAt(0).toUpperCase()}
                </Typography>
            </Avatar>
            <Typography className={classes.text} component="h1" variant="h3" color="inherit">
              {`${userInfo.firstName} ${userInfo.lastName}`}
            </Typography>
            <Typography className={classes.text} variant="h5" color="inherit" paragraph>
                Description
            </Typography>
        </div>
    </Paper>
  )
};

export default Cover;
