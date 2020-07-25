import React, { useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { Link, withRouter } from "react-router-dom";
import {useSelector} from "react-redux";
import { withStyles, makeStyles, useTheme } from "@material-ui/styles";
import { Tooltip } from "@material-ui/core";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff4081" };
  else return { color: "#ffffff" };
};

const drawerWidth = 240;

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
    ...theme.mixins.toolbar,
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorAcc, setAnchorAcc] = useState(null);
  const openAcc = Boolean(anchorAcc);
  const userLogin = useSelector(state => state.userLogin);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleAccount = (e) => {
    setAnchorAcc(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorAcc(null);
  };

  return (
    <>
    <CssBaseline />
    <AppBar position="fixed" className={
      clsx(
        classes.appBar,
        {
          [classes.appBarShift]: openDrawer,
        }
      )
    }>
      <ToolBar>
          <IconButton aria-label="open drawer" style={{color: "#ffffff"}}
          onClick={handleDrawerOpen}
          className={clsx(openDrawer && classes.hide)}>
            <MenuIcon />
          </IconButton> 
        <Typography variant="h5" color="inherit">
          Atticus's Social
        </Typography>
        <div className={classes.grow}/>
        <Link to='/'>
          <LightTooltip title="Home">
            <IconButton aria-label="Home" style={isActive(history, '/')}>
              <HomeIcon />
            </IconButton> 
          </LightTooltip>
        </Link>
        <Link to='/status'>
          <LightTooltip title="Status">
            <IconButton aria-label="Status" style={isActive(history, '/status')}>
              <FilterDramaIcon />
            </IconButton>
          </LightTooltip>
        </Link>
        <Link to='/blog'>
          <LightTooltip title="Blog">
            <IconButton aria-label="Blog" style={isActive(history, '/blog')}>
              <FingerprintIcon />
            </IconButton>
          </LightTooltip>
        </Link>
        {
          userLogin 
          ? 
          <>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccount}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
          </>
          :
          <Link to="/signin">
            <Button style={isActive(history, '/signin')}>
                Login
            </Button>
          </Link>
        }
      </ToolBar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={openDrawer}
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
      <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
        </List>
    </Drawer>
    </>
  );
});

export default NavBar;
