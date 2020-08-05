import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";
import { deepOrange, lightBlue, deepPurple, yellow } from '@material-ui/core/colors'
import { Grid, Paper, Typography, Divider, GridListTile, GridList, ListSubheader, ListItem, ListItemText, List, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, Tooltip, GridListTileBar } from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import CommentIcon from "@material-ui/icons/Comment";
import InfoIcon from '@material-ui/icons/Info';
import StarBorderIcon  from '@material-ui/icons/StarBorder';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { withStyles, useTheme } from "@material-ui/styles";
import { getNotfollowings, getFollowings } from "../../actions/userActions";

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
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

const NotFollowingUser = props => {
  const classes = useStyles();
  return (
    <Paper>

    </Paper>
  )
}

const FollowingUser = props => {
  const classes = useStyles();

  return (
    <Paper>

    </Paper>
  )
}

const RowRender = ({ index, style }) => {
  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  )
}

const Right = props => {
  const classes = useStyles();
  const theme = useTheme();
  const notfollowingUsers = useSelector(state => state.notfollowingUsers);
  const { notfollowings } = notfollowingUsers;
  const followingUsers = useSelector(state => state.followingUsers);
  const { followings } = followingUsers;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotfollowings());
    dispatch(getFollowings());
  }, [])
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
                <img src="https://source.unsplash.com/random" alt={tile.text} />
                <GridListTileBar
                    title={tile.firstName +" "+ tile.lastName}
                    subtitle={<span>Description</span>}
                    actionIcon={
                      <>
                      <LightTooltip title="See Profile">
                        <IconButton aria-label={`See profile ${tile._id}`}>
                          <InfoIcon className={classes.starBorderIcon} />
                        </IconButton>
                      </LightTooltip>
                      <LightTooltip title="Follow">
                        <IconButton aria-label={`Follow ${tile._id}`}>
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
                <ListItem key={`item-${tile._id}`} button>
                  <ListItemAvatar>
                    {/* <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    /> */}
                    <Avatar className={classes.avatar}>
                      <Typography component="h6" variant="h6" color="inherit">
                        {tile.firstName.charAt(0).toUpperCase()}
                      </Typography>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={tile.firstName +" "+ tile.lastName} />
                  <ListItemSecondaryAction>  
                    <LightTooltip title="Unfollow">
                      <IconButton edge="end" aria-label="unfollow">
                        <PersonAddDisabledIcon color="primary" />
                      </IconButton>   
                    </LightTooltip> 
                    <LightTooltip title="Message">
                      <IconButton edge="end" aria-label="message">
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