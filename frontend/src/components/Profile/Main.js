import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Cover from "../Cover";
import Content from "./Content";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { checkProfileRequest } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({

}));

const ProfileMain = props => {
  const classes = useStyles();
  const profileChecking = useSelector(state => state.profileChecking);
  const { userInfo } = profileChecking;
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkProfileRequest(userId));
  }, []);
  return (
    <Container maxWidth='lg'>
      <Cover userInfo={userInfo} editable={false} />
      <Content /> 
    </Container>
  )
};

export default ProfileMain;
