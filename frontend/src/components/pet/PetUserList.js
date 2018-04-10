import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Table, Grid, Pagination, Icon, Modal, Container, Card } from 'semantic-ui-react'
import { Query } from 'react-apollo'
const QUERY_LIST_USERS = gql`
  query {
    getUsers {
      name
      id
      email
      cpf
    }
  }
`

const ItemTable = ({item, openAddPet, openUserPetsList}) => (
  <Table.Row>
    <Table.Cell>{item.name}</Table.Cell>
    <Table.Cell>{item.cpf || ''}</Table.Cell>
    <Table.Cell>{item.email || ''}</Table.Cell>
    <Table.Cell>
      <Button animated onClick={openAddPet(item)}>
        <Button.Content visible>Cadastrar</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
    </Table.Cell>
    <Table.Cell>
      <Button animated onClick={() => openUserPetsList(item)}>
        <Button.Content visible>Visualizar</Button.Content>
        <Button.Content hidden>
          <Icon name='right arrow' />
        </Button.Content>
      </Button>
    </Table.Cell>
  </Table.Row>
)

const UserTable = ({data, openAddPet, openUserPetsList}) => (
  <Table striped>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Cpf</Table.HeaderCell>
        <Table.HeaderCell>E-mail address</Table.HeaderCell>
        <Table.HeaderCell>Selecione</Table.HeaderCell>
        <Table.HeaderCell>Ver pets</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map(item => (<ItemTable openAddPet={openAddPet} openUserPetsList={openUserPetsList} key={item.id} item={item} />))}
    </Table.Body>
    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4' />
      </Table.Row>
    </Table.Footer>
  </Table>
)

const PetUserList = ({openAddPet, openUserPetsList}) => (
  <Query query={QUERY_LIST_USERS}>
    {(obj) => {
      let {loading, error, data} = obj
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`
      return (<UserTable openAddPet={openAddPet} openUserPetsList={openUserPetsList} data={data.getUsers} />)
    }
    }
  </Query>
)

export { PetUserList }
