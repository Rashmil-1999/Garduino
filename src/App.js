import React, { useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import the login and signup pages
import Login from "./containers/LoginSignUp/Login";
import SignUp from "../src/containers/LoginSignUp/SignUp";

import Toolbar from "./components/Toolbar/Toolbar";
//import the user app
import UserApp from "./UserApp";

import * as tokenUtils from "./utils/tokenUtils";

function App() {
  const isLoggedIn = useMemo(() => tokenUtils.isLoggedIn(), []);
  if (
    !isLoggedIn &&
    window.location.href !== process.env.REACT_APP_LOGIN_URL + "/"
  ) {
    window.location = `${process.env.REACT_APP_LOGIN_URL}`;
  } else if (
    isLoggedIn &&
    window.location.href === process.env.REACT_APP_LOGIN_URL + "/"
  ) {
    window.location = `${process.env.REACT_APP_REDIRECT_PATHNAME}`;
  }
  let roles = null;
  let u_uuid = null;
  if (isLoggedIn) {
    roles = tokenUtils.roles(tokenUtils.getToken());
    roles = roles[0];
    u_uuid = tokenUtils.userId();
  }

  return (
    <div
      className=''
      style={{
        backgroundColor: "#f5f6f7",
        // height: "100%",
      }}>
      <Toolbar user={roles} u_uuid={u_uuid} />
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <UserApp />
      </Switch>
    </div>
  );
}

export default App;
