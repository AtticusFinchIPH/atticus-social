import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors'
import { 
    Paper, Typography, TextField, Avatar, Button, IconButton, Tooltip, Divider, CardHeader, Hidden, Menu, MenuItem,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { newPost, reactPost, favoritePost, deletePost } from "../actions/postActions";
import { REACT_TYPE_LIKE, REACT_TYPE_COMMENT } from "../constants/postConstants";
import { getCharacterColor } from "../util";
import { Link } from "react-router-dom";

const AVATAR_DIMENSION = 5;
const AVATAR_S_DIMENSION = 4;

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: '#ffffff',
        margin: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: theme.spacing(1),
        }
    },
    avatar: {
        width: theme.spacing(AVATAR_DIMENSION),
        height: theme.spacing(AVATAR_DIMENSION),
        margin: theme.spacing(1),
    },
    avatarSmall: {
        width: theme.spacing(AVATAR_S_DIMENSION),
        height: theme.spacing(AVATAR_S_DIMENSION),
        margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '100%'
    },
    img: {
        width: '100%',
    },
    photoInput: {
        display: 'none',
    },
    photoButton: {
        height: theme.spacing(5),
        marginBottom: 5
    },
    cardHeader: {
        width: "100%",
        paddingTop: 0,
        paddingLeft: 0,
    },
    commentPaper: {
        padding: theme.spacing(1),
    },
    grow: {
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

const POST_PLACEHOLDER = "Let's say \"Hi\"!";
const COMMENT_PLACEHOLDER = "Your comment...";


const NewPost = (props) => {
    const classes = useStyles();
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState(null);
    const [photoReader, setPhotoReader] = useState(null);
    const personalPosts = useSelector(state => state.personalPosts);
    let { loading } = personalPosts;
    const dispatch = useDispatch();
    useEffect(() => {
        if(photo) {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                // convert image file to base64 string
                setPhotoReader(reader.result);
            }, false);
            reader.readAsDataURL(photo);
        } else {
            setPhotoReader(null);
        }
    }, [photo]);
    useEffect(() => {
        if(loading) {
            setText('');
            setPhoto(null);
            setPhotoReader(null);
        }
    }, [loading]);
    const handleNewPost = (e) => {
        e.preventDefault();
        if(text || photo) dispatch(newPost(text, photo));
    }
    return (
        <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleNewPost}>
                <div className={classes.row}>
                    <Avatar className={clsx( classes.avatar, classes[getCharacterColor(props.userInfo.firstName.charAt(0))])}>
                        <Typography component="h6" variant="h6" color="inherit">
                            {props.userInfo.firstName.charAt(0).toUpperCase()}
                        </Typography>
                    </Avatar>
                    <TextField
                        placeholder={POST_PLACEHOLDER}
                        multiline
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={classes.textField}
                        margin="normal"
                    />
                </div>
                <div className={classes.row}>
                    {photoReader && <img className={classes.img} src={photoReader} alt={photo?.name || ''} />}
                </div>
                <div className={classes.row}>
                    <input accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className={classes.photoInput} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="secondary" className={classes.photoButton} component="span">
                            <PhotoCameraIcon />
                        </IconButton>
                    </label> 
                    {/* <span className={classes.filename}>{photo ? photo.name : ''}</span> */}
                    {/* { error && 
                        (<Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>error</Icon>
                            {error}
                        </Typography>)
                    } */}
                    <div className={classes.grow}/>
                    <Button variant="contained" color="primary" disabled={!text && !photo} type="submit">Post</Button>
                </div>
            </form>
        </Paper>
    )
}

const SETTING_MENU_ID = 'setting-menu'
const FormerPost = (props) => {
    const classes = useStyles();
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const favoritePosts = useSelector(state => state.favoritePosts);
    const {favorites} = favoritePosts;
    const dispatch = useDispatch();
    const isOwner = () => {
        return props.post.postedBy._id === userInfo._id;
    }
    const checkLike = (likes, id) => {
        // console.log(likes, id);
        return likes.indexOf(id) !== -1;
    };
    const [values, setValues] = useState({
        like: checkLike(props.post.likes, userInfo._id),
        favorite: checkLike(favorites.map(post => post._id), props.post._id),
        likes: props.post.likes,
        comments: props.post.comments,
    });
    const [curComment, setCurComment] = useState('');
    const clickLike = async (e) => {
        const isLikeNow= !values.like;
        const futurePost = await dispatch(reactPost(REACT_TYPE_LIKE, isLikeNow, props.post._id));
        if(futurePost) sendPropsToParent(futurePost);
    };
    const clickFavorite = (e) => {
        const isFavoriteNow = !values.favorite;
        dispatch(favoritePost(isFavoriteNow, props.post._id));
    };
    const submitComment = async (e) => {
        if(e.keyCode === 13 && e.target.value) {
            e.preventDefault()
            const futurePost = await dispatch(reactPost(REACT_TYPE_COMMENT, curComment, props.post._id));
            if(futurePost) sendPropsToParent(futurePost);
            setCurComment("");
        }
    }
    const commentBody = (item) => {
        return (
          <Paper elevation={1} className={classes.commentPaper}>
            <Link to={`/profile/${item.postedBy._id}`}>{`${item.postedBy.nickName}`}</Link>
            <Typography component="p" variant="body1" color="inherit">
                {item.text}
            </Typography>
          </Paper>
        )
    }
    // Activate whenever we have a new post or a post is being deleted
    useEffect(() => {	
        setValues({	
            like: checkLike(props.post.likes, userInfo._id),	
            favorite: checkLike(favorites.map(post => post._id), props.post._id),	
            likes: props.post.likes,	
            comments: props.post.comments,	
        })	
    }, [props])
    const sendPropsToParent = (futurePost) => {
        props.alterList(futurePost);
    }

    const [anchorSetting, setAnchorSetting] = useState(null);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const handleOpenSetting = (e) => {
        setAnchorSetting(e.currentTarget);
    }
    const handleCloseSetting = () => {
        setAnchorSetting(null);
    }
    const handleOpenDelete = () => {
        handleCloseSetting();
        setDeleteOpen(true);
    }
    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }
    const handleDeletePost = () => {
        handleCloseDelete();
        dispatch(deletePost(props.post._id));
    }
    const SettingMenu = (props) => (
        <Menu
            id={SETTING_MENU_ID}
            anchorEl={anchorSetting}
            open={Boolean(anchorSetting)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            onClose={handleCloseSetting}
        >
            <MenuItem onClick={handleOpenDelete}>Delete Post</MenuItem>
        </Menu>
    )
    const DeleteAlert = () => (
        <Dialog
            open={isDeleteOpen}
            onClose={handleCloseDelete}
            aria-labelledby="alert-delete-title"
            aria-describedby="alert-delete-description"
        >
            <DialogTitle id="alert-delete-title">Delete this post?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-delete-description">
                    This action will cause this post being deleted permannently. Do you still want to continue?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDelete} color="primary" autoFocus>
                No
            </Button>
            <Button onClick={handleDeletePost} color="secondary">
                Yes, delete it!
            </Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <>
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <div className={classes.row}>
                    <Avatar className={clsx( classes.avatar, classes[getCharacterColor(props.post.postedBy.nickName.charAt(0))])}>
                        <Typography component="h6" variant="h6" color="inherit">
                            {props.post.postedBy.nickName.charAt(0).toUpperCase()}
                        </Typography>
                    </Avatar>
                    <div>
                        <Typography component="p" variant="h6">
                            {`${props.post.postedBy.nickName}`}
                        </Typography>
                        <Typography component="p" variant="body2">
                            { (new Date(props.post.created)).toDateString()}
                        </Typography>
                    </div>
                    <div className={classes.grow}/>
                    {
                        isOwner()
                        &&
                        <IconButton onClick={handleOpenSetting} aria-controls={SETTING_MENU_ID} aria-label="settings" >
                            <MoreVertIcon />
                        </IconButton>
                    }
                </div>
                <div className={classes.row}>
                    <Typography component="p" variant="body1">
                        {props.post.text}
                    </Typography>
                </div>
                {
                    props.post.photo &&
                    <>
                    <Divider variant="middle" width="100%"/>
                    <div className={classes.row}>
                        <img className={classes.img} src={props.post.photo} alt={props.post.text || "Image Error"} />
                    </div>
                    </>
                }
                <Divider variant="middle" width="100%"/>
                    <div className={classes.row}>   
                    <Hidden smUp>                  
                        <Tooltip title="Likes">
                            <IconButton onClick={clickLike} aria-label="Likes">
                                { values.like ? <ThumbUpIcon color="primary"/> : <ThumbUpAltOutlinedIcon color="primary"/> }
                            </IconButton>
                        </Tooltip>
                        <Typography component="p" variant="subtitle1">
                            {values.likes.length}
                        </Typography>
                        <Tooltip title="Comments">
                            <IconButton aria-label="Comments">
                                <CommentIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Typography component="p" variant="subtitle1">
                            {values.comments.length}
                        </Typography>
                        <div className={classes.grow}/>
                        <Tooltip title="Only you can know your favorite">
                            <IconButton onClick={clickFavorite} aria-label="Favorite">
                                { values.favorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderOutlinedIcon color="secondary" /> }
                            </IconButton>
                        </Tooltip>
                    </Hidden>  
                    <Hidden xsDown>                  
                        <Tooltip title="Likes">
                            <IconButton onClick={clickLike} aria-label="Likes">
                                { values.like ? <ThumbUpIcon color="primary"/> : <ThumbUpAltOutlinedIcon color="primary"/> }
                            </IconButton>
                        </Tooltip>
                        <Typography component="p" variant="subtitle1">
                            {`${values.likes.length} likes`}
                        </Typography>
                        <Tooltip title="Comments">
                            <IconButton aria-label="Comments">
                                <CommentIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <Typography component="p" variant="subtitle1">
                            {`${values.comments.length} comments`}
                        </Typography>
                        <div className={classes.grow}/>
                        <Tooltip title="Only you can know your favorite">
                            <IconButton onClick={clickFavorite} aria-label="Favorite">
                                { values.favorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderOutlinedIcon color="secondary" /> }
                            </IconButton>
                        </Tooltip>
                    </Hidden> 
                    </div>
                <Divider variant="middle" width="100%"/>
                <div className={classes.row}>
                    <Avatar className={clsx( classes.avatarSmall, classes[getCharacterColor(userInfo.firstName.charAt(0))])}>
                        <Typography component="h6" variant="h6" color="inherit">
                            {userInfo.firstName.charAt(0).toUpperCase()}
                        </Typography>
                    </Avatar>
                    <TextField
                        placeholder={COMMENT_PLACEHOLDER}
                        multiline
                        variant="outlined"
                        value={curComment}
                        onChange={(e) => setCurComment(e.target.value)}
                        onKeyDown={submitComment}
                        className={classes.textField}
                        margin="normal"
                    />
                </div>
                { values.comments.map((comment, i) => {
                    return (
                            <CardHeader
                                avatar={
                                    <Avatar 
                                    className={clsx( classes.avatarSmall, classes[getCharacterColor(comment.postedBy.firstName.charAt(0))])}>
                                        <Typography component="h6" variant="h6" color="inherit">
                                            {comment.postedBy.firstName.charAt(0).toUpperCase()}
                                        </Typography>
                                    </Avatar>
                                }
                                title={commentBody(comment)}
                                className={classes.cardHeader}
                                key={i}
                            />
                        )
                    })
                }
            </div>
        </Paper>
        {
            isOwner() && (
                <>
                <SettingMenu />
                <DeleteAlert />
                </>
            )
        }
        </>
    )
}

export { NewPost, FormerPost };