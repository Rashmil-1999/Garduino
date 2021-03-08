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
      sensor_data {
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
