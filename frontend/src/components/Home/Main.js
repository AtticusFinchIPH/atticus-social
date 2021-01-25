import React from "react";
import { Container } from "@material-ui/core";
import Cover from "../Cover";
import Content from "./Content";
import { useSelector } from "react-redux";

const HomeMain = props => {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  // console.log(userInfo)
  const userUpdate = useSelector(state => state.userUpdate);
  const {editable} = userUpdate;
  return (
    <Container maxWidth='lg'>
      <Cover userInfo={userInfo} editable={editable} />
      <Content /> 
    </Container>
  )
};

export default HomeMain;
