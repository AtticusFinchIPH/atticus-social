import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import clsx from "clsx";
import { CssBaseline, AppBar, Drawer, Toolbar, Button, IconButton, Divider, Tooltip, Typography,
        List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Hidden } from "@material-ui/core";
import { withStyles, makeStyles, useTheme } from "@material-ui/styles";
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { signout, enableUpdate } from "../actions/userActions";
import FollowTab from "./Newsfeed/Right";
import { switchDrawer } from "../actions/screenActions";

const isSignin = (history, styles) => {
  if(history.location.pathname === '/signin' || history.location.pathname === '/signup') return { display: 'none'}
  else return styles;
}

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff4081" };
  else return { color: "#ffffff" };
};

const drawerWidth = '100%';

const useStyle = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.Toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow:{
    flexGrow: 1,
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

const NavBar = withRouter(({history}) => {
  const classes = useStyle();
  const theme = useTheme();
  const [anchorAcc, setAnchorAcc] = useState(null);
  const openAcc = Boolean(anchorAcc);
  const isDrawerOpen = useSelector(state => state.isDrawerOpen);
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const historyLink = useHistory();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    dispatch(switchDrawer(true));
  };
  const handleDrawerClose = () => {
    dispatch(switchDrawer(false));
  };

  const handleAccount = (e) => {
    setAnchorAcc(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorAcc(null);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    historyLink.replace("/");
    dispatch(enableUpdate(true));
    setAnchorAcc(null);
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(signout());
    setAnchorAcc(null);
  }

  return (
    <>
    <CssBaseline />
    <AppBar position="fixed" className={
      clsx(
        classes.appBar,
        {
          [classes.appBarShift]: isDrawerOpen,
        }
      )
    }>
      <Toolbar>
        <Hidden smUp>
          <IconButton aria-label="open drawer" style={isSignin(history, {color: "#ffffff"})}
          onClick={handleDrawerOpen}
          className={clsx(isDrawerOpen && classes.hide)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden smUp>
          <Typography variant="h5" color="inherit">
            AS
          </Typography>
        </Hidden>
        <Hidden xsDown>
          <Typography variant="h5" color="inherit">
            Atticus's Social
          </Typography>
        </Hidden>
        <div className={classes.grow}/>
        <Link to='/'>
          <LightTooltip title="Home">
            <IconButton aria-label="Home" style={isSignin(history, isActive(history, '/'))}>
              <HomeIcon />
            </IconButton> 
          </LightTooltip>
        </Link>
        <Link to='/newsfeed'>
          <LightTooltip title="Newsfeed">
            <IconButton aria-label="Newsfeed" style={isSignin(history, isActive(history, '/newsfeed'))}>
              <DynamicFeedIcon />
            </IconButton>
          </LightTooltip>
        </Link>
        <Link to='/blog'>
          <LightTooltip title="Blog">
            <IconButton aria-label="Blog" style={isSignin(history, isActive(history, '/blog'))}>
              <FingerprintIcon />
            </IconButton>
          </LightTooltip>
        </Link>
        {
          userInfo 
          ? 
          <>
          <LightTooltip title={`${userInfo.firstName} ${userInfo.lastName}`}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAccount}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </LightTooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorAcc}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openAcc}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Setting</MenuItem>
            <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
          </>
          :
          <Link to="/signin">
            <Button style={isActive(history, '/signin')}>
                Login
            </Button>
          </Link>
        }
      </Toolbar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <FollowTab />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
    </>
  );
});

export default NavBar;
