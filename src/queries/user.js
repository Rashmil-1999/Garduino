import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation SignUp($object: [users_insert_input!]!) {
    insert_users(objects: $object) {
      affected_rows
    }
  }
`;

export const GET_USER_INFO = gql`
  query getuserinfo($userid: uuid!) {
    users(where: { u_uuid: { _eq: $userid } }) {
      first_name
      last_name
      full_name
    }
    sensor_mapping(
      where: {
        u_uuid: { _eq: $userid }
        plant_sensor_mappings: { is_valid: { _eq: false } }
      }
    ) {
      alias
      sm_uuid
    }
    plant_info {
      pi_id
      common_name
    }
  }
`;
