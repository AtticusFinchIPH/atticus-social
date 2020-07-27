import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Cover from "./Cover";
import Content from "./Content";

const useStyles = makeStyles((theme) => ({

}));

const HomeMain = props => {
  const classes = useStyles();
  return (
    <Container maxWidth='lg'>
      <Cover />
      <Content /> 
    </Container>
  )
};

export default HomeMain;
