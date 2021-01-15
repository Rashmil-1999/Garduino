import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation signUp(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $role: Int!
    $plant_count: Int!
  ) {
    insert_users(
      objects: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        password: $password
        plant_count: $plant_count
        role: $role
      }
    ) {
      affected_rows
    }
  }
`;
