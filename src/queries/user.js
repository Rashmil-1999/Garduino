import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation SignUp($object: [users_insert_input!]!) {
    insert_users(objects: $object) {
      affected_rows
    }
  }
`;
