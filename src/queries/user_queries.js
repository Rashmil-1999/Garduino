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
        plant_sensor_mappings: { is_valid: { _eq: true } }
      }
      order_by: { alias: asc }
    ) {
      alias
      sm_uuid
    }
    all_sensor_mappings: sensor_mapping(
      where: { u_uuid: { _eq: $userid } }
      order_by: { alias: asc }
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

export const SET_MANUAL_MODE = gql`
  mutation MyMutation($u_uuid: uuid!, $manualMode: Boolean!) {
    update_irrigation_mode(
      where: { u_uuid: { _eq: $u_uuid } }
      _set: {
        ch_1: 0
        ch_2: 0
        ch_3: 0
        ch_4: 0
        ch_5: 0
        ch_6: 0
        ch_7: 0
        ch_8: 0
        manual: $manualMode
      }
    ) {
      affected_rows
    }
  }
`;

export const GET_USER_NAME = gql`
  query getUserName($u_uuid: uuid!) {
    users(where: { u_uuid: { _eq: $u_uuid } }) {
      full_name
    }
  }
`;
