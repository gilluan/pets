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
import { Button, Table, Grid, Pagination, Icon, Modal, Container, Card } from 'semantic-ui-react'
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

const ItemTable = ({item}) => (
  <Table.Row>
          <Table.Cell>{item.name}</Table.Cell>
          <Table.Cell>{item.cpf || ''}</Table.Cell>
          <Table.Cell>{item.email || ''}</Table.Cell>
</Table.Row>
)

const UserTable = ({data, openAddUser}) => (
      <Table striped>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Cpf</Table.HeaderCell>
          <Table.HeaderCell>E-mail address</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => (<ItemTable key={item.id} item={item} />))}
      </Table.Body>
       <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
          <Button floated='right' icon labelPosition='left' onClick={openAddUser('large')} primary size='small'>
            <Icon name='user' /> Add User
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
    </Table>
)

const ListUsers = ({openAddUser}) => (
  <Query query={QUERY_LIST_USERS}>
    {(obj) => {
      let { loading, error, data} = obj
        if (loading) return "Loading..."
        if (error) return `Error! ${error.message}`
        return (<UserTable openAddUser={openAddUser} data={data.getUsers} />);
      }
    }
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


const ModalForm = ({open, size, onClose}) => (

     <Mutation
              mutation={SAVE_USER}
              update={updateUsersList}>
          {(createUser => (
            <Modal size='small' open={open} onClose={onClose}>
               <UserForm createUser={createUser}/>
            </Modal>
          ))}

        </Mutation>
);

class UserListPage extends React.Component {

  //TODO
  state = { open: false, size: 'medium' }
  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })


  render() {
    const { open, size } = this.state
    return (
      <span>
        {/*Adicionar o filtro*/}
        {/*<h2>Lista de Usuarios</h2>*/}
        <ListUsers openAddUser={(size) => this.show(size)}/>
        <ModalForm open={open} size={size} onClose={this.close}/>
      </span>
    );
  }
}

export default withRouter(UserListPage);
