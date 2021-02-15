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
      plant_info {
        common_name
        description
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