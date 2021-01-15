import gql from 'graphql-tag'

const GET_PLANT_INFO = gql`
query getplantinfo{
    plant_info{
        pi_id
        common_name
        description
    }
}
`;
export default GET_PLANT_INFO;