import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#ffffff',
        marginRight: theme.spacing(2),
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(2),
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const Favorites = () => {
    const classes = useStyles();
    const favoritePost = useSelector(state => state.favoritePost);
    return (
        <Paper className={classes.paper}>
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Favorite Post</ListSubheader>
                    </GridListTile>
                    {favoritePost.map((tile) => (
                        <GridListTile key={tile.id}>
                            <img src={tile.image} alt={tile.text} />
                            <GridListTileBar
                                title={tile.text}
                                subtitle={<span>by: {tile.author}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about ${tile.text}`} className={classes.icon}>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </Paper>
    )
}

export default Favorites;