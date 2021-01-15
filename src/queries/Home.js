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