import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid, TextField} from "@material-ui/core";
import Status from "./Status";
import Favorites from "./Favorites";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        marginTop: theme.spacing(5),
        backgroundColor: '#565c6229',
        flexGrow: 1,
    },
}));

const Content = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Status avatarColor={props.avatarColor}/>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Favorites/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Content;