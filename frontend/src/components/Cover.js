import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Avatar, Typography, Badge} from "@material-ui/core";
import { deepOrange, lightBlue, deepPurple } from '@material-ui/core/colors';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import { getCharacterColor } from "../util";
import { useTheme } from "@material-ui/styles";

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
    }
  },
  avatar: {
    width: theme.spacing(AVATAR_DIMENSION),
    height: theme.spacing(AVATAR_DIMENSION)
  },
  text: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(1),
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

const EditAvatar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { userInfo } = props;
  return (
    <div className={classes.editAvatar}>
      <PhotoCameraIcon className={classes[`${getCharacterColor(userInfo.firstName.charAt(0))}Color`]} style={{ margin: "2px 0 0 2px" }} />
    </div>
  )
}

const Cover = (props) => {
  const classes = useStyles();
  const { userInfo, editable } = props;
  return (
    <Paper className={classes.mainCover}>
        <div className={classes.mainCoverContent}>
            {
              editable 
              ?
                <>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={<EditAvatar userInfo={userInfo}/>}
                >
                  <Avatar className={clsx( classes.avatar, classes[getCharacterColor(userInfo.firstName.charAt(0))])}>
                      <Typography component="h1" variant="h3" color="inherit">
                        {userInfo.firstName.charAt(0).toUpperCase()}
                      </Typography>
                  </Avatar>
                </Badge>
                <div className={classes.flexRow}>
                  <Typography className={classes.text} component="h1" variant="h3" color="inherit">
                    {`${userInfo.firstName} ${userInfo.lastName}`}
                  </Typography>
                  <EditIcon />
                </div>
                <div className={classes.flexRow}>
                  <Typography className={classes.text} variant="h5" color="inherit" paragraph>
                      Description
                  </Typography>
                  <EditIcon fontSize="small" />
                </div>
                </>
              :
              <>
              <Avatar className={clsx( classes.avatar, classes[getCharacterColor(userInfo.firstName.charAt(0))])}>
                <Typography component="h1" variant="h3" color="inherit">
                  {userInfo.firstName.charAt(0).toUpperCase()}
                </Typography>
              </Avatar>
              <Typography className={classes.text} component="h1" variant="h3" color="inherit">
                {`${userInfo.firstName} ${userInfo.lastName}`}
              </Typography>
              <Typography className={classes.text} variant="h5" color="inherit" paragraph>
                  Description
              </Typography>
              </>
            }            
        </div>
    </Paper>
  )
};

export default Cover;
