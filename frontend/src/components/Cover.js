import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar, Typography, Badge, Tooltip, IconButton, TextField} from "@material-ui/core";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import PanToolIcon from '@material-ui/icons/PanTool';
import { getCharacterColor } from "../util";
import { useTheme, withStyles } from "@material-ui/styles";
import { enableUpdate, updateCover } from "../actions/userActions";
import { useDispatch } from "react-redux";

const AVATAR_DIMENSION = 20;

const useStyles = makeStyles((theme) => ({
  mainCover: {
    position: 'relative',
    marginTop: theme.spacing(10),
    color: theme.palette.common.white,
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  mainCoverContent: {
    position: 'static',
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(10),
      paddingBottm: theme.spacing(0)
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: theme.spacing(AVATAR_DIMENSION),
    height: theme.spacing(AVATAR_DIMENSION)
  },
  text: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  nicknameTextField: {
    color: "#ffffff", 
    fontSize: '3rem',
  },
  descTextField: {
    color: "#ffffff", 
    fontSize: '1.5rem',
  },
  editAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    border: `2px solid ${theme.palette.background.paper}`,
    borderRadius: "50%",
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
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
  orangeColor: {
    color: deepOrange[500],
  },
  blueColor: {
    color: lightBlue[500],
  },
  purpleColor: {
    color: deepPurple[500],
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

const EditAvatar = (props) => {
  const classes = useStyles();
  const { userInfo } = props;
  return (
    <IconButton aria-label="ChangeAvatar" className={classes.editAvatar}>
      <PhotoCameraIcon className={classes[`${getCharacterColor(userInfo.firstName.charAt(0))}Color`]} style={{ margin: "2px 0 0 2px" }} />
    </IconButton>
  )
}

const Cover = (props) => {
  const classes = useStyles();
  const { userInfo, editable } = props;
  const [nickName, setNickName] = useState(userInfo.nickName);
  const [description, setDescription] = useState(userInfo.description);
  const dispatch = useDispatch();
  const handleUndoChanges = (e) => {
    e.preventDefault();
    setNickName(userInfo.nickName);
    setDescription(userInfo.description);
    dispatch(enableUpdate(false));
  }
  const submitCoverInfo = (e) => {
    e.preventDefault();
    dispatch(updateCover(nickName, description));
  }
  return (
    <Paper className={classes.mainCover}>
        <div className={classes.mainCoverContent}>
            {
              editable 
              ?
                <form onSubmit={submitCoverInfo}>
                  <div>
                    <Badge
                      overlap="circle"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      badgeContent={<EditAvatar userInfo={userInfo}/>}
                    >
                      <Avatar className={clsx( classes.avatar, classes[getCharacterColor(nickName.charAt(0))])}>
                          <Typography component="h1" variant="h3" color="inherit">
                            {nickName.charAt(0).toUpperCase()}
                          </Typography>
                      </Avatar>
                    </Badge>
                    <div className={classes.flexRow}>
                      <TextField 
                        required={true}
                        defaultValue={nickName}
                        InputProps={{classes: {
                            input: classes.nicknameTextField,
                          },
                        }}
                        inputProps={{
                          maxLength: 20,
                        }}
                        onChange={(e) => setNickName(e.target.value)}
                      />
                      <LightTooltip title="Change nickname">
                        <IconButton aria-label="ChangeNickname" style={{color: "#ffffff"}} >
                          <EditIcon />
                        </IconButton>
                      </LightTooltip>
                    </div>
                    <div className={classes.flexRow}>                   
                      {description 
                      ? 
                      <TextField 
                        required={true}
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                        InputProps={{classes: {
                            input: classes.descTextField,
                          },
                        }}
                        inputProps={{
                          maxLength: 100,
                        }}
                      /> 
                      : 
                      <TextField 
                        required={true}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                        InputProps={{classes: {
                            input: classes.descTextField,
                          },
                        }}
                        inputProps={{
                          maxLength: 100,
                        }}
                      />}                  
                      <LightTooltip title="Change description">
                        <IconButton aria-label="ChangeDescription" style={{color: "#ffffff"}} >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </LightTooltip>
                    </div>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>                 
                    <LightTooltip title="Change photo cover">
                      <IconButton aria-label="ChangeCover" style={{color: "#ffffff"}} >
                        <PhotoCameraIcon fontSize="large" />
                      </IconButton>
                    </LightTooltip>
                    <div>
                      <LightTooltip title="Undo changes">
                        <IconButton onClick={handleUndoChanges} aria-label="UndoChanges" style={{color: "#ffffff"}} >
                          <PanToolIcon />
                        </IconButton>
                      </LightTooltip>
                      <LightTooltip title="Save changes">
                        <IconButton onClick={submitCoverInfo} aria-label="SaveChanges" style={{color: "#ffffff"}} >
                          <SaveIcon fontSize="large" />
                        </IconButton>
                      </LightTooltip>
                    </div>
                  </div>
                </form>
              :
              <div>
                <Avatar className={clsx( classes.avatar, classes[getCharacterColor(nickName.charAt(0))])}>
                  <Typography component="h1" variant="h3" color="inherit">
                    {nickName.charAt(0).toUpperCase()}
                  </Typography>
                </Avatar>
                <Typography className={classes.text} component="h1" variant="h3" color="inherit">
                  {nickName}
                </Typography>
                {description
                ?
                <Typography className={classes.text} variant="h5" color="inherit" paragraph>
                  {description}
                </Typography>
                :
                <></>
                }
              </div>
            }            
        </div>
    </Paper>
  )
};

export default Cover;
