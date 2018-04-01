import React from 'react'
import UserList from '../components/user/UserList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid } from 'semantic-ui-react'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import FormikInput from '../shared/FormikInput'
import { withFormik } from 'formik'
import Yup from 'yup'
import { Button } from 'semantic-ui-react'
import FormikForm from '../shared/FormikForm'
import UserForm from '../components/user/UserForm';

const QUERY_LIST_USERS = gql`
  query {
    getUsers {
      name
      id
    }
  }
`;

const ListUsers = () => (
    <Query query={QUERY_LIST_USERS}>
        {(obj) => {
          let { loading, error, data} = obj
            if (loading) return "Loading..."
            if (error) return `Error! ${error.message}`
            return (
                <div>
                {data && data.getUsers && data.getUsers.map(item => (
                    <option key={item.id} value={item.name}>
                    {item.name}
                    </option>
                ))}
                </div>
            );
        }}
    </Query>
)

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
    const { getUsers } = cache.readQuery({ query: QUERY_LIST_USERS }) || [];
    cache.writeQuery({
      query: QUERY_LIST_USERS,
      data: {getUsers: [...getUsers, createUser] }
    });
}

class UserListPage extends React.Component {

  render() {
    return (
      <div>
        <h1>Cadastro de usuarios</h1>
        <Mutation 
            mutation={SAVE_USER}
            update={updateUsersList}>
                {(createUser => (<UserForm createUser={createUser}/>))}
        </Mutation>
        <h2>Lista de Usuarios</h2>
        <ListUsers />
      </div>
    );
  }
}



export default withRouter(UserListPage);
