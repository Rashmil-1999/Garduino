import * as tokenUtils from "./utils/tokenUtils";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// create the client here using the saved token

const createClient = (token) =>
  new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URL,
      headers: { Authorization: `Bearer ${token}` },
    }),
    cache: new InMemoryCache(),
  });

class ApolloWrapper {
  create = () => {
    const token = tokenUtils.getToken();
    if (token && !tokenUtils.isExpired(token)) {
      this.client = createClient(token);
      return this.client;
    }
  };
}

export default new ApolloWrapper();
