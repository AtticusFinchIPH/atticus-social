import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#ffffff',
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(2),
        },
        [theme.breakpoints.up('sm')]: {
            marginRight: theme.spacing(2),
        },
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    gridList: {
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const Favorites = () => {
    const classes = useStyles();
    const favoritePosts = useSelector(state => state.favoritePosts);
    const {favorites} = favoritePosts;
    console.log(favorites)
    return (
        <Paper className={classes.paper}>
            <div className={classes.root}>
                <Typography component="p" variant="h6" color="secondary">
                    Your Favorites
                </Typography>
                {favorites.length > 0
                ?
                <GridList cellHeight={180} className={classes.gridList}>
                    {favorites.map((tile) => (
                        <GridListTile key={tile._id}>
                            <img src={tile.photo || "https://source.unsplash.com/random"} alt={tile.text} />
                            <GridListTileBar
                                title={tile.postedBy.nickName}
                                subtitle={tile.text}
                                actionIcon={
                                    <IconButton aria-label={`info about ${tile.text}`} className={classes.icon}>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))
                    }
                </GridList>
                :
                <Typography component="p" variant="body1" style={{paddingBottom: '18px'}} >
                    You haven't had any favorite posts yet
                </Typography>
                }
            </div>
        </Paper>
    )
}

export default Favorites;