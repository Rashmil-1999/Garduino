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
  mutation setManualMode($u_uuid: uuid!, $manualMode: Boolean!) {
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

export const MANUAL_IRRIGATION = gql`
  mutation setManualIrrigationTime(
    $u_uuid: uuid!
    $ch_1: Int!
    $ch_2: Int!
    $ch_3: Int!
    $ch_4: Int!
    $ch_5: Int!
    $ch_6: Int!
    $ch_7: Int!
    $ch_8: Int!
  ) {
    update_irrigation_mode(
      where: { u_uuid: { _eq: $u_uuid } }
      _set: {
        ch_1: $ch_1
        ch_2: $ch_2
        ch_3: $ch_3
        ch_4: $ch_4
        ch_5: $ch_5
        ch_6: $ch_6
        ch_7: $ch_7
        ch_8: $ch_8
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

export const UPDATE_IRRIGATION_TIMINGS = gql`
  mutation updateIrrigationTimingsMutation(
    $u_uuid: uuid!
    $channel_1: Int!
    $channel_2: Int!
    $channel_3: Int!
    $channel_4: Int!
    $channel_5: Int!
    $channel_6: Int!
    $channel_7: Int!
    $channel_8: Int!
  ) {
    update_irrigation_timings(
      where: { u_uuid: { _eq: $u_uuid } }
      _set: {
        channel_1: $channel_1
        channel_2: $channel_2
        channel_3: $channel_3
        channel_4: $channel_4
        channel_5: $channel_5
        channel_6: $channel_6
        channel_7: $channel_7
        channel_8: $channel_8
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_IRRIGATION_SCHEDULE = gql`
  mutation updateIrrigationSchedule($u_uuid: uuid!, $schedule: String!) {
    update_irrigation_timings(
      where: { u_uuid: { _eq: $u_uuid } }
      _set: { schedule: $schedule }
    ) {
      affected_rows
    }
  }
`;
