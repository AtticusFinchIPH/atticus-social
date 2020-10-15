import React from "react";
import clsx from "clsx";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors'
import { withStyles, makeStyles } from "@material-ui/styles";
import { AppBar, Paper, Toolbar, IconButton, Tooltip, Avatar, TextField, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MinimizeIcon from '@material-ui/icons/Minimize';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from "react-redux";
import { getCharacterColor } from "../util";

const AVATAR_S_DIMENSION = 4;

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        zIndex: "9999",
        bottom: theme.spacing(0),
        right: theme.spacing(10),
        width: theme.spacing(40),
    },
    appbar: {
        height: theme.spacing(6),
    },
    toolbar: {
        minHeight: "fit-content",
        height: theme.spacing(6),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    chatSection: {
        height: theme.spacing(35),
        overflowY: "scroll",
    },
    chatMaker: {
        height: theme.spacing(6),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    chatboxName: {
        maxWidth: theme.spacing(30),
        overflow: "hidden",
    },
    iconButton: {
        color: "#ffffff"
    },
    avatarSmall: {
        width: theme.spacing(AVATAR_S_DIMENSION),
        height: theme.spacing(AVATAR_S_DIMENSION),
        margin: theme.spacing(1),
    },
    textField: {
        width: "90%",
        marginRight: theme.spacing(2),
    },
    grow:{
      flexGrow: 1,
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

const Chatbox = () => {
    const classes = useStyles();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    return (
        <>
        <Paper className={classes.root} elevation={3} >
            <AppBar position="static" className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.chatboxName}>
                        <Typography>Chatbox</Typography>
                    </div>
                    <div className={classes.grow}/>
                    <Tooltip title="Minimize">
                        <IconButton aria-label="Minimize" className={classes.iconButton}>
                            <MinimizeIcon />
                        </IconButton> 
                    </Tooltip>
                    <LightTooltip title="Close">
                        <IconButton aria-label="Close" className={classes.iconButton}>
                            <CloseIcon />
                        </IconButton> 
                    </LightTooltip>
                </Toolbar>
            </AppBar>
            <div className={classes.chatSection}>

            </div>
            <Divider width="100%"/>
            <div className={classes.chatMaker}>
                <Avatar className={clsx( classes.avatarSmall, classes[getCharacterColor(userInfo.firstName.charAt(0))])}>
                    <Typography component="h6" variant="h6" color="inherit">H
                        {/* {userInfo.firstName.charAt(0).toUpperCase()} */}
                    </Typography>
                </Avatar>
                <TextField
                    size="samll"
                    // variant="outlined"
                    // value={curComment}
                    // onChange={(e) => setCurComment(e.target.value)}
                    // onKeyDown={submitComment}
                    className={classes.textField}
                    margin="normal"
                />
            </div>
        </Paper>
        </>
    );
}

export default Chatbox;