import { gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation createUser($input:UserInput) {
    createUser(input:$input) {
      id,username,age
    }
  }
`;
export default CREATE_USER;
