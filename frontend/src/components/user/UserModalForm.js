import React from 'react'
import { Mutation } from 'react-apollo';
import { Modal } from 'semantic-ui-react';
import { gql } from 'apollo-boost'
import { UserForm} from './UserForm';

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

const updateUsersList = (cache, { data: { createUser } }) => {
    const { getUsers } = cache.readQuery({ query: QUERY_LIST_USERS}) || [];
    cache.writeQuery({
      query: QUERY_LIST_USERS,
      data: {getUsers: [...getUsers, createUser] }
    });
}




const UserModalForm = ({open, size, onClose}) => (
     <Mutation
              mutation={SAVE_USER}
              update={updateUsersList}>
          {(createUser => (
            <Modal size='small' open={open} onClose={onClose}>
               <UserForm createUser={createUser}/>
            </Modal>
          ))}
        </Mutation>
)

export default UserModalForm