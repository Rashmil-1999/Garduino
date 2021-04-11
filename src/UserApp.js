import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

// import apollo-wrapper
import apollo from "./apollo-wrapper";
import Dashboard from "./containers/Dashboard/Dashboard";

//import the function to get user-id from the utils
import { userId } from "./utils/tokenUtils";
import PlantDetails from "./containers/PlantDetails/PlantDetails";
import EditPlant from "./containers/EditPlant/EditPlant";
import Logout from "./containers/LoginSignUp/Logout";

// create the client that will be user client
export const client = apollo.create();

const UserApp = (props) => {
  const [user_Id, setUser_Id] = useState(userId());
  return (
    <div>
      <ApolloProvider client={client}>
        <Route exact path='/dashboard'>
          <Dashboard userid={user_Id} />
        </Route>
        {/* <Route path='/plants/:plant_id/edit' exact component={EditPlant} /> */}
        <Route path='/plants/:plant_id' exact component={PlantDetails} />
        <Route path='/logout' exact component={Logout} />
      </ApolloProvider>
    </div>
  );
};

export default UserApp;
