import { gql } from 'graphql-tag'

const QUERY_LIST_USERS = gql`
  query {
    getUsers {
      name
      id
      email
      cpf
    }
  }
`;

const SAVE_USER = gql`
    mutation createUser(
      $email: String!,
      $password: String!,
      $name: String!,
      $cpf: String,
      $sexo: String,
      $rg: String
    ){
      createUser(email: $email, password: $password, name: $name, cpf: $cpf, sexo: $sexo, rg: $rg){
        id
        email
        password
        name
        cpf
        rg
        sexo
        telefones
      }
    }
`

export default {
    QUERY_LIST_USERS,
    SAVE_USER
}