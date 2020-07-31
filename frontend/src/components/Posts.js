import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors'
import { Paper, Typography, TextField, Avatar, Button, IconButton, Tooltip, Divider} from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { newPost } from "../actions/postActions";

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
    },
    row: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingBottom: theme.spacing(1),
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
        width: '90%'
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
    let { loading, listPost, error } = personalPosts;
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
        if(text || photoReader) dispatch(newPost(text, photoReader));
    }
    return (
        <Paper className={classes.paper}>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleNewPost}>
                <div className={classes.row}>
                    <Avatar className={clsx( classes.avatar, classes[props.avatarColor])}>
                        <Typography component="h6" variant="h6" color="inherit">
                            {props.userInfo.firstName.charAt(0).toUpperCase()}
                        </Typography>
                    </Avatar>
                    <TextField
                        placeholder={POST_PLACEHOLDER}
                        multiline
                        rows="3"
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

const FormerPost = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <div className={classes.row}>
                    <Avatar className={clsx( classes.avatar, classes[props.avatarColor])}>
                        <Typography component="h6" variant="h6" color="inherit">
                            {props.userInfo.firstName.charAt(0).toUpperCase()}
                        </Typography>
                    </Avatar>
                    <div>
                        <Typography component="p" variant="h6">
                            {`${props.userInfo.firstName} ${props.userInfo.lastName}`}
                        </Typography>
                        <Typography component="p" variant="body2">
                            {props.post.created}
                        </Typography>
                    </div>
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
                        <img className={classes.img} src={props.post.photo} alt={props.post.text} />
                    </div>
                    </>
                }
                <Divider variant="middle" width="100%"/>
                    <div className={classes.row}>
                        <Tooltip title="Likes">
                            <IconButton aria-label="Likes">
                                <ThumbUpIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography component="p" variant="subtitle1">
                            {`${props.post.likes.length} likes`}
                        </Typography>
                        <Tooltip title="Comments">
                            <IconButton aria-label="Comments">
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography component="p" variant="subtitle1">
                            {`${props.post.comments.length} comments`}
                        </Typography>
                        <div className={classes.grow}/>
                        <Tooltip title="Only you can know your favorite">
                            <IconButton aria-label="Favarite">
                                <FavoriteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                <Divider variant="middle" width="100%"/>
                <div className={classes.row}>
                    <Avatar className={clsx( classes.avatarSmall, classes[props.avatarColor])}>
                        <Typography component="h6" variant="h6" color="inherit">
                            {props.userInfo.firstName.charAt(0).toUpperCase()}
                        </Typography>
                    </Avatar>
                    <TextField
                        placeholder={COMMENT_PLACEHOLDER}
                        multiline
                        rows="1"
                        variant="outlined"
                        // value={values.text}
                        // onChange={handleChange('text')}
                        className={classes.textField}
                        margin="normal"
                    />
                </div>
            </div>
        </Paper>
    )
}

export { NewPost, FormerPost };