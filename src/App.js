import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL,
    headers: { "x-hasura-admin-secret": "garduino123" },
  }),
  cache: new InMemoryCache(),
});

const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(
      where: { is_public: { _eq: false } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_completed
    }
  }
`;

const Todos = () => {
  const { loading, error, data } = useQuery(GET_MY_TODOS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return data.todos.map((todo) => {
    return (
      <div key={todo.id}>
        <h4>{todo.title}</h4>
        <h6>{todo.id}</h6>
        <h6>{todo.created_at}</h6>
      </div>
    );
  });
};

function App() {
  // console.log(process.env.REACT_APP_GRAPHQL_URL);

  // client
  //   .query({
  //     query: gql`
  //       query getMyTodos {
  //         todos(
  //           where: { is_public: { _eq: false } }
  //           order_by: { created_at: desc }
  //         ) {
  //           id
  //           title
  //           created_at
  //           is_completed
  //         }
  //       }
  //     `,
  //   })
  //   .then((result) => console.log(result));

  // const TodoPrivateListQuery = () => {
  //   const { loading, error, data } = useQuery(GET_MY_TODOS);

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (error) {
  //     console.error(error);
  //     return <div>Error!</div>;
  //   }
  //   return console.log(data.todos);
  // };
  // const holder = TodoPrivateListQuery();
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Todos />
      </div>
    </ApolloProvider>
  );
}

export default App;
