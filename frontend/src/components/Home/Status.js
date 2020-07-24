import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors'
import { Paper, Typography, Grid, TextField, Avatar} from "@material-ui/core";

const AVATAR_DIMENSION = 5;

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatar: {
      width: theme.spacing(AVATAR_DIMENSION),
      height: theme.spacing(AVATAR_DIMENSION),
      margin: theme.spacing(1),
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    textField: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: '90%'
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

const statusPlaceholder = "Let's say \"Hi\"!";

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
                <TextField
                    placeholder={statusPlaceholder}
                    multiline
                    rows="3"
                    // value={values.text}
                    // onChange={handleChange('text')}
                    className={classes.textField}
                    margin="normal"
                />
            </form>
        </Paper>
    )
}

export default Status;