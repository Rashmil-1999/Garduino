import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";

//import the login and signup pages
//import the user app

import * as tokenUtils from "./utils/tokenUtils";

function App() {
  const isLoggedIn = useMemo(() => tokenUtils.isLoggedIn(), []);
  if (
    !isLoggedIn &&
    window.location.href !== process.env.REACT_APP_LOGIN_URL + "/"
  ) {
    window.location = `${process.env.REACT_APP_LOGIN_URL}`;
  }
  let roles = null;
  if (isLoggedIn) {
    roles = tokenUtils.roles(tokenUtils.getToken());
    roles = roles[0];
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <UserApp />
      </Switch>
    </div>
  );
}

export default App;
