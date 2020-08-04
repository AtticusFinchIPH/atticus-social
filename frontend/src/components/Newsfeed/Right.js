import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Divider, GridListTile, GridList, ListSubheader, ListItem, ListItemText, List, ListItemAvatar, Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { FixedSizeList } from "react-window";

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
  avatar: {
    width: theme.spacing(AVATAR_DIMENSION),
    height: theme.spacing(AVATAR_DIMENSION)
  },
}));

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
  const notFollowingUsers = useSelector(state => state.allUsers);
  const { listUser } = notFollowingUsers;
  console.log(notFollowingUsers)
  return (
    <Paper elevation={5} className={classes.paper}>
      <Grid container className={classes.container}>
        <Grid item className={classes.notFollowingUsers}>
          <GridList className={classes.gridList}>
            <GridListTile key="Subheader" cols={2} style={{ height: 'auto', marginTop: '8px' }}>
                <ListSubheader component="div">
                    <Typography component="p" variant="h6" color="primary">
                      People to follow
                    </Typography>
                </ListSubheader>
            </GridListTile>
            {/* {listUser.map((tile) => (
                <NotFollowingUser key={}/>
            ))} */}
          </GridList>
        </Grid>
        <Divider variant="middle" />
        <Grid item className={classes.followingUsers}>
          <List className={classes.gridList}>
              <ListSubheader component="div">
                  <Typography component="p" variant="h6" color="primary">
                    Following
                  </Typography>
              </ListSubheader>
              {listUser.map((tile) => (
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
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  )
};


export default Right;
