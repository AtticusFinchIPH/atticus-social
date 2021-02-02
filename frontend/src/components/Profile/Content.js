import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Post from "./Post";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'fit-content',
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
                <Grid item xs={12} md={12}>
                    <Post />
                </Grid>
            </Grid>
        </div>
    )
}

export default Content;