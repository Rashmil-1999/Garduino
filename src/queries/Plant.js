import gql from 'graphql-tag'

export const GET_PLANT_INFO = gql`
query getplantinfo{
    plant_info{
        pi_id
        common_name
        description
    }
}
`; 

export const GET_USER_PLANT_INFO = gql`
  query getuserplantinfo($u_id: uuid!) {
    plants(where: {user: {u_uuid: {_eq: $u_id }}}) {
        plant_info {
          common_name
          description
        }
      }
}
`;