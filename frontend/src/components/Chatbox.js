import React from "react";
import { withStyles, makeStyles } from "@material-ui/styles";
import { AppBar, Paper, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MinimizeIcon from '@material-ui/icons/Minimize';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        zIndex: "9999",
        bottom: theme.spacing(0),
        right: theme.spacing(10),
        width: theme.spacing(40),
        height: theme.spacing(45),
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
    chatboxName: {
        maxWidth: theme.spacing(30),
        overflow: "hidden",
    },
    iconButton: {
        color: "#ffffff"
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

const Chatbox = () => {
    const classes = useStyles();
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
        </Paper>
        </>
    );
}

export default Chatbox;