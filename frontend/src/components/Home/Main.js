import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Cover from "./Cover";
import Content from "./Content";

const useStyles = makeStyles((theme) => ({

}));

const randomColor = () => {
  let picker = Math.floor(Math.random() * 3);
  return picker === 0 ? "orange" : picker === 1 ? "blue" : "purple";
}

const HomeMain = props => {
  const classes = useStyles();
  const avatarColor = randomColor();
  return (
    <Container maxWidth='lg'>
      <Cover avatarColor={avatarColor}/>
      <Content avatarColor={avatarColor}/> 
    </Container>
  )
};

export default HomeMain;
