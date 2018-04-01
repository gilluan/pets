import React from 'react'
import UserList from '../components/user/UserList'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import FormikInput from '../shared/FormikInput'
import { withFormik } from 'formik'
import Yup from 'yup'
import { Button, Table, Grid, Pagination} from 'semantic-ui-react'
import FormikForm from '../shared/FormikForm'
import UserForm from '../components/user/UserForm';

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

const ListRow = ({data}) => (
      <Table striped>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Cpf</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>   
        {data.map(item => (
          <Table.Row key={item.id}>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.cpf || ''}</Table.Cell>
          <Table.Cell>{item.email || ''}</Table.Cell>
        </Table.Row>
                      ))}
      </Table.Body>   

    </Table>
)

const ListUsers = () => (
  <div>
  <Query query={QUERY_LIST_USERS}>
  {(obj) => {
    let { loading, error, data} = obj
      if (loading) return "Loading..."
      if (error) return `Error! ${error.message}`
      return (<ListRow data={data.getUsers} />);
    }
  }
          

      </Query>
    </div>
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
