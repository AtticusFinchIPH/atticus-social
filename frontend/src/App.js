import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import { PrivateRoute, PublicRoute } from "./components/Routes";
import NavBar from "./components/NavBar";
import Home from "./components/Home/Main";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Newsfeed from "./components/Newsfeed/Main";
import Profile from "./components/Profile/Main";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute path="/signin" component={SignIn} restricted={true}/>
          <PublicRoute path="/signup" component={SignUp} restricted={true}/>
          <PrivateRoute path="/newsfeed" component={Newsfeed} />
          <PrivateRoute path="/profile/:userId" component={Profile} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}
