import React, { useState } from "react";
import { Jumbotron, Card, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useMutation,
  ApolloProvider,
} from "@apollo/client";

import * as queries from "../../queries/user";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/SignUp/Dropdown";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import { createToast } from "../../utils/toast";

const SignUp = (props) => {
  const [fname, setfName] = useState("");
  const [lname, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [plantsno, setPlantsNo] = useState("");

  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      headers: {
        "x-hasura-admin-secret": "garduino123",
      },
    }),
    cache: new InMemoryCache(),
  });

  const [
    createUser,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(queries.CREATE_USER, {
    client: client,
    onCompleted: (data) => {
      console.log("User Created!");
      window.location = `${process.env.REACT_APP_LOGIN_URL}`;
    },
  });

  return (
    <ApolloProvider client={client}>
      <Card
        style={{ width: "40em" }}
        className="my-5 mx-auto shadow p-3 mb-5 bg-white rounded"
      >
        <CardText>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let role = 1;

              const variables = {
                first_name: fname,
                last_name: lname,
                email: email,
                password: password,
                plant_count: plantsno,
                role: role,
              };

              console.log(variables);
              createUser({
                variables: variables,
              });
            }}
          >
            <Input
              type="text"
              placeholder={"First Name"}
              label={"First Name "}
              valid={true}
              value={fname}
              onChange={(curr) => setfName(curr)}
            />
            <Input
              type="text"
              placeholder={"Last Name"}
              label={"Last Name "}
              valid={true}
              value={lname}
              onChange={(curr) => setlName(curr)}
            />
            <Input
              type="email"
              placeholder={"E-mail"}
              label={"Email "}
              valid={true}
              value={email}
              onChange={(curr) => setEmail(curr)}
            />
            <Input
              type="password"
              placeholder={"password"}
              label={"Password "}
              valid={true}
              value={password}
              onChange={(curr) => setPassword(curr)}
            />
            <Input
              type="password"
              placeholder={"Confirm password"}
              label={"Confirm Password "}
              valid={true}
              value={password2}
              onChange={(curr) => setPassword2(curr)}
            />
            <Input
              type="text"
              placeholder={"No of plants"}
              label={"Enter No of plants "}
              valid={true}
              value={plantsno}
              onChange={(curr) => setPlantsNo(curr)}
            />
            {/* <label>Enter the no of plants in your garden</label>
            <Dropdown onChange={(curr) => setPlantsNo(curr)} /> */}
            <Button outline color="info" type="submit">
              SignUp
            </Button>
          </form>
          {mutationLoading && <LoadingPopup isOpen />}
          {mutationError && createToast({ message: "some Error Occurred" })}
        </CardText>
      </Card>
      <Link className="nav-link" to={"/"}>
        login
      </Link>
    </ApolloProvider>
  );
};
export default SignUp;
