import gql from "graphql-tag";

export const GET_PLANT_INFO = gql`
  query get_plant_info {
    plant_info {
      pi_id
      common_name
      description
    }
  }
`;

export const GET_USER_PLANT_INFO = gql`
  query get_user_plant_info($u_id: uuid!) {
    plants(where: { user: { u_uuid: { _eq: $u_id } } }) {
      p_uuid
      is_uprooted
      plant_info {
        common_name
        description
      }
    }
  }
`;

export const GET_EACH_PLANT_INFO = gql`
  query geteachplantinfo($p_uuid: uuid!) {
    plants(where: { p_uuid: { _eq: $p_uuid } }) {
      planted_on
      u_uuid
      is_uprooted
      fruit_count
      plant_info {
        common_name
        description
        scientific_name
        soil_quality_suited
        planting_instructions
      }
      sensor_data(order_by: { timestamp: desc }) {
        timestamp
        soil_temp
        soil_moisture
        air_humidity
        air_temperature
      }
      user {
        irrigation_modes {
          manual
        }
        irrigation_logs(
          order_by: { time: desc }
          where: { time: { _gte: "2021-01-22T00:00:00.000Z" } }
        ) {
          time
          mode
        }
      }
      plant_sensor_mappings {
        psm_uuid
        is_valid
      }
    }
  }
`;

export const CREATE_USER_PLANT = gql`
  mutation create_plant($object: plants_insert_input!) {
    insert_plants_one(object: $object) {
      p_uuid
    }
  }
`;

export const UPROOT_USER_PLANT = gql`
  mutation uprootUserPlant($p_uuid: uuid!) {
    update_plants(
      where: { p_uuid: { _eq: $p_uuid } }
      _set: { is_uprooted: true }
    ) {
      affected_rows
    }
    update_plant_sensor_mapping(
      where: { p_uuid: { _eq: $p_uuid } }
      _set: { is_valid: false }
    ) {
      affected_rows
    }
  }
`;
