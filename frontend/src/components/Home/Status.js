import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors'
import { Paper, Typography, Grid, TextField, Avatar} from "@material-ui/core";

const AVATAR_DIMENSION = 5;

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
    },
    avatar: {
      width: theme.spacing(AVATAR_DIMENSION),
      height: theme.spacing(AVATAR_DIMENSION)
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
    paper: {
        backgroundColor: '#ffffff',
        '& > *': {
            margin: theme.spacing(3),
        },
    }
}));

const statusLabel = "Let's say \"Hi\"!";

const Status = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
                <Avatar className={clsx( classes.avatar, classes[props.avatarColor])}>
                    <Typography component="h7" variant="h7" color="inherit">
                        A
                    </Typography>
                </Avatar>
                <TextField id="status" label={statusLabel} />
            </form>
        </Paper>
    )
}

export default Status;