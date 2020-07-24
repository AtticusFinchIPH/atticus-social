import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#ffffff',
        '& > *': {
            margin: theme.spacing(3),
        },
    }
}));

const Favorites = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            
        </Paper>
    )
}

export default Favorites;