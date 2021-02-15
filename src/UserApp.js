import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

// import apollo-wrapper
import apollo from "./apollo-wrapper";
import Home from "./containers/Home";

//import the function to get user-id from the utils
import { userId } from "./utils/tokenUtils";

// create the client that will be user client
export const client = apollo.create();

const UserApp = (props) => {
  const [user_Id, setUser_Id] = useState(userId());
  return (
    <ApolloProvider client={client}>
      <Route exact path='/dashboard'>
        <Home userid={user_Id} />
      </Route>
    </ApolloProvider>
  );
};

export default UserApp;
