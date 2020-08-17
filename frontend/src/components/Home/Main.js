import React from "react";
import { Container } from "@material-ui/core";
import Cover from "../Cover";
import Content from "./Content";
import { useSelector } from "react-redux";

const HomeMain = props => {
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  return (
    <Container maxWidth='lg'>
      <Cover userInfo={userInfo} />
      <Content /> 
    </Container>
  )
};

export default HomeMain;
