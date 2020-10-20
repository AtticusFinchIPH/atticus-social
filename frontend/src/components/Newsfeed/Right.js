import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";
import { deepOrange, lightBlue, deepPurple, yellow } from '@material-ui/core/colors'
import { Grid, Paper, Typography, Divider, GridListTile, GridList, ListItem, ListItemText, List, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Tooltip, GridListTileBar } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import InfoIcon from '@material-ui/icons/Info';
import StarBorderIcon  from '@material-ui/icons/StarBorder';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { withStyles } from "@material-ui/styles";
import { getNotfollowings, getFollowings, followRequest, unfollowRequest } from "../../actions/userActions";
import { chattingRequest } from "../../actions/chatActions";
import { getCharacterColor } from "../../util";
import { Link } from "react-router-dom";

const AVATAR_DIMENSION = 5;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    top: theme.spacing(10),
    right: 0,
    height: "100%",
    width: theme.spacing(45),
    flexGrow: 1,
  },
  container: {
    flexDirection: "column",
    height: "100%",
  },
  notFollowingUsers: {
    height: "40%",
  },
  followingUsers: {
    height: "50%",
  },
  header: {
    padding: "16px 16px 0 16px",
  },
  list: {
    overflow: "auto",
    maxHeight: "85%",
  },
  avatar: {
    width: theme.spacing(AVATAR_DIMENSION),
    height: theme.spacing(AVATAR_DIMENSION)
  },
  wrapGridList:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: theme.spacing(2),
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  starBorderIcon: {
    color: yellow[500],
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
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

const RowRender = ({ index, style }) => {
  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  )
}

const Right = props => {
  const classes = useStyles();
  const notfollowingUsers = useSelector(state => state.notfollowingUsers);
  const { notfollowings } = notfollowingUsers;
  const followingUsers = useSelector(state => state.followingUsers);
  const { followings } = followingUsers;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotfollowings());
    dispatch(getFollowings());
  }, [])
  const follow = async (followingId) => {
    await dispatch(followRequest(followingId));
    dispatch(getNotfollowings());
  }
  const unfollow = async (unfollowingId) => {
    await dispatch(unfollowRequest(unfollowingId));
    dispatch(getNotfollowings());
  }
  const openChatbox = (chattingUser) => {
    dispatch(chattingRequest(chattingUser));
  }
  return (
    <Paper elevation={5} className={classes.paper}>
      <Grid container className={classes.container}>
        <Grid item className={classes.notFollowingUsers}>
          <Typography component="p" variant="h6" color="primary" className={classes.header}>
            People to Follow
          </Typography>
          <div className={classes.wrapGridList} >
          <GridList className={classes.gridList} cols={1} >
            {notfollowings.map((tile) => (
              <GridListTile key={tile._id}>
                <img src="https://source.unsplash.com/random" alt={tile._id} />
                <GridListTileBar
                    title={tile.nickName}
                    subtitle={<span>Description</span>}
                    actionIcon={
                      <>
                      <LightTooltip title="See Profile">
                        <Link to={`/profile/${tile._id}`}>
                          <IconButton aria-label={`See profile ${tile._id}`}>
                            <InfoIcon className={classes.starBorderIcon} />
                          </IconButton>
                        </Link>
                      </LightTooltip>
                      <LightTooltip title="Follow">
                        <IconButton onClick={(e) => follow(tile._id)} aria-label={`Follow ${tile._id}`}>
                          <StarBorderIcon fontSize="large" className={classes.starBorderIcon} />
                        </IconButton>
                      </LightTooltip>
                      </>
                    }
                />
              </GridListTile>
            ))}
          </GridList>
          </div>
        </Grid>
        <Divider variant="middle" />
        <Grid item className={classes.followingUsers}>
          <Typography component="p" variant="h6" color="primary" className={classes.header}>
            Following
          </Typography>
          <List className={classes.list}>
              {followings.map((tile) => (
                <ListItem key={`item-${tile._id}`} button >
                  <Link to={`/profile/${tile._id}`}>
                    <ListItemAvatar>
                      {/* <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`/static/images/avatar/${value + 1}.jpg`}
                      /> */}
                      <Avatar className={clsx(classes.avatar, classes[getCharacterColor(tile.nickName.charAt(0))])}>
                        <Typography component="h6" variant="h6" color="inherit">
                          {tile.nickName.charAt(0).toUpperCase()}
                        </Typography>
                      </Avatar>
                    </ListItemAvatar>
                  </Link>
                  <ListItemText primary={tile.nickName} />
                  <ListItemSecondaryAction>  
                    <LightTooltip title="Unfollow">
                      <IconButton onClick={(e) => unfollow(tile._id)} edge="end" aria-label="unfollow">
                        <PersonAddDisabledIcon color="primary" />
                      </IconButton>   
                    </LightTooltip> 
                    <LightTooltip title="Message">
                      <IconButton onClick={(e) => openChatbox(tile)} edge="end" aria-label="message">
                        <CommentIcon color="primary"/>
                      </IconButton>
                    </LightTooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
};


export default Right;
